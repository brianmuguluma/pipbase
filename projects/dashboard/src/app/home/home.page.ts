import { Component, computed, effect, signal } from '@angular/core';
import {
  CurrencyPipe,
  DecimalPipe,
  NgClass,
  PercentPipe,
  TitleCasePipe,
} from '@angular/common';
import { AppComponent } from '../app.component';
import { AuthService } from '../services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import {
  OrderFillTransaction,
  TransactionsResponse,
} from '../interfaces/oanda/oanda';
import { OandaService } from '../services/oanda/oanda.service';
import { isAfter, parseISO, startOfDay, subDays } from 'date-fns';
import { SpinnerComponent } from '../spinner/spinner.component';
import { uniq } from 'lodash-es';
import { SlashPipe } from '../pipes/slash/slash.pipe';
import { NoCasePipe } from '../pipes/no-case/no-case.pipe';
import { SetupComponent } from '../setup/setup.component';
import { SkeletonComponent } from '../skeleton/skeleton.component';
import { HttpParams } from '@capacitor/core';
import { CompactPipe } from '../pipes/compact/compact.pipe';
import { EmptyComponent } from '../empty/empty.component';
import { FooterComponent } from '../footer/footer.component';
import { PercentageService } from '../services/percentage/percentage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    NgClass,
    RouterLink,
    CurrencyPipe,
    SpinnerComponent,
    PercentPipe,
    DecimalPipe,
    SlashPipe,
    NoCasePipe,
    TitleCasePipe,
    SetupComponent,
    SkeletonComponent,
    CompactPipe,
    EmptyComponent,
    FooterComponent,
  ],
})
export class HomePage {
  isEmpty = signal(false);
  transactions = signal<TransactionsResponse | undefined>(undefined);
  orderFillsTransactions = signal<OrderFillTransaction[] | undefined>(
    undefined,
  );
  orderFills = computed(() => this.computeOrderFills());
  from = computed(() => this.computeFromDate());
  to = computed(() => new Date().toDateString());
  days = signal<number | null>(7);
  pageSize = signal(1000);
  realized = computed(() => this.computeRealized());
  realizedFrom = computed(() => this.computeRealizedFrom());
  realizedPercentage = computed(() => this.computeRealizedPercentage());
  unrealizedPercentage = computed(() => this.computeUnrealizedPercentage());
  constructor(
    public app: AppComponent,
    public auth: AuthService,
    private router: Router,
    private oanda: OandaService,
    private percentage: PercentageService,
  ) {
    effect(() => {
      if (app.account()) this.getTransactions();
    });
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

  updateDays(days: number | null) {
    this.days.set(days);
  }

  computeFromDate() {
    return startOfDay(subDays(new Date(), this.days() || 30));
  }

  async navigateByUrl(url: string) {
    await this.router.navigateByUrl(url);
  }

  async getTransactions() {
    const params: HttpParams = {
      from: subDays(new Date(), 30).toDateString(),
      type: 'ORDER_FILL',
      pageSize: this.pageSize().toString(),
    };
    const { data, status } = await this.oanda.getTransactions(params);

    if (status === 200) {
      // if (pages.length) {
      this.transactions.set(data);

      await this.getTransactionsIDRange();
      // } else {
      //   this.transactions.set(undefined);
      // }
    }
  }

  async getTransactionsIDRange() {
    try {
      let transactions: OrderFillTransaction[] = [];

      for await (const page of this.transactions()?.pages!) {
        const response = await this.oanda.getTransactionsIDRange(page);

        if (!response) return;

        const { data, status } = response;

        if (status === 200) {
          transactions?.push(...data?.transactions);
        }
      }

      this.orderFillsTransactions?.set(transactions);
    } catch (error) {}
  }
}
