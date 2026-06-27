import {
  CurrencyPipe,
  NgClass,
  PercentPipe,
  UpperCasePipe,
} from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { AppComponent } from '../app.component';
import { RecurringInterval } from '../interfaces/stripe';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss'],
  standalone: true,
  imports: [NgClass, CurrencyPipe, UpperCasePipe, PercentPipe],
})
export class PlansComponent {
  plans = computed(() => this.computePlans());
  plan = computed(() => this.computePlan());
  interval = signal<RecurringInterval>('month');
  intervals = signal<RecurringInterval[]>(['month', 'year']);
  isGeneratingPortalLink = signal(false);
  isGeneratingCheckoutSession = signal(false);
  price = signal<string | undefined>(undefined);
  index = signal<number | undefined>(undefined);
  constructor(public app: AppComponent) {}

  computePlans() {
    return this.app
      .prices()
      ?.filter((price) => price.recurring.interval === this.interval())
      .reverse();
  }

  computePlan() {
    return this.plans()?.filter((price) => price.id === this.price())[0];
  }

  setPlan(id: string) {
    this.price.set(id);
  }
}
