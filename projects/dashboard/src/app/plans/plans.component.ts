import {
  CurrencyPipe,
  DatePipe,
  NgClass,
  TitleCasePipe,
  UpperCasePipe,
} from '@angular/common';
import { Component, computed, input, signal } from '@angular/core';
import { AppComponent } from '../app.component';
import { Price, RecurringInterval } from '../interfaces/stripe/stripe';
import { SpinnerComponent } from '../spinner/spinner.component';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss'],
  standalone: true,
  imports: [
    NgClass,
    SpinnerComponent,
    CurrencyPipe,
    UpperCasePipe,
    DatePipe,
    UpperCasePipe,
    TitleCasePipe,
  ],
})
export class PlansComponent {
  plans = input.required<Price[]>();
  plan = computed(() => this.computePlan());

  interval = signal<RecurringInterval>('month');
  intervals = signal<RecurringInterval[]>(['month', 'year']);
  isGeneratingPortalLink = signal(false);
  isGeneratingCheckoutSession = signal(false);
  price = signal<string | undefined>(undefined);
  index = signal<number | undefined>(undefined);
  constructor(
    public app: AppComponent,
    public auth: AuthService,
  ) {}

  computePlan() {
    return this.plans()?.filter((price) => price.id === this.price())[0];
  }

  setPlan(id: string) {
    this.price.set(id);
  }
}
