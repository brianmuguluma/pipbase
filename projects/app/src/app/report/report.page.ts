import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  computed,
  effect,
  input,
  signal,
} from '@angular/core';
import {
  CurrencyPipe,
  DatePipe,
  DecimalPipe,
  NgClass,
  PercentPipe,
} from '@angular/common';
import {
  RefresherEventDetail,
  SegmentChangeEventDetail,
} from '@ionic/angular/standalone';
import { SpinnerComponent } from '../spinner/spinner.component';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component';
import { OandaService } from '../services/oanda/oanda.service';
import {
  addWeeks,
  endOfMonth,
  endOfWeek,
  format,
  formatRFC3339,
  fromUnixTime,
  getWeek,
  getWeekOfMonth,
  getWeeksInMonth,
  isBefore,
  isSameMonth,
  isThisMonth,
  parseISO,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import {
  OrderFillTransaction,
  Trade,
  TransactionFilter,
  TransferFundsTransaction,
} from '../interfaces/oanda';
import { Chart, ChartDataset, ChartType } from 'chart.js';
import { TradesReportComponent } from '../trades-report/trades-report.component';
import { PositionsReportComponent } from '../positions-report/positions-report.component';
import { uniq } from 'lodash-es';
import { HttpParams } from '@capacitor/core';
import { EmptyComponent } from '../empty/empty.component';
import { addIcons } from 'ionicons';
import { chevronDown, chevronUp } from 'ionicons/icons';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
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
} from '@ionic/angular/standalone';
import { PercentageService } from '../services/percentage/percentage.service';

interface Transactions {
  from: string;
  to: string;
  pageSize: number;
  type: TransactionFilter[];
  count: number;
  pages: string[];
  lastTransactionID: string;
}

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
  standalone: true,
  imports: [
    SpinnerComponent,
    CurrencyPipe,
    PercentPipe,
    NgClass,
    DatePipe,
    TradesReportComponent,
    PositionsReportComponent,
    DecimalPipe,
    EmptyComponent,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
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
  ],
})
export class ReportPage {
  @ViewChild('canvas') canvas: ElementRef | undefined;
  date = input<string>();
  transactions = signal<OrderFillTransaction[] | undefined>(undefined);
  transfers = computed(() => this.computeTransfers());
  trades = signal<Trade[]>([]);
  chart = signal<Chart | undefined>(undefined);
  chartType: ChartType = 'bar';
  bars = signal<any[]>([]);

  response = signal<Transactions | undefined>(undefined);
  responseStatus = signal<number | undefined>(undefined);

  week = signal(0);

  // computes
  from = computed(() => this.computeFromDate());
  to = computed(() => this.computeToDate());
  startDate = computed(() => this.computeStartDate());
  endDate = computed(() => this.computeEndDate());
  weeks = computed(() => this.computeWeeks());
  unixTime = computed(() => this.computeUnixTime());
  startOfWeek = computed(() => this.computeStartOfWeek());
  endOfWeek = computed(() => this.computeEndOfWeek());
  weekOfMonth = computed(() => this.computeWeekOfMonth());
  isThisMonth = computed(() => this.computeIsThisMonth());
  isStartBefore = computed(() => this.computeIsStartBefore());
  isEndBefore = computed(() => this.computeIsEndBefore());
  isBeginningMonth = computed(() => this.computeIsBeginningMonth);
  isBeforeCreation = computed(() => this.canLoad());

  startBalance = computed(() => this.computeStartBalance());
  endBalance = computed(() => this.computeEndBalance());

  deposits = computed(() => this.computeDeposits());
  withdrawals = computed(() => this.computeWithdrawals());

  dateRange = computed(() => this.computeDateRange());
  pages = computed(() => this.computePages());
  realized = computed(() => this.computeRealized());
  change = computed(() => this.computePercentage());
  margin = computed(() => this.computeMargin());
  financing = computed(() => this.computeFinancing());
  opened = computed(() => this.computeOpened());
  closed = computed(() => this.computeClosed());
  instruments = computed<string[] | undefined>(() => this.computeInstruments());
  wins = computed(() => this.computeWins());
  losses = computed(() => this.computeLosses());
  winRate = computed(() => this.computeWinRate());
  tradeIDs = computed(() => this.computeTradeIds());

  // filters
  pageSize = signal(1000);
  constructor(
    public app: AppComponent,
    private oanda: OandaService,
    private percentage: PercentageService,
  ) {
    effect(() => {
      if (app.isReady()) this.getTransactions();
    });
    addIcons({ chevronDown, chevronUp });
  }

  async getTrades() {
    if (!this.tradeIDs()?.length) return;

    const params: HttpParams = {
      ids: this.tradeIDs().join(','),
      state: 'CLOSED',
    };
    const { data, status } = await this.oanda.getTrades(params);

    if (status === 200) {
      const trades: Trade[] = data.trades;
      this.trades?.set([...trades]);
    }
  }

  computeIsStartBefore() {
    return isBefore(
      this.startOfWeek(),
      new Date(this.app.account()?.createdTime!),
    );
  }

  computeIsEndBefore() {
    return isBefore(
      this.endOfWeek(),
      new Date(this.app.account()?.createdTime!),
    );
  }

  async getTransactions() {
    const type = 'ORDER_FILL,FUNDING';
    const params: HttpParams = {
      to: this.to(),
      pageSize: this.pageSize().toString(),
      type,
    };

    if (!this.isStartBefore()) params['from'] = this.from();

    const response = await this.oanda.getTransactions(params);

    console.log(response);

    if (response === undefined) return;

    const { data, status } = response;

    this.responseStatus.set(status);

    console.log(status, data);

    if (status === 200) {
      this.response.set(data);
      await this.getTransactionsIDRange();
    }
  }

  async refresh(event: CustomEvent<RefresherEventDetail>) {
    await this.getTransactions();
    event.detail.complete();
  }

  async getTransactionsIDRange() {
    try {
      let transactions: OrderFillTransaction[] = [];

      if (!this.pages()?.length) this.clearChart();

      for await (const page of this.pages()!) {
        const response = await this.oanda.getTransactionsIDRange(page);

        if (!response) return;

        const { data, status } = response;

        if (status === 200) transactions?.push(...data.transactions);
      }
      this.transactions?.set(transactions);
      await this.getTrades();
      if (transactions.length) this.aggregateDatesByDay();
    } catch (error) {
      console.error(error);
    }
  }

  aggregateDatesByDay() {
    this.bars.set([]);
    const dates = uniq(
      this.transactions()?.map((transaction) =>
        format(new Date(transaction?.time), 'yyyy-MM-dd'),
      ),
    );
    dates?.forEach((date) => {
      this.bars().push({
        date: format(new Date(date), 'do'),
        balance: this.getBalance(date),
      });
    });

    this.createChart();
  }

  getBalance(date: string) {
    const transactions = this.transactions()?.filter(
      (transaction) =>
        format(new Date(transaction.time), 'yyyy-MM-dd') === date,
    );
    return Number(transactions?.[transactions?.length - 1].accountBalance);
  }

  createChart() {
    if (this.chart()) this.chart()?.destroy();
    this.chart.set(
      new Chart(this.canvas?.nativeElement, {
        type: this.chartType,
        options: {
          responsive: true,
          scales: {
            x: { display: false },
            y: { display: false },
          },
          parsing: {
            xAxisKey: 'date',
            yAxisKey: 'balance',
          },
          plugins: { legend: { display: false } },
        },
        data: {
          labels: this.bars()?.map((bar) => bar.date),
          datasets: this.getDatasets(),
        },
      }),
    );
  }

  getDatasets(): ChartDataset[] {
    const datasets: ChartDataset[] = [];
    const type = this.chartType;
    const borderWidth: number = type === 'line' ? 4 : 0;
    const borderRadius: number = type === 'line' ? 0 : Number.MAX_VALUE;
    const pointRadius = 0;
    const tension = 0.4;
    const primary = '56, 128, 255';
    datasets.push({
      type,
      tension,
      borderRadius,
      borderWidth,
      pointRadius,
      borderColor: `rgba(${primary})`,
      backgroundColor: `rgba(${primary})`,
      pointStyle: 'circle',
      data: this.bars(),
      borderSkipped: false,
    });
    return datasets;
  }

  // Computes

  canLoad() {
    return this.isStartBefore() && this.isEndBefore();
  }

  computeSpinner() {
    return this.response();
  }

  computeIsEmpty() {
    return this.response() && !this.response()?.count;
  }

  computeIsBeginningMonth() {
    return isSameMonth(
      this.unixTime(),
      new Date(this.app.account()?.createdTime!),
    );
  }

  computeIsThisMonth() {
    return isThisMonth(this.unixTime());
  }

  computeTransfers() {
    return this.transactions()?.filter((t) => t.type === 'TRANSFER_FUNDS') as
      | TransferFundsTransaction[]
      | undefined;
  }

  computeDeposits() {
    return this.transfers()
      ?.filter((t) => Number(t.amount) > 0)
      ?.map((t) => Number(t.amount))
      ?.reduce((r, a) => r + a, 0);
  }

  computeWithdrawals() {
    return this.transfers()
      ?.filter((t) => Number(t.amount) < 0)
      ?.map((t) => Number(t.amount))
      ?.reduce((r, a) => r + a, 0);
  }

  computeEndBalance() {
    return this.transactions()?.[this.transactions()!?.length - 1]
      ?.accountBalance;
  }

  computeStartBalance() {
    return this.transactions()?.[0]?.accountBalance;
  }

  computeStartDate() {
    return this.trades()?.[this.trades()!?.length - 1]?.closeTime;
  }

  computeEndDate() {
    return this.trades()?.[0]?.closeTime;
  }

  computePages() {
    return this.response()?.pages?.length ? this.response()?.pages : [];
  }

  computeTradeIds() {
    let ids: string[] = [];
    const trades = this.transactions()?.filter((t) => t.tradesClosed?.length);

    trades?.forEach((t) => t.tradesClosed.forEach((t) => ids.push(t.tradeID)));
    return uniq(ids);
  }

  computeWinRate() {
    return this.wins()! / (this.wins()! + this.losses()!);
  }

  computeWins() {
    return this.trades()?.filter((t) => Number(t.realizedPL) > 0)?.length;
  }

  computeLosses() {
    return this.trades()?.filter((t) => Number(t.realizedPL) < 0)?.length;
  }

  computeDateRange() {
    const unix = new Date(this.unixTime());
    const month = format(unix, 'MMMM Y');
    if (!this.startOfWeek() || !this.endOfWeek() || !this.date()) return month;
    const start = format(new Date(this.startOfWeek()!), 'do');
    const end = format(new Date(this.endOfWeek()!), 'do');
    return `${start} - ${end} ${month}`;
  }

  setWeek(event: CustomEvent<SegmentChangeEventDetail>) {
    this.response.set(undefined);
    this.transactions.set([]);
    this.clearChart();
    const { value } = event.detail;
    this.week.set(Number(value));
  }

  clearChart() {
    this.chart()?.clear();
    this.chart()?.reset();
  }

  computeWeekOfMonth() {
    return getWeekOfMonth(new Date());
  }

  computeWeeks() {
    return [...Array(getWeeksInMonth(this.unixTime())).keys()];
  }

  computeUnixTime() {
    return fromUnixTime(Number(this.date())!);
  }

  computeStartOfWeek() {
    if (this.week() === 0) return startOfMonth(this.unixTime());
    return startOfWeek(addWeeks(this.unixTime(), this.week()));
  }

  computeEndOfWeek() {
    if (this.week() === this.weeks().length - 1)
      return endOfMonth(this.unixTime());
    return endOfWeek(addWeeks(this.unixTime(), this.week()));
  }

  computeFromDate() {
    return formatRFC3339(this.startOfWeek());
  }

  computeToDate() {
    return formatRFC3339(this.endOfWeek());
  }

  computePercentage() {
    const start = Number(this.startBalance())!;
    const end = Number(this.endBalance())!;

    return this.percentage.getPercentageChange(start, end);
  }

  computeOpened() {
    return this.transactions()?.filter((transaction) => transaction.tradeOpened)
      ?.length;
  }

  computeClosed() {
    return this.transactions()?.filter(
      (transaction) => transaction.tradesClosed,
    )?.length;
  }

  computeInstruments() {
    return uniq(
      this.trades()
        ?.filter((t) => t.instrument)
        .map((t) => t.instrument),
    );
  }

  computeRealized() {
    return this.trades()
      ?.map((t) => Number(t.realizedPL))
      ?.reduce((realized, a) => realized + a, 0);
  }

  computeMargin() {
    return this.trades()
      ?.map((t) => Number(t.initialMarginRequired))
      ?.reduce((margin, a) => margin + a, 0);
  }

  computeFinancing() {
    return this.trades()
      ?.map((t) => Number(t.financing))
      ?.reduce((f, a) => f + a, 0);
  }
}
