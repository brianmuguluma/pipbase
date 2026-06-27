import { Component, computed, effect, signal } from '@angular/core';
import {
  Transaction,
  TransactionFilter,
  TransactionFilterList,
  TransactionsResponse,
  transactionFilterList,
} from '../interfaces/oanda/oanda';
import { OandaService } from '../services/oanda/oanda.service';
import { AppComponent } from '../app.component';
import { HttpParams } from '@capacitor/core';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { NoCasePipe } from '../pipes/no-case/no-case.pipe';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';
import {
  ActivatedRoute,
  NavigationExtras,
  Params,
  QueryParamsHandling,
  Router,
  RouterLink,
} from '@angular/router';
import { SlashPipe } from '../pipes/slash/slash.pipe';
import { TransactionItemComponent } from '../transaction-item/transaction-item.component';
import { SkeletonComponent } from '../skeleton/skeleton.component';
import { EmptyComponent } from '../empty/empty.component';
import { capitalCase } from 'change-case';
import { HeaderComponent } from '../header/header.component';
import { TitleService } from '../services/title/title.service';
import { DurationPipe } from '../pipes/duration/duration.pipe';
import { FooterComponent } from '../footer/footer.component';
import { isEqual } from 'lodash-es';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
  standalone: true,
  imports: [
    NoCasePipe,
    TitleCasePipe,
    BreadcrumbsComponent,
    RouterLink,
    SlashPipe,
    DatePipe,
    TransactionItemComponent,
    SkeletonComponent,
    EmptyComponent,
    HeaderComponent,
    DurationPipe,
    FooterComponent,
  ],
})
export class TransactionsPage {
  transactionsResponse = signal<TransactionsResponse | undefined>(undefined);
  transactions = signal<Transaction[] | any[]>([]);
  pages = signal<string[] | undefined>([]);
  count = computed(() => this.computeCount());
  pagesCount = computed(() => this.computePagesCount());
  pageSize = signal(20);
  isEmpty = computed(() => this.computeIsEmpty());
  isEnd = computed(() => this.computeIsEnd());
  index = signal<number>(0);
  type = signal<TransactionFilter | undefined>(undefined);
  filter = signal<TransactionFilterList | undefined | null>(undefined);
  filters = signal(transactionFilterList);
  queryParams = signal<Params>({});
  queryParamsHandling = signal<QueryParamsHandling>('merge');
  constructor(
    public app: AppComponent,
    private oanda: OandaService,
    private route: ActivatedRoute,
    private router: Router,
    private title: TitleService,
  ) {
    effect(() => {
      if (app.isReady()) this.getPages();
    });

    effect(() => {
      const type = this.filter() ? capitalCase(this.filter()?.key!) : '';
      this.title.setTitle(`${type} Transactions`);
    });

    route.queryParamMap.subscribe((params) => {
      // const filter = this.formatTitle(params.get('type'));

      this.type.set(params.get('type') as any);
      this.transactionsResponse.set(undefined);
    });
  }

  computeCount() {
    return this.transactionsResponse()?.count;
  }

  computePagesCount() {
    return this.transactionsResponse()?.pages.length;
  }

  computeFilter(): TransactionFilterList {
    return this.filters().filter((f) => f.key === this.type())[0];
  }

  formatTitle(type: string | null) {
    return this.filters()?.filter((f) => f.key === type)[0];
  }

  computeIsEmpty() {
    return this.transactionsResponse() && !this.pagesCount();
  }

  computeIsEnd() {
    return this.transactions().length === this.count();
  }

  setFilter(event: any) {
    const type = event.value;

    if (type === this.filter()?.key) return;

    this.transactions.set([...[]]);

    const extras: NavigationExtras = {
      queryParams: {},
      queryParamsHandling: this.queryParamsHandling(),
    };

    if (type === null && this.filter() !== null) {
      this.type.set(undefined);
      extras['queryParams']!['type'] = null;
    }

    if (type && !isEqual(type, this.filter())) {
      extras['queryParams']!['type'] = type === 'ALL' ? null : type;
      this.filter.set(type);
    }

    this.router.navigate([], extras);
  }

  async getPages() {
    const params: HttpParams = {
      pageSize: this.pageSize().toString(),
      from: this.app.account()?.createdTime!,
    };
    if (this.filter()) params['type'] = this.filter()?.key!;
    const { data, status } = await this.oanda.getTransactions(params);

    if (status === 200) {
      this.transactionsResponse.set(data);
      if (data.pages?.length) this.getTransactionsIDRange();
    }
  }

  async getTransactionsIDRange() {
    try {
      const url = this.transactionsResponse()?.pages.reverse()?.[this.index()]!;
      const { data, status } = await this.oanda.getTransactionsIDRange(url);

      if (status === 200) {
        const { transactions } = data;
        const r = transactions;
        const t = this.index() === 0 ? [...r] : [...this.transactions(), ...r];
        this.transactions?.set(t);
      } else this.index.update((index) => index - 1);
    } catch (error) {
      console.error(error);
    }
  }

  async getOlderTransactions(event?: CustomEvent) {
    this.index.update((index) => index + 1);
    await this.getTransactionsIDRange();
    // (event as InfiniteScrollCustomEvent)?.target?.complete();
  }
}
