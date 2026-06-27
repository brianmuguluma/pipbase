import { Component, computed, effect, input, signal } from '@angular/core';
import { Order, OrderStateFilter, Orders } from '../interfaces/oanda/oanda';
import { OandaService } from '../services/oanda/oanda.service';
import { AppComponent } from '../app.component';
import {
  DecimalPipe,
  LowerCasePipe,
  NgClass,
  TitleCasePipe,
} from '@angular/common';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';
import { sortBy } from 'lodash-es';
import { SkeletonComponent } from '../skeleton/skeleton.component';
import { HttpParams } from '@capacitor/core';
import {
  Params,
  QueryParamsHandling,
  Router,
  RouterLink,
} from '@angular/router';
import { capitalCase } from 'change-case';
import { EmptyComponent } from '../empty/empty.component';
import { HeaderComponent } from '../header/header.component';
import { TitleService } from '../services/title/title.service';
import { SlashPipe } from '../pipes/slash/slash.pipe';
import { OrderBadgeComponent } from '../order-badge/order-badge.component';
import { DurationPipe } from '../pipes/duration/duration.pipe';
import { NoCasePipe } from '../pipes/no-case/no-case.pipe';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
  standalone: true,
  imports: [
    BreadcrumbsComponent,
    NgClass,
    TitleCasePipe,
    LowerCasePipe,
    DecimalPipe,
    SkeletonComponent,
    RouterLink,
    EmptyComponent,
    HeaderComponent,
    SlashPipe,
    OrderBadgeComponent,
    DurationPipe,
    NoCasePipe,
    FooterComponent,
  ],
})
export class OrdersPage {
  state = input<OrderStateFilter>();
  instrument = input<string>();
  tab = computed(() => this.computeTitle());
  orders = signal<Order[]>([]);
  ordersResponse = signal<Orders | undefined>(undefined);
  instrumentName = signal<string | undefined>(undefined);
  pair = computed(() => this.computeInstrument());
  instruments = computed(() => this.computeInstruments());
  orderStateFilters = signal<OrderStateFilter[]>([
    'ALL',
    'PENDING',
    'FILLED',
    // 'TRIGGERED',
    'CANCELLED',
  ]);
  isEmpty = computed(() => this.computeIsEmpty());
  count = signal(10); // max: 500
  isEnd = signal<boolean | undefined>(false);
  queryParams = signal<Params>({});
  queryParamsHandling = signal<QueryParamsHandling>('merge');
  constructor(
    public app: AppComponent,
    private oanda: OandaService,
    private title: TitleService,
    private router: Router,
  ) {
    effect(
      () => {
        if (app.isReady()) this.getOrders();
      },
      { allowSignalWrites: true },
    );
    effect(() => this.title.setTitle(this.tab()));
  }

  computeTitle() {
    const state =
      this.state() && this.state() !== 'ALL' ? capitalCase(this.state()!) : '';

    return this.pair()
      ? `${state} ${this.pair()?.displayName} Orders`
      : `${state} Orders`;
  }

  computeIsEmpty() {
    return this.ordersResponse() && !this.ordersResponse()?.orders.length;
  }

  computeInstruments() {
    return sortBy(
      this.app.instruments(),
      (instrument) => instrument.displayName,
    );
  }

  computeInstrument() {
    if (this.instrumentName()) {
      return this.instruments()?.filter(
        (instrument) => instrument.name === this.instrumentName(),
      )[0];
    }
    return;
  }

  setInstrument(event: any) {
    this.isEnd.set(false);
    let queryParams: Params = {};
    if (event.value === 'undefined') queryParams['instrument'] = null;
    else queryParams['instrument'] = event.value;
    this.queryParams.set(queryParams);
    this.router.navigate(['/orders'], {
      queryParams,
      queryParamsHandling: this.queryParamsHandling(),
    });
  }

  selectOrderState(event: any) {
    const state = event.value;
    if (state === this.state()) return;
    const queryParams = {
      state: state === 'ALL' ? null : state,
    };
    this.router.navigate([], {
      queryParams,
      queryParamsHandling: this.queryParamsHandling(),
    });
  }

  async getOrders() {
    this.orders.set([]);
    const state = this.state()! ?? 'ALL';

    const params: HttpParams = {
      state,
      count: this.count().toString(),
    };
    if (this.instrument()) params['instrument'] = this.instrument()!;

    const { data, status } = await this.oanda.getOrders(params);
    this.isEnd.set(false);

    if (status !== 200 || !data.orders.length) return;

    this.ordersResponse.set(data);
    const orders: Order[] = data.orders;
    this.orders.set([...orders]);

    if (orders.length < this.count()) this.isEnd.set(true);
  }

  async getNextPage() {
    const orders = await this.loadOrders();
    if (orders?.length) this.orders?.set([...this.orders()!, ...orders]);
    if (!orders?.length) this.isEnd?.set(true);
  }

  async loadOrders() {
    const state = this.state()! ?? 'ALL';

    const params: HttpParams = {
      state,
      count: this.count().toString(),
      beforeID: this.orders()?.[this.orders()?.length! - 1].id!,
    };
    if (this.instrument()) params['instrument'] = this.instrument()!;

    const { data, status } = await this.oanda.getOrders(params);
    if (status === 200) return data.orders;
  }
}
