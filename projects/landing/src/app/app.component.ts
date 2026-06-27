import { Component, OnInit, computed, signal } from '@angular/core';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { Price, RecurringInterval } from './interfaces/stripe';
import { AnalyticsComponent } from './analytics/analytics.component';
import { ConsentStatusString } from '@angular/fire/analytics';
import { PreferencesService } from './services/preferences/preferences.service';

import { MenuComponent } from './menu/menu.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    AnalyticsComponent,
    MenuComponent,
    RouterOutlet,
  ],
})
export class AppComponent implements OnInit {
  dashboard = signal('https://dashboard.pipbase.com');
  users = signal(8000);
  interest = signal(0.02);
  uptime = signal(0.999);
  prices = signal<Price[] | undefined>(undefined);
  plans = computed(() => this.computePlans());
  consent = signal<ConsentStatusString | string | null | undefined>(undefined);
  interval = signal<RecurringInterval>('month');
  intervals = signal<RecurringInterval[]>(['month', 'year']);
  constructor(
    private functions: Functions,
    private preferences: PreferencesService,
  ) {}

  ngOnInit(): void {
    this.getConsentStatus();
    this.listPrices();
  }

  async listPrices() {
    const params = {
      active: true,
      expand: ['data.product'],
      type: 'recurring',
    };
    const { data } = await httpsCallable(
      this.functions,
      'listPrices',
    )({ params });

    this.prices.set((data as any).data);
    return await httpsCallable(this.functions, 'listPrices')(data);
  }

  computePlans() {
    return this.prices()
      ?.filter((price: any) => price.recurring.interval === this.interval())
      .reverse();
  }

  async getConsentStatus() {
    const { value } = await this.preferences.getValue({ key: 'consent' });
    this.consent.set(value);
  }
}
