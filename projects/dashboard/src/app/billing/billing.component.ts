import { Component, computed, effect, signal } from '@angular/core';
import { PlansComponent } from '../plans/plans.component';
import { AppComponent } from '../app.component';
import { AuthService } from '../services/auth/auth.service';
import { StripeService } from '../services/stripe/stripe.service';
import {
  Customer,
  Price,
  RecurringInterval,
} from '../interfaces/stripe/stripe';
import {
  CurrencyPipe,
  DatePipe,
  NgClass,
  TitleCasePipe,
  UpperCasePipe,
} from '@angular/common';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss'],
  standalone: true,
  imports: [
    PlansComponent,
    NgClass,
    SpinnerComponent,
    CurrencyPipe,
    UpperCasePipe,
    DatePipe,
    UpperCasePipe,
    TitleCasePipe,
  ],
})
export class BillingComponent {
  prices = signal<Price[] | undefined>([]);
  customer = signal<Customer | undefined>(undefined);
  subscriptions = computed(() => this.customer()?.subscriptions.data);

  plans = computed(() => this.computePlans());
  plan = computed(() => this.computePlan());
  interval = signal<RecurringInterval>('month');
  isGeneratingPortalLink = signal(false);
  isGeneratingCheckoutSession = signal(false);
  price = signal<string | undefined>(undefined);
  index = signal<number | undefined>(undefined);
  constructor(
    public app: AppComponent,
    public auth: AuthService,
    private stripe: StripeService,
  ) {
    effect(() => {
      this.retrieveCustomer();
      this.listPrices();
    });
  }

  computePlans() {
    return this.prices()
      ?.filter((price) => price.recurring.interval === this.interval())
      .reverse();
  }

  computePlan() {
    return this.plans()?.filter((price) => price.id === this.price())[0];
  }

  async retrieveCustomer() {
    const { stripeId } = this.auth.user()!;
    const params = { expand: ['subscriptions'] };
    const { data } = await this.stripe.retrieveCustomer({
      id: stripeId,
      params,
    });
    this.customer.set(data as Customer);
  }

  async listPrices() {
    const { stripeId } = this.auth.user()!;
    const params = {
      active: true,
      expand: ['data.product'],
      type: 'recurring',
    };
    const { data } = await this.stripe.listPrices({ id: stripeId, params });

    this.prices.set((data as any).data as Price[]);
  }

  async createCheckoutSession(price: string) {
    this.price.set(price);
    this.isGeneratingCheckoutSession.set(true);
    await this.stripe.createCheckoutSession(price);
  }

  async createPortalLink() {
    this.isGeneratingPortalLink.set(true);
    try {
      const { stripeId } = this.auth.user()!;
      const { data } = await this.stripe.createPortalLink({ stripeId });
      window.location.assign((data as any).url);
    } catch (error) {
      this.isGeneratingPortalLink.set(false);
    }
  }
}
