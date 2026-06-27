import { Component, computed, effect, signal } from '@angular/core';
import {
  Transaction,
  TransactionFilter,
  TransactionFilterList,
  TransactionsResponse,
  transactionFilterList,
} from '../interfaces/oanda';
import { OandaService } from '../services/oanda/oanda.service';
import { isEqual } from 'lodash-es';
import { AppComponent } from '../app.component';
import { HttpParams } from '@capacitor/core';
import { NgClass, TitleCasePipe } from '@angular/common';
import { ItemSkeletonComponent } from '../item-skeleton/item-skeleton.component';
import { TransactionItemComponent } from '../transaction-item/transaction-item.component';
import { NoCasePipe } from '../pipes/no-case/no-case.pipe';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AnalyticsService } from '../services/analytics/analytics.service';
import {
  ActivatedRoute,
  NavigationExtras,
  QueryParamsHandling,
  Router,
} from '@angular/router';
import { EmptyComponent } from '../empty/empty.component';
import { addIcons } from 'ionicons';
import { filterCircle } from 'ionicons/icons';
import {
  InfiniteScrollCustomEvent,
  RefresherEventDetail,
  IonContent,
  IonRefresher,
  IonRefresherContent,
  IonItem,
  IonLabel,
  IonText,
  IonButton,
  IonIcon,
  IonList,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonChip,
  IonModal,
  IonButtons,
  IonToolbar,
  IonPicker,
  IonPickerColumnOption,
  IonPickerColumn,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
  standalone: true,
  imports: [
    IonPicker,
    IonToolbar,
    IonButtons,
    IonModal,
    ItemSkeletonComponent,
    TransactionItemComponent,
    NoCasePipe,
    TitleCasePipe,
    ScrollingModule,
    EmptyComponent,
    NgClass,
    IonContent,
    IonRefresher,
    IonRefresherContent,
    IonItem,
    IonLabel,
    IonText,
    IonButton,
    IonIcon,
    IonList,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonChip,
    IonPickerColumnOption,
    IonPickerColumn,
  ],
})
export class TransactionsComponent {
  transactionsResponse = signal<TransactionsResponse | undefined>(undefined);
  transactions = signal<Transaction[] | any[]>([]);
  pages = signal<string[] | undefined>([]);
  count = computed(() => this.computeCount());
  pagesCount = computed(() => this.computePagesCount());
  pageSize = signal(10);
  isEmpty = computed(() => this.computeIsEmpty());
  isEnd = computed(() => this.computeIsEnd());
  index = signal<number>(0);
  type = signal<TransactionFilter | undefined>(undefined);
  filter = signal<TransactionFilterList | undefined | null>(undefined);
  filters = signal(transactionFilterList);
  queryParamsHandling = signal<QueryParamsHandling>('merge');
  constructor(
    public app: AppComponent,
    private oanda: OandaService,
    private analytics: AnalyticsService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    analytics.setCurrentScreen({ screenName: 'Transactions' });
    effect(() => {
      // if (app.isReady()) this.getPages();
    });
    route.queryParamMap.subscribe((params) => {
      this.index.set(0);
      const type = params.get('type');

      this.type.set(type ? (type as any) : 'ALL');
      const filter = this.filters()?.filter((filter) => filter.key === type)[0];
      this.filter.set(filter as any);
    });
    addIcons({ filterCircle });
  }

  computeCount() {
    return this.transactionsResponse()?.count;
  }

  computePagesCount() {
    return this.transactionsResponse()?.pages.length;
  }

  async refresh(event?: CustomEvent<RefresherEventDetail>) {
    this.index.set(0);
    await this.getPages();
    event?.detail.complete();
  }

  trackTransactions(index: number, transaction: Transaction) {
    return transaction.id;
  }

  async getPages() {
    const params: HttpParams = {
      pageSize: this.pageSize().toString(),
      from: this.app.account()?.createdTime!,
    };

    console.log(this.filter());

    if (this.filter()) params['type'] = this.filter()?.key!;
    const { data, status } = await this.oanda.getTransactions(params);

    console.log(status);

    if (status !== 200) return;

    this.transactionsResponse.set(data);
    this.getTransactionsIDRange();
  }

  async getTransactionsIDRange() {
    try {
      const url =
        this.transactionsResponse()?.pages[
          this.pagesCount()! - (this.index() + 1)
        ]!;

      const { data, status } = await this.oanda.getTransactionsIDRange(url);

      if (status === 200) {
        const { transactions } = data;
        const r = transactions?.reverse();
        const t =
          this.index() === this.pagesCount()
            ? [...r]
            : [...this.transactions()!, ...r];
        this.transactions?.set(t);
        if (this.transactions()?.length! <= this.pageSize())
          this.getOlderTransactions();
      } else this.index.update((index) => index - 1);
    } catch (error) {
      console.error(error);
    }
  }

  async getOlderTransactions(event?: CustomEvent<InfiniteScrollCustomEvent>) {
    this.index.update((index) => index + 1);
    await this.getTransactionsIDRange();
    (event as InfiniteScrollCustomEvent)?.target?.complete();
  }

  computeIsEmpty() {
    return this.transactionsResponse() && !this.pagesCount();
  }

  computeIsEnd() {
    return this.transactions().length === this.count();
  }

  onIonChange(event: CustomEvent) {
    console.log(event.detail);

    this.filter.set(event.detail.value);
  }

  async onDidDismiss(event: CustomEvent) {
    const { data } = event.detail;

    if (!data) return;

    const filter: TransactionFilterList = data;

    // this.filter.set(filter);

    console.log(filter);

    this.transactions.set([...[]]);

    const extras: NavigationExtras = {
      queryParams: {},
      queryParamsHandling: this.queryParamsHandling(),
    };

    if (data === null && this.filter() !== null) {
      this.type.set(undefined);
      extras['queryParams']!['type'] = null;
    }

    if (data && !isEqual(data, this.filter())) {
      extras['queryParams']!['type'] = data?.key === 'ALL' ? null : data?.key;
      this.filter.set(data);
    }

    // this.router.navigate([], extras);
  }
}
