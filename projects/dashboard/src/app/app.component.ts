import { Component, OnInit, computed, effect, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthService } from './services/auth/auth.service';
import { Device } from '@capacitor/device';
import {
  Account,
  AccountPoll,
  AccountProperty,
  AccountResponse,
  Instrument,
  TradeStateFilter,
  TradeSummary,
} from './interfaces/oanda/oanda';
import {
  CapacitorHttp,
  HttpHeaders,
  HttpOptions,
  HttpResponse,
} from '@capacitor/core';
import { PreferencesService } from './services/preferences/preferences.service';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import { Settings } from './interfaces/user/user';
import { RateLimiter } from 'limiter';
import { isUndefined, uniqBy } from 'lodash-es';
import { App } from '@capacitor/app';
import { Auth, authState } from '@angular/fire/auth';
import { AnalyticsComponent } from './analytics/analytics.component';
import { ConsentStatusString } from '@angular/fire/analytics';
import { MenuComponent } from './menu/menu.component';

import { setDefaultOptions } from 'date-fns';
import * as locale from 'date-fns/locale';
import { SpinnerComponent } from './spinner/spinner.component';
import { FooterComponent } from './footer/footer.component';
import { NgxSonnerToaster } from 'ngx-sonner';
import { capitalCase } from 'change-case';
// import { ToastService } from './services/toast/toast.service';
import Cron from 'croner';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    NavbarComponent,
    AnalyticsComponent,
    MenuComponent,
    SpinnerComponent,
    FooterComponent,
    NgxSonnerToaster,
    RouterOutlet,
    MenuComponent,
  ],
})
export class AppComponent implements OnInit {
  project = signal('Pipbase');

  offsetHeight = signal<number | undefined>(undefined);
  consent = signal<ConsentStatusString | string | undefined | null>(undefined);
  isPaperTrading = signal<boolean | undefined>(undefined);
  oandaRateLimit = signal(
    new RateLimiter({
      tokensPerInterval: 40,
      interval: 'second',
    }),
  );

  // Device
  device = signal<string | undefined>(undefined);
  isEnvironmentSet = signal<boolean>(false);
  isReady = computed(() => this.computeIsReady());

  // Accounts
  account = signal<Account | undefined>(undefined);
  poll = signal<AccountPoll | undefined>(undefined);
  properties = signal<AccountProperty[] | undefined>(undefined);
  summaries = signal<Account[] | undefined>(undefined);
  instruments = signal<Instrument[] | undefined>(undefined);

  currency = computed(() => this.account()?.currency ?? undefined);

  // Formatting

  currencyFormatOptions = computed<Intl.NumberFormatOptions>(() => ({
    style: this.currency() ? 'currency' : undefined,
    notation: 'compact',
    currency: this.currency(),
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }));

  unitsFormatOptions = computed<Intl.NumberFormatOptions>(() => ({
    notation: 'compact',
    maximumFractionDigits: 1,
  }));

  private cron = signal<Cron>(Cron('* * * * * *', () => this.pollAccount()));
  private lastTransactionID = signal<string | undefined>(undefined);
  constructor(
    public router: Router,
    public authService: AuthService,
    private auth: Auth,
    private firestore: Firestore,
    private preferences: PreferencesService,
    // private toast: ToastService,
  ) {
    this.getConsentStatus();
    effect(async () => {
      if (!this.authService.hasApiKey()) return;
      await this.getEnvironment();
      await this.getProperties();
      await this.getSummaries();
    });

    effect(() => {
      if (!isUndefined(this.isPaperTrading())) this.getAccount();
    });

    effect(() => {
      if (this.account()) this.getInstruments();
    });

    authState(this.auth).subscribe((user) => {
      if (user === null) this.resetAccount();
    });
  }

  computeIsReady() {
    return this.isEnvironmentSet() && this.account();
  }

  async getConsentStatus() {
    const { value } = await this.preferences.getValue({ key: 'consent' });
    this.consent.set(value);
  }

  resetAccount() {
    this.poll.set(undefined);
    this.account.set(undefined);
    this.summaries.set(undefined);
    this.properties.set(undefined);
    this.instruments.set(undefined);
    this.isEnvironmentSet.set(false);
    this.isPaperTrading.set(undefined);
  }

  async ngOnInit(): Promise<void> {
    this.setLocale();
    this.device.set((await Device.getInfo()).platform);
    this.pollAccount();
    // this.setupListeners();
  }

  async setLocale() {
    const { value } = await Device.getLanguageTag();
    const x: any = value.split('-').join('');
    const y: any = locale;

    setDefaultOptions({ locale: y[x] });
  }

  setupListeners() {
    App.addListener('pause', () => this.cron()?.stop());
    App.addListener('resume', () => this.getAccount());
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
      url: `${this.getBaseUrl()}/accounts/${this.account()?.id}/instruments`,
    };
    const { data, status } = await CapacitorHttp.get(options);
    if (status === 200) {
      const { instruments } = data;
      this.instruments.set(instruments);
    }
  }

  async updateUserAccountID(accountId: string) {
    if (!this.authService.user()) return;
    await setDoc(
      doc(this.firestore, `settings/${this.authService.profile()?.uid}`),
      {
        oanda: {
          credentials: { accountId },
        },
      } as Partial<Settings>,
      { merge: true },
    );
  }

  async getAccount() {
    const options: HttpOptions = {
      headers: this.getHeaders(),
      url: `${this.getBaseUrl()}/accounts/${
        this.authService.settings()?.oanda?.credentials?.accountId
      }`,
    };
    const { data, status } = await CapacitorHttp.get(options);
    if (status === 200) {
      const { account, lastTransactionID } = data as AccountResponse;
      this.account.set(account);
      this.lastTransactionID.set(lastTransactionID);
      this.pollAccount();
    }
  }

  async getProperties() {
    this.properties.set([]);
    const options: HttpOptions = {
      headers: this.getHeaders(),
      url: `${this.getBaseUrl()}/accounts`,
    };
    const { data, status } = await CapacitorHttp.get(options);
    if (status === 200) {
      this.properties.set(data.accounts);
      this.properties.set(uniqBy(this.properties(), 'id'));
    }
  }

  async getSummaries() {
    this.summaries.set([]);
    for await (const account of this.properties()!) {
      const options: HttpOptions = {
        headers: this.getHeaders(),
        url: `${this.getBaseUrl()}/accounts/${account.id}/summary`,
      };
      const { data, status } = await CapacitorHttp.get(options);
      if (status === 200) {
        const { account } = data;
        this.summaries()?.push(account);
        this.summaries.set(uniqBy(this.summaries(), 'id'));
      }
    }
  }

  canPoll() {
    return (
      this.authService.settings()?.oanda?.credentials.apiKey &&
      this.account()?.id
    );
  }

  async pollAccount() {
    if (!this.canPoll()) return;

    const changes = await this.getAccountChanges();

    if (changes?.status !== 200) return;

    const poll = changes.data as AccountPoll;
    this.poll.set(poll);
    this.lastTransactionID.set(poll.lastTransactionID);

    if (this.isNewTransaction()) await this.getAccount();

    if (!poll.changes) return;

    const {
      ordersCancelled,
      ordersCreated,
      ordersFilled,
      ordersTriggered,
      tradesClosed,
      tradesOpened,
      tradesReduced,
    } = poll.changes;

    const { orders, trades } =
      this.authService.settings()?.oanda?.notifications!;

    for (const order of ordersCancelled) {
      const { id, type } = order;
      const title = 'Order Cancelled';
      const orderType = capitalCase(type);
      const description = `${orderType} Order ${id} cancelled.`;
      const route = `orders/${order.id}`;

      if (!orders.ordersCancelled) return;
      this.presentToast(title, description, route);
    }

    for (const order of ordersCreated) {
      const { id, type } = order;
      const title = 'Order Created';
      const orderType = capitalCase(type);
      const description = `${orderType} Order ${id} created.`;
      const route = `orders/${order.id}`;

      if (!orders.ordersCreated) return;
      this.presentToast(title, description, route);
    }

    for (const order of ordersFilled) {
      const { id, type } = order;
      const title = 'Order Filled';
      const orderType = capitalCase(type);
      const description = `${orderType} Order ${id} filled.`;
      const route = `orders/${order.id}`;

      if (!orders.ordersFilled) return;
      this.presentToast(title, description, route);
    }

    for (const order of ordersTriggered) {
      const { id, type } = order;
      const title = 'Order Triggered';
      const orderType = capitalCase(type);
      const description = `${orderType} Order ${id} triggered.`;
      const route = `orders/${order.id}`;

      if (!orders.ordersTriggered) return;
      this.presentToast(title, description, route);
    }

    for (const trade of tradesClosed) {
      const state: TradeStateFilter = 'CLOSED';
      const title = 'Trade Closed';
      const { body } = this.prepareNotificationPayload(state, trade);
      const route = `trades/${trade.id}`;

      if (!trades.tradesClosed) return;
      this.presentToast(title, body!, route);
    }

    for (const trade of tradesOpened) {
      const state: TradeStateFilter = 'OPEN';
      const title = 'Trade Opened';
      const { body } = this.prepareNotificationPayload(state, trade);
      const route = `trades/${trade.id}`;

      if (!trades.tradesOpened) return;
      this.presentToast(title, body!, route);
    }

    for (const trade of tradesReduced) {
      const { id, currentUnits } = trade;
      const title = 'Trade Reduced';
      const units = this.formatUnits(currentUnits);
      const description = `Trade ${id} has been reduced to ${units} units.`;
      const route = `trades/${trade.id}`;

      if (!trades.tradesReduced) return;
      this.presentToast(title, description, route);
    }
  }

  presentToast(title: string, description: string, route: string) {
    // this.toast.present(title, {
    //   description,
    //   action: {
    //     label: 'View',
    //     onClick: () => {
    //       this.router.navigateByUrl(route);
    //     },
    //   },
    // });
  }

  prepareNotificationPayload = (
    state: TradeStateFilter,
    trade: TradeSummary,
  ): Partial<Notification> => {
    let payload: Partial<Notification>;
    switch (state) {
      case 'OPEN':
        payload = this.createOpenPayload(trade);
        break;

      case 'CLOSED':
        payload = this.createClosePayload(trade);
        break;

      default:
        break;
    }
    return payload!;
  };

  createOpenPayload = (trade: TradeSummary): Partial<Notification> => {
    let { instrument, initialUnits, initialMarginRequired, price } = trade;
    const units = Number(initialUnits);
    const formattedUnits = this.formatUnits(units);
    const verb = units > 0 ? 'Bought' : 'Sold';
    const margin = this.formatCurrency(Number(initialMarginRequired));
    instrument = instrument.split('_').join('/');
    const body = `${verb} ${formattedUnits} units of ${instrument} for ${margin} @ ${price}`;
    return { body };
  };

  createClosePayload = (trade: TradeSummary): Partial<Notification> => {
    let {
      realizedPL,
      instrument,
      initialMarginRequired,
      averageClosePrice,
      price,
    } = trade;
    const realized = Number(realizedPL);
    const { displayPrecision, pipLocation } = this.instruments()?.filter(
      (pair: Instrument) => pair.name === instrument,
    )[0]!;
    instrument = instrument.split('_').join('/');
    const distance = this.getDistanceBetweenPips(
      averageClosePrice,
      price,
      displayPrecision,
    );
    const pips = this.formatPips(distance, pipLocation);
    const pnlNoun = realized >= 0 ? 'profit' : 'loss';
    const pnl = this.formatCurrency(realized);
    const change = this.getPercentageChange(
      initialMarginRequired,
      initialMarginRequired + realizedPL,
    );
    const percentage = this.formatPercentage(change);
    const body = `${instrument} closed with a ${pnlNoun} of ${pnl} (${percentage} | ${pips} pips).`;
    return { body };
  };

  getDistanceBetweenPips = (
    a: number | string,
    b: number | string,
    displayPrecision: number,
    absolute?: boolean,
  ): number => {
    if (absolute) {
      return Math.abs(
        Number((Number(a) - Number(b)).toFixed(displayPrecision)),
      );
    }
    return Number((Number(a) - Number(b)).toFixed(displayPrecision));
  };

  formatPips = (pips: number | string, pipLocation: number) => {
    return Number((Number(pips) * 10 ** Math.abs(pipLocation)).toFixed(1));
  };

  filterInstruments = (name: string): Instrument => {
    return this.instruments()?.filter((i) => i.name === name)[0]!;
  };

  getPointSize = (id: string): number => {
    const { pipLocation, displayPrecision } = this.filterInstruments(id);
    return Number((10 ** pipLocation).toFixed(displayPrecision));
  };

  getPercentageChange(start: number | string, end: number | string): number {
    return (Number(end) - Number(start)) / Number(start);
  }

  formatIntl = (value: number, options?: Intl.NumberFormatOptions): string => {
    return Intl.NumberFormat('en', options).format(value);
  };

  formatUnits = (units: number | string): string => {
    return this.formatIntl(Number(units), { notation: 'compact' });
  };

  formatPercentage = (percentage: number): string => {
    return this.formatIntl(percentage, {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  formatCurrency = (value: number): string => {
    return this.formatIntl(value, {
      style: 'currency',
      currency: this.currency(),
      notation: 'compact',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  isNewTransaction() {
    return this.account()?.lastTransactionID !== this.poll()?.lastTransactionID;
  }

  private getApiKey(): string | undefined {
    return this.authService.settings()?.oanda?.credentials?.apiKey;
  }

  /**
   *
   * @returns Endpoint used to poll an Account for its current state and changes since a specified TransactionID.
   */
  private async getAccountChanges(): Promise<HttpResponse | undefined> {
    const options: HttpOptions = {
      headers: this.getHeaders(),
      params: { sinceTransactionID: this.lastTransactionID()! },
      url: `${this.getBaseUrl()}/accounts/${this.account()?.id}/changes`,
    };

    return await CapacitorHttp.get(options);
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
}
