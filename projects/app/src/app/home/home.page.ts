import {
  Component,
  ElementRef,
  ViewChild,
  computed,
  effect,
  signal,
} from '@angular/core';
import {
  CurrencyPipe,
  NgClass,
  PercentPipe,
  TitleCasePipe,
} from '@angular/common';
import {
  IonRouterOutlet,
  ModalController,
  RefresherEventDetail,
  SegmentChangeEventDetail,
} from '@ionic/angular/standalone';
import { AppComponent } from '../app.component';
import { AuthService } from '../services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { SpinnerComponent } from '../spinner/spinner.component';
import { CredentialsComponent } from '../credentials/credentials.component';
import { CompactPipe } from '../pipes/compact/compact.pipe';
import { ItemSkeletonComponent } from '../item-skeleton/item-skeleton.component';
import {
  OrderFillTransaction,
  TransactionsResponse,
} from '../interfaces/oanda';
import { OandaService } from '../services/oanda/oanda.service';
import { format, isAfter, parseISO, startOfDay, subDays } from 'date-fns';
import { Chart, ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { FeaturesPage } from '../features/features.page';
import { uniq } from 'lodash-es';
import { HttpParams } from '@capacitor/core';
import { SlashPipe } from '../pipes/slash/slash.pipe';
import { FormatRelativePipe } from '../pipes/formatDistance/formatDistance.pipe';
import { NoCasePipe } from '../pipes/no-case/no-case.pipe';
import { SetupComponent } from '../setup/setup.component';
import { addIcons } from 'ionicons';
import { personCircleOutline, arrowForwardOutline } from 'ionicons/icons';
import {
  IonRouterLinkWithHref,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonButton,
  IonIcon,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonContent,
  IonRefresher,
  IonRefresherContent,
  IonCard,
  IonCardContent,
  IonText,
  IonNote,
  IonList,
  IonItem,
} from '@ionic/angular/standalone';
import { PercentageService } from '../services/percentage/percentage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    NgClass,
    SpinnerComponent,
    CredentialsComponent,
    CompactPipe,
    CurrencyPipe,
    PercentPipe,
    ItemSkeletonComponent,
    RouterLink,
    SlashPipe,
    FormatRelativePipe,
    NoCasePipe,
    TitleCasePipe,
    SetupComponent,
    IonRouterLinkWithHref,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
    IonButton,
    IonIcon,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonContent,
    IonRefresher,
    IonRefresherContent,
    IonCard,
    IonCardContent,
    IonText,
    IonNote,
    IonList,
    IonItem,
  ],
})
export class HomePage {
  @ViewChild('canvas') canvas: ElementRef | undefined;
  spinner = computed(() => this.computeSpinner());
  transactions = signal<TransactionsResponse | undefined>(undefined);
  orderFillsTransactions = signal<OrderFillTransaction[] | undefined>(
    undefined,
  );
  orderFills = computed(() => this.computeOrderFills());
  from = computed(() => this.computeFromDate());
  to = computed(() => new Date().toDateString());
  days = signal<number | null>(7);
  pages = signal<string[]>([]);
  pageSize = signal(1000);
  bars = computed(() => this.computeBars());
  chart: Chart | undefined;
  chartType = signal<ChartType>('bar');
  chartOptions = signal<ChartOptions>({
    responsive: true,
    scales: {
      x: { display: false },
      y: { display: false },
    },
    parsing: {
      xAxisKey: 'date',
      yAxisKey: 'balance',
    },
    plugins: { legend: { display: false }, tooltip: { enabled: true } },
  });
  realized = computed(() => this.computeRealized());
  realizedFrom = computed(() => this.computeRealizedFrom());
  realizedPercentage = computed(() => this.computeRealizedPercentage());
  unrealizedPercentage = computed(() => this.computeUnrealizedPercentage());
  displayChart = computed(() => this.computeDisplayChart());
  balances = signal<number[]>([]);
  translucent = signal(true);
  collapse = signal<string | undefined>('fade');
  primary = computed(() =>
    this.app.prefersDark() ? '56, 128, 255' : '0, 84, 233',
  );
  constructor(
    public app: AppComponent,
    public auth: AuthService,
    private router: Router,
    private oanda: OandaService,
    private ionRouterOutlet: IonRouterOutlet,
    private modalController: ModalController,
    private percentage: PercentageService,
  ) {
    effect(() => {
      if (auth.profile() === null) this.loginUser();
    });
    effect(() => {
      if (app.isReady() && !this.orderFillsTransactions()?.length)
        this.getTransactions();
    });
    effect(() => {
      //! change happening here on theme change
      if (this.orderFills()?.length && this.days()) this.createChart();
    });
    effect(() => {
      if (this.primary()) this.chart?.update('none');
    });
    addIcons({ personCircleOutline, arrowForwardOutline });
  }

  computeDisplayChart() {
    return (
      (this.app.account()?.positions?.length && !this.transactions()) ||
      !(this.transactions()?.count === 0 && !this.transactions()?.pages?.length)
    );
  }

  computeSpinner() {
    return (
      this.auth.profile() === undefined ||
      this.auth.user() === undefined ||
      this.auth.settings() === undefined
    );
  }

  computeBars() {
    let bars: any[] = [];
    const dates = uniq(
      this.orderFillsTransactions()
        ?.filter((transaction) =>
          isAfter(new Date(parseISO(transaction.time)), new Date(this.from())),
        )
        ?.map((transaction) =>
          format(new Date(transaction?.time), 'yyyy-MM-dd'),
        ),
    );
    dates?.forEach((date) => {
      bars.push({
        date: format(new Date(date), 'dd/MM'),
        balance: this.getBalance(date),
      });
    });
    return bars;
  }

  computeOrderFills() {
    return this.orderFillsTransactions()
      ?.filter(
        (transaction) =>
          isAfter(new Date(transaction.time), this.from()) &&
          (transaction.reason as any) !== 'MARKET_ORDER' &&
          (transaction.reason as any) !== 'LIMIT_ORDER',
      )
      .reverse();
  }

  computeRealizedFrom() {
    return uniq(
      this.orderFillsTransactions()?.filter(
        (transaction) =>
          transaction.accountBalance &&
          isAfter(new Date(parseISO(transaction.time)), new Date(this.from())),
      ),
    )[0];
  }

  computeRealized() {
    if (!this.orderFillsTransactions()?.length) return undefined;

    const transactions = this.orderFillsTransactions()?.filter(
      (t) =>
        t.accountBalance &&
        isAfter(new Date(parseISO(t.time)), new Date(this.from())),
    );

    return transactions?.map((o) => Number(o.pl))?.reduce((r, a) => r + a, 0);
  }

  computeRealizedPercentage(): number | undefined {
    if (!this.realized()) return;

    const orders = this.orderFills();
    const { accountBalance } = orders?.[orders?.length! - 1]!;

    const initial = Number(accountBalance);
    const realized = initial + this.realized()!;

    return this.percentage.getPercentageChange(initial, realized);
  }

  computeUnrealizedPercentage(): number | undefined {
    if (!this.app.poll()) return;

    const { balance } = this.app.account()!;
    const { NAV } = this.app.poll()?.state!;

    return this.percentage.getPercentageChange(balance, NAV);
  }

  computeFromDate() {
    return startOfDay(subDays(new Date(), this.days() || 30));
  }

  async navigateByUrl(url: string) {
    await this.router.navigateByUrl(url);
  }

  updateDays(event: CustomEvent<SegmentChangeEventDetail>) {
    const { value } = event.detail;

    this.balances.set([]);
    this.days.set(value as any);
  }

  async loginUser() {
    const modal = await this.modalController.create({
      component: FeaturesPage,
      presentingElement: this.ionRouterOutlet.nativeEl,
      canDismiss: false,
    });
    await modal.present();
  }

  async refresh(event: CustomEvent<RefresherEventDetail>) {
    await this.getTransactions();
    event.detail.complete();
  }

  async getTransactions() {
    const params: HttpParams = {
      from: subDays(new Date(), 30).toDateString(),
      type: 'ORDER_FILL',
      pageSize: this.pageSize().toString(),
    };
    const transactions = await this.oanda.getTransactions(params);

    if (!transactions) return;

    const { data, status } = transactions;

    this.transactions.set(data);

    if (status !== 200) return;

    const pages: string[] = data.pages;
    if (status === 200 && pages.length) {
      this.pages.set([...pages]);
      await this.getTransactionsIDRange();
    }
  }

  async getTransactionsIDRange() {
    try {
      let transactions: OrderFillTransaction[] = [];

      for await (const page of this.pages()) {
        const response = await this.oanda.getTransactionsIDRange(page);

        if (!response) return;

        const { data, status } = response;

        if (status === 200) {
          transactions?.push(...data?.transactions);
        }
      }

      this.orderFillsTransactions?.set(transactions);
    } catch (error) {
      console.error(error);
    }
  }

  getBalance(date: string) {
    const transactions = this.orderFillsTransactions()?.filter(
      (transaction) =>
        format(new Date(transaction.time), 'yyyy-MM-dd') === date,
    );
    return Number(transactions?.[transactions?.length - 1].accountBalance);
  }

  destroyChart() {
    if (this.chart) this.chart?.destroy();
  }

  createChart() {
    this.destroyChart();
    this.chart = new Chart(this.canvas?.nativeElement, {
      type: this.chartType(),
      options: this.chartOptions(),
      data: {
        datasets: this.getDatasets(),
      },
    });
  }

  getDatasets(): ChartDataset[] {
    const datasets: ChartDataset[] = [];
    const type = this.chartType();
    const borderWidth: number = type === 'line' ? 2 : 0;
    const borderRadius: number = type === 'line' ? 0 : Number.MAX_VALUE;
    const pointRadius = 0;
    const tension = 0.4;
    const color = `rgba(${this.primary()})`;
    datasets.push({
      type,
      tension,
      borderRadius,
      borderWidth,
      pointRadius,
      borderSkipped: false,
      borderColor: color,
      backgroundColor: color,
      pointStyle: 'circle',
      data: this.bars(),
    });
    return datasets;
  }
}
