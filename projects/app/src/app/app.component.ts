import {
  AfterViewInit,
  Component,
  OnInit,
  computed,
  effect,
  signal,
} from '@angular/core';
import { Platform, IonTabs } from '@ionic/angular/standalone';
import { User } from './interfaces/user';
import {
  Account,
  AccountPoll,
  AccountProperty,
  AccountResponse,
  Instrument,
  PositionStateFilter,
} from './interfaces/oanda';
import { RateLimiter } from 'limiter';
import { AuthService } from './services/auth/auth.service';
import { PreferencesService } from './services/preferences/preferences.service';
import { GetResult } from '@capacitor/preferences';
import {
  CapacitorHttp,
  HttpHeaders,
  HttpOptions,
  HttpResponse,
} from '@capacitor/core';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import { Device } from '@capacitor/device';
import {
  Chart,
  CategoryScale,
  BarElement,
  LineController,
  LineElement,
  LinearScale,
  BarController,
  PointElement,
  Filler,
  Legend,
  Colors,
} from 'chart.js';
import { isUndefined, uniqBy } from 'lodash-es';
import { Auth, authState } from '@angular/fire/auth';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AnalyticsService } from './services/analytics/analytics.service';
import { Customer } from './interfaces/stripe';
import { NetworkService } from './services/network/network.service';
import { MenuComponent } from './menu/menu.component';
import { setDefaultOptions } from 'date-fns';
import * as locale from 'date-fns/locale';
import { ClientOptions, Realtime } from 'ably';
import { environment } from 'src/environments/environment.example';
import { Occupancy } from './interfaces/ably';
import {
  IonApp,
  IonSplitPane,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonRouterOutlet,
} from '@ionic/angular/standalone';
import Cron from 'croner';

Chart.register(
  CategoryScale,
  BarElement,
  LineController,
  LineElement,
  BarController,
  PointElement,
  LinearScale,
  Filler,
  Legend,
  Colors,
);

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    IonTabs,
    MenuComponent,
    IonApp,
    IonSplitPane,
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonRouterOutlet,
  ],
})
export class AppComponent implements OnInit, AfterViewInit {
  prefersDark = signal<boolean | undefined>(undefined);
  isPaperTrading = signal<boolean | undefined>(undefined);
  public oandaRateLimit = signal(
    new RateLimiter({
      tokensPerInterval: 40,
      interval: 'second',
    }),
  );
  device = signal<string | undefined>(undefined);
  isEnvironmentSet = signal<boolean>(false);
  isReady = computed(() => this.computeIsReady());
  customer = signal<Customer | undefined>(undefined);
  subscriptions = computed(() => this.customer()?.subscriptions.data);

  // Accounts
  account = signal<Account | undefined>(undefined);
  poll = signal<AccountPoll | undefined>(undefined);
  properties = signal<AccountProperty[] | undefined>(undefined);
  summaries = signal<Account[] | undefined>(undefined);
  instruments = signal<Instrument[] | undefined>(undefined);

  // positions
  positionStateFilters: PositionStateFilter[] = ['ALL', 'OPEN'];
  positionStateFilter = signal<PositionStateFilter>('ALL');

  currency = computed(() => this.account()?.currency ?? undefined);

  // Ably
  occupancy = signal<Occupancy | undefined>(undefined);

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
    public authService: AuthService,
    private auth: Auth,
    private preferences: PreferencesService,
    private firestore: Firestore,
    public platform: Platform,
    private router: Router,
    private analytics: AnalyticsService,
    private network: NetworkService,
  ) {
    network.getStatus();
    network.addListener();
    effect(() => {
      if (authService.idToken()?.claims?.['admin']) this.getOccupancy();
    });
    effect(async () => {
      if (this.authService.settings()?.oanda?.credentials.apiKey) {
        await this.getEnvironment();
        await this.getProperties();
        await this.getSummaries();
      }
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

  async setLocale() {
    const { value } = await Device.getLanguageTag();
    const x: any = value.split('-').join('');
    const y: any = locale;

    setDefaultOptions({ locale: y[x] });
  }

  async ngAfterViewInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((tabTitle: any) => {
        this.analytics.setCurrentScreen(tabTitle.url);
      });
    // this.authService.user$.subscribe(async (user: User) => {
    //   this.user = user;
    //   if (user) {
    // const { uid, displayName, email } = user;
    // this.getAccount();
    // this.platform.ready().then(() => {
    //   const { setup, setDebugLogsEnabled, setAttributes, logIn } =
    //     CapacitorPurchases;
    //   setDebugLogsEnabled({ enabled: !environment.production });
    //   setup({ apiKey: environment.revenueCat });
    //   logIn({ appUserID: uid });
    //   setAttributes({
    //     attributes: {
    //       [`$displayName`]: displayName,
    //       [`$email`]: email,
    //       // [`$firebaseAppInstanceId`]: email,
    //     },
    //   });
    // });
    //   }
    // });
    // const { platform } = await Device.getInfo();
    // if (platform !== 'web') {
    //   // Request permission to use push notifications
    //   // iOS will prompt user and return if they granted permission or not
    //   // Android will just grant without prompting
    //   const { receive } = await PushNotifications.requestPermissions();
    //   if (receive === 'granted') {
    //     // Register with Apple / Google to receive push via APNS/FCM
    //     PushNotifications.register();
    //   } else {
    //     // Show some error
    //   }
    //   PushNotifications.addListener('registration', (token: Token) => {
    //     const { value } = token;
    //     if (value) {
    //       this.authService.user$.pipe(take(1)).subscribe(async (user: User) => {
    //         if (user) {
    //           const { uid } = user;
    //           await setDoc(doc(this.firestore, `devices/${value}`), {
    //             token: value,
    //             uid,
    //           });
    //           this.authService.token = value;
    //         }
    //       });
    //     }
    //   });
    //   PushNotifications.addListener('registrationError', (error: any) => {});
    //   PushNotifications.addListener(
    //     'pushNotificationReceived',
    //     async (notification: PushNotificationSchema) => {
    //       const { title, body } = notification;
    //       const {
    //         data: { route },
    //       } = notification;
    //       if (route && this.router.url !== route) {
    //         this.notificationService.schedule({ title, body, id: 1 });
    //       }
    //     }
    //   );
    //   PushNotifications.addListener(
    //     'pushNotificationActionPerformed',
    //     (notification: ActionPerformed) => {
    //       const {
    //         notification: {
    //           data: { route },
    //         },
    //       } = notification;
    //       if (route) {
    //         this.router.navigateByUrl(route);
    //       }
    //     }
    //   );
    // }
  }

  computeIsReady() {
    return Boolean(this.isEnvironmentSet() && this.account());
  }

  getOccupancy() {
    const options: ClientOptions = { key: environment.ably };
    const client = new Realtime(options);
    const channel = client.channels.get(`signals`, {
      params: { occupancy: 'metrics' },
    });

    channel.subscribe('[meta]occupancy', (msg) => {
      const metrics = msg.data.metrics;

      if (metrics && msg?.name?.includes('[meta]')) {
        this.occupancy.set(metrics);
      }
    });
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
    this.checkUserThemePreference();
  }

  // Use matchMedia to check the user preference
  checkUserThemePreference() {
    const dark = window.matchMedia('(prefers-color-scheme: dark)');

    this.prefersDark.set(dark.matches);

    dark.addEventListener('change', (c) => {
      this.prefersDark.set(c.matches);
    });
  }

  async getEnvironment() {
    if (await this.validateKey(false)) {
      this.isPaperTrading.set(false);
      this.isEnvironmentSet.set(true);
      this.analytics.setUserProperty({ key: 'environment', value: 'live' });
      return;
    }
    if (await this.validateKey(true)) {
      this.isPaperTrading.set(true);
      this.isEnvironmentSet.set(true);
      this.analytics.setUserProperty({ key: 'environment', value: 'demo' });
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

  async getAccountID(): Promise<GetResult> {
    return await this.preferences.getValue({
      key: 'accountID',
    });
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
    if (!this.authService.profile()) return;

    await setDoc(
      doc(this.firestore, `settings/${this.authService.profile()?.uid}`),
      {
        oanda: {
          credentials: { accountId },
        },
      } as Partial<User>,
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

    const changes = await this.getAccountChanges(this.lastTransactionID()!);

    if (changes?.status !== 200) return;

    const poll: AccountPoll = changes.data;
    this.poll.set(poll);
    this.lastTransactionID.set(poll.lastTransactionID);

    const keys = Object.keys(poll.changes);

    const change = keys.some((key) => (poll?.changes as any)[key]?.length);

    if (change) this.getAccount();
  }

  private getApiKey(): string | undefined {
    return this.authService.settings()?.oanda?.credentials?.apiKey;
  }

  /**
   *
   * @param sinceTransactionID ID of the Transaction to get Account changes since.
   *
   * @returns Endpoint used to poll an Account for its current state and changes since a specified TransactionID.
   */
  private async getAccountChanges(
    sinceTransactionID: string,
  ): Promise<HttpResponse | undefined> {
    const options: HttpOptions = {
      headers: this.getHeaders(),
      url: `${this.getBaseUrl()}/accounts/${
        this.account()?.id
      }/changes?sinceTransactionID=${sinceTransactionID}`,
    };
    try {
      return await CapacitorHttp.get(options);
    } catch (error) {
      return;
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
}
