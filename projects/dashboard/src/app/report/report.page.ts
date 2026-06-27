import { Component, computed, effect, input, signal } from '@angular/core';
import {
  CurrencyPipe,
  DatePipe,
  DecimalPipe,
  NgClass,
  PercentPipe,
  TitleCasePipe,
} from '@angular/common';
import { SpinnerComponent } from '../spinner/spinner.component';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';
import {
  endOfMonth,
  format,
  formatRFC3339,
  fromUnixTime,
  startOfMonth,
} from 'date-fns';
import {
  OrderFillTransaction,
  Trade,
  TransactionFilter,
  TransferFundsTransaction,
} from '../interfaces/oanda/oanda';
import { AuthService } from '../services/auth/auth.service';
import { OandaService } from '../services/oanda/oanda.service';
import { AppComponent } from '../app.component';
import { RouterLink } from '@angular/router';
import { uniq } from 'lodash-es';
import { SlashPipe } from '../pipes/slash/slash.pipe';
import { NoCasePipe } from '../pipes/no-case/no-case.pipe';
import { HttpParams } from '@capacitor/core';
import { TradeReportComponent } from '../trade-report/trade-report.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { PositionReportComponent } from '../position-report/position-report.component';
import { OrdinalPipe } from '../pipes/ordinal/ordinal.pipe';
import { TitleService } from '../services/title/title.service';
import { FooterComponent } from '../footer/footer.component';
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
    NgClass,
    SpinnerComponent,
    BreadcrumbsComponent,
    DatePipe,
    CurrencyPipe,
    PercentPipe,
    SlashPipe,
    NoCasePipe,
    RouterLink,
    TitleCasePipe,
    DecimalPipe,
    TradeReportComponent,
    PageNotFoundComponent,
    PositionReportComponent,
    OrdinalPipe,
    FooterComponent,
  ],
})
export class ReportPage {
  date = input<string>();
  transactions = signal<OrderFillTransaction[] | undefined>(undefined);
  transfers = computed(() => this.computeTransfers());
  trades = signal<Trade[] | undefined>([]);
  response = signal<Transactions | undefined>(undefined);

  // computes
  unix = computed(() => this.computeUnix());
  month = computed(() => this.computeMonth());
  year = computed(() => this.computeYear());

  from = computed(() => this.computeFromDate());
  to = computed(() => this.computeToDate());
  startDate = computed(() => this.computeStartDate());
  endDate = computed(() => this.computeEndDate());

  startBalance = computed(() => this.computeStartBalance());
  endBalance = computed(() => this.computeEndBalance());

  deposits = computed(() => this.computeDeposits());
  withdrawals = computed(() => this.computeWithdrawals());

  dateRange = computed(() => this.computeDateRange());
  pages = computed(() => this.computePages());
  realized = computed(() => this.computeRealized());
  change = computed(() => this.computeChange());
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
  count = signal(500);
  constructor(
    public app: AppComponent,
    public auth: AuthService,
    private oanda: OandaService,
    private title: TitleService,
    private percentage: PercentageService,
  ) {
    effect(() => {
      this.setTitle();
      if (app.isReady()) this.getTransactions();
    });
  }

  setTitle() {
    this.title.setTitle(`${this.month()} ${this.year()} Report`);
  }

  async getTrades() {
    if (!this.tradeIDs()?.length) return;

    const params: HttpParams = {
      ids: this.tradeIDs().join(','),
      state: 'CLOSED',
      count: this.count().toString(),
    };
    const { data, status } = await this.oanda.getTrades(params);

    if (status === 200) {
      const trades: Trade[] = data.trades;
      this.trades?.set([...trades]);
    }
  }

  async getTransactions() {
    const type = 'ORDER_FILL,FUNDING';
    const params: HttpParams = {
      from: this.from().toString(),
      to: this.to().toString(),
      pageSize: this.pageSize().toString(),
      type,
    };

    const { data, status } = await this.oanda.getTransactions(params);

    if (status === 200) {
      this.response.set(data);
      await this.getTransactionsIDRange();
    }
  }

  async getTransactionsIDRange() {
    try {
      let transactions: OrderFillTransaction[] = [];

      for await (const page of this.pages()!) {
        const { data, status } = await this.oanda.getTransactionsIDRange(page);

        if (status === 200) transactions?.push(...data.transactions);
      }
      this.transactions?.set(transactions);
      this.getTrades();
    } catch (error) {
      console.error(error);
    }
  }

  // Computes

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
    if (this.losses() === 0) return 1;
    if (this.wins() === 0) return 0;
    return this.wins()! / (this.wins()! + this.losses()!);
  }

  computeWins() {
    const x = this.transactions()?.filter((t) => Number(t.pl) > 0)?.length;
    return x;
  }

  computeLosses() {
    const x = this.transactions()?.filter((t) => Number(t.pl) < 0)?.length;
    return x;
  }

  computeUnix() {
    return new Date(fromUnixTime(Number(this.date())));
  }

  computeMonth() {
    return format(this.unix(), 'MMMM');
  }

  computeYear() {
    return format(this.unix(), 'Y');
  }

  computeDateRange() {
    if (!this.startDate() || !this.endDate() || !this.date()) {
      return `${this.month()} ${this.year()}`;
    }
    const start = format(new Date(this.startDate()!), 'do');
    const end = format(new Date(this.endDate()!), 'do');
    return `${start} - ${end} ${this.month()} ${this.year()}`;
  }

  computeFromDate() {
    const month = fromUnixTime(Number(this.date())!);
    return formatRFC3339(startOfMonth(new Date(month)));
  }

  computeToDate() {
    const month = fromUnixTime(Number(this.date())!);
    return formatRFC3339(endOfMonth(new Date(month)));
  }

  computeChange() {
    return this.percentage.getPercentageChange(
      this.startBalance()!,
      this.endBalance()!,
    );
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
