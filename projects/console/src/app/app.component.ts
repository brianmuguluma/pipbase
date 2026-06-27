import { Component, effect, signal } from '@angular/core';

import { AuthService } from './services/auth/auth.service';

import { NavbarComponent } from './navbar/navbar.component';
import { MenuComponent } from './menu/menu.component';
import { RateLimiter } from 'limiter';
import { CapacitorHttp, HttpHeaders, HttpOptions } from '@capacitor/core';
import { Instrument } from './interfaces/oanda';
import { Realtime, Types } from 'ably';
import { environment } from 'src/environments/environment.example';
import { Occupancy } from './interfaces/ably';
import { NgxSonnerToaster } from 'ngx-sonner';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [NavbarComponent, MenuComponent, NgxSonnerToaster, RouterOutlet],
})
export class AppComponent {
  project = signal('Pipbase');

  offsetHeight = signal<number | undefined>(undefined);

  oandaRateLimit = signal(
    new RateLimiter({
      tokensPerInterval: 40,
      interval: 'second',
    }),
  );
  isPaperTrading = signal<boolean | undefined>(undefined);
  isEnvironmentSet = signal<boolean>(false);
  instruments = signal<Instrument[] | undefined>(undefined);
  occupancy = signal<Occupancy | undefined>(undefined);
  constructor(public auth: AuthService) {
    effect(() => {
      if (auth.profile()) this.getOccupancy();
    });
    effect(async () => {
      if (this.auth.hasApiKey()) {
        await this.getEnvironment();
      }
    });

    effect(async () => {
      if (this.auth.hasAccountId()) {
        await this.getInstruments();
      }
    });
  }

  getOccupancy() {
    const options: Types.ClientOptions = { key: environment.ably };
    const client = new Realtime(options);
    const channel = client.channels.get(`signals`, {
      params: { occupancy: 'metrics' },
    });

    channel.subscribe('[meta]occupancy', (msg) => {
      const metrics = msg.data.metrics;

      if (metrics && msg.name.includes('[meta]')) {
        this.occupancy.set(metrics);
      }
    });
  }

  async getEnvironment() {
    if (await this.validateKey(false)) {
      this.isPaperTrading.set(false);
      this.isEnvironmentSet.set(true);
      return;
    }
    if (await this.validateKey(true)) {
      this.isPaperTrading.set(true);
      this.isEnvironmentSet.set(true);
      return;
    }
  }

  async validateKey(isPaperTrading: boolean) {
    const options: HttpOptions = {
      headers: this.getHeaders(),
      url: `https://api-${
        isPaperTrading ? 'fxpractice' : 'fxtrade'
      }.oanda.com/v3/accounts`,
    };
    const { status } = await CapacitorHttp.get(options);
    if (status !== 200) return;
    return status === 200 ? true : false;
  }

  async getInstruments() {
    const options: HttpOptions = {
      headers: this.getHeaders(),
      url: `${this.getBaseUrl()}/accounts/${this.getAccountID()}/instruments`,
    };
    const { data, status } = await CapacitorHttp.get(options);
    if (status === 200) {
      const { instruments } = data;
      this.instruments.set(instruments);
    }
  }

  getBaseUrl() {
    const environment = this.isPaperTrading() ? 'fxpractice' : 'fxtrade';
    return `https://api-${environment}.oanda.com/v3`;
  }

  getHeaders(): HttpHeaders {
    return {
      Authorization: `Bearer ${this.getApiKey()}`,
    };
  }

  private getApiKey(): string | undefined {
    return this.auth.hasApiKey();
  }

  private getAccountID(): string | undefined {
    return this.auth.hasAccountId();
  }
}
