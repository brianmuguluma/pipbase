import { Component, effect } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonText,
  IonCard,
  IonCardContent,
  IonNote,
  IonCardSubtitle,
  IonCardTitle,
  IonCardHeader,
  IonLabel,
  IonItem,
  IonRefresher,
  IonRefresherContent,
  RefresherEventDetail,
} from '@ionic/angular/standalone';
import { AppComponent } from '../app.component';
import { SpinnerComponent } from '../spinner/spinner.component';
import { CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { AuthService } from '../services/auth/auth.service';
import { StripeService } from '../services/stripe/stripe.service';
import { Customer } from '../interfaces/stripe';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.page.html',
  styleUrls: ['./billing.page.scss'],
  standalone: true,
  imports: [
    IonRefresherContent,
    IonRefresher,
    IonLabel,
    IonCardSubtitle,
    IonNote,
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonText,
    SpinnerComponent,
    CurrencyPipe,
    DatePipe,
    UpperCasePipe,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonItem,
  ],
})
export class BillingPage {
  constructor(
    public app: AppComponent,
    public auth: AuthService,
    private stripe: StripeService,
  ) {
    effect(() => {
      if (auth.user()) {
        if (!this.app.customer()) this.retrieveCustomer();
      }
    });
  }

  async retrieveCustomer() {
    const { stripeId } = this.auth.user()!;
    const params = { expand: ['subscriptions'] };
    const { data } = await this.stripe.retrieveCustomer({
      id: stripeId,
      params,
    });
    this.app.customer.set(data as Customer);
  }

  async refresh(event: CustomEvent<RefresherEventDetail>) {
    await this.retrieveCustomer();
    event.detail.complete();
  }
}
