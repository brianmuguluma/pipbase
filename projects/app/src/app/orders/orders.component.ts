import { Component, computed, effect, signal } from '@angular/core';
import {
  InfiniteScrollCustomEvent,
  IonRouterOutlet,
  ModalController,
  RefresherEventDetail,
} from '@ionic/angular/standalone';
import { Order, OrderStateFilter } from '../interfaces/oanda';
import { OandaService } from '../services/oanda/oanda.service';
import { AppComponent } from '../app.component';
import { InstrumentsPage } from '../instruments/instruments.page';
import { OrderItemComponent } from '../order-item/order-item.component';
import { ItemSkeletonComponent } from '../item-skeleton/item-skeleton.component';
import { NgClass, TitleCasePipe } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AnalyticsService } from '../services/analytics/analytics.service';
import { HttpParams } from '@capacitor/core';
import {
  ActivatedRoute,
  Params,
  QueryParamsHandling,
  Router,
  RouterLink,
} from '@angular/router';
import { EmptyComponent } from '../empty/empty.component';
import { SlashPipe } from '../pipes/slash/slash.pipe';
import { addIcons } from 'ionicons';
import { filterCircle } from 'ionicons/icons';
import {
  IonContent,
  IonRefresher,
  IonRefresherContent,
  IonItem,
  IonLabel,
  IonChip,
  IonIcon,
  IonButton,
  IonList,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  standalone: true,
  imports: [
    OrderItemComponent,
    ItemSkeletonComponent,
    NgClass,
    TitleCasePipe,
    ScrollingModule,
    RouterLink,
    EmptyComponent,
    SlashPipe,
    IonContent,
    IonRefresher,
    IonRefresherContent,
    IonItem,
    IonLabel,
    IonChip,
    IonIcon,
    IonButton,
    IonList,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
  ],
})
export class OrdersComponent {
  orders = signal<Order[] | undefined>([]);
  orderStateFilter = signal<OrderStateFilter>('ALL');
  orderStateFilters = signal<OrderStateFilter[]>([
    'ALL',
    'PENDING',
    'FILLED',
    'TRIGGERED',
    'CANCELLED',
  ]);
  instrumentName = signal<string | undefined>(undefined);
  instrument = computed(() => this.computeInstrument());
  isEmpty = signal<boolean | undefined>(false);
  count = signal(10); // max: 500
  limit = signal(10);
  isEnd = signal<boolean | undefined>(false);
  queryParams = signal<Params>({});
  queryParamsHandling = signal<QueryParamsHandling>('merge');
  constructor(
    public app: AppComponent,
    private oanda: OandaService,
    private modalController: ModalController,
    private ionRouterOutlet: IonRouterOutlet,
    private analytics: AnalyticsService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    analytics.setCurrentScreen({ screenName: 'Orders' });
    effect(() => {
      if (app.isReady()) this.getOrders();
    });
    route.queryParamMap.subscribe((params) => {
      const instrument = params.get('instrument');
      const state = params.get('state');

      this.orderStateFilter.set(state ? (state as any) : 'ALL');
      this.instrumentName.set(instrument ? instrument : undefined);
    });
    addIcons({ filterCircle });
  }

  computeInstrument() {
    if (this.instrumentName()) {
      return this.app
        .instruments()
        ?.filter((instrument) => instrument.name === this.instrumentName())[0];
    }
    return;
  }

  selectOrderState(state: OrderStateFilter) {
    this.clearOrders();
    this.isEmpty.set(false);
    const queryParams = {
      state: state === 'ALL' ? null : state,
    };
    this.router.navigate([], {
      queryParams,
      queryParamsHandling: this.queryParamsHandling(),
    });
  }

  async refresh(event: CustomEvent<RefresherEventDetail>) {
    this.resetOrders();
    await this.getOrders();
    event.detail.complete();
  }

  clearOrders() {
    this.orders.set([]);
  }

  clearInstrument() {
    this.instrumentName.set(undefined);
    this.clearOrders();
    this.resetOrders();
    this.router.navigate([], {
      queryParams: { instrument: null },
      queryParamsHandling: this.queryParamsHandling(),
    });
  }

  resetOrders() {
    this.isEmpty?.set(false);
    this.isEnd.set(false);
  }

  async getOrders(state?: OrderStateFilter) {
    const params: HttpParams = {
      state: this.orderStateFilter(),
      count: this.count()?.toString(),
    };
    if (state) this.orderStateFilter.set(state);
    if (this.instrument()?.name)
      params['instrument'] = this.instrument()?.name!;

    const { data, status } = await this.oanda.getOrders(params);
    if (status === 200) {
      const orders: Order[] = data.orders;
      if (!orders.length) this.isEmpty?.set(true);
      this.orders?.set([...orders]);
    }
    if (!this.orders()?.length) {
      this.isEmpty?.set(true);
    }
  }

  async getNextPage(event?: CustomEvent<InfiniteScrollCustomEvent>) {
    const orders = await this.loadOrders();

    if (orders?.length) {
      this.orders?.set([...this.orders()!, ...orders]);
    }
    if (!orders?.length) {
      this.isEnd?.set(true);
    }
    (event as InfiniteScrollCustomEvent)?.target.complete();
  }

  async loadOrders() {
    const params: HttpParams = {
      beforeID: this.orders()?.[this.orders()?.length! - 1].id!,
      state: this.orderStateFilter(),
      count: this.count().toString(),
    };
    if (this.instrument()) params['instrument'] = this.instrument()?.name!;
    const { data, status } = await this.oanda.getOrders(params);
    if (status === 200) return data.orders;
  }

  async filterInstruments() {
    const modal = await this.modalController.create({
      component: InstrumentsPage,
      presentingElement: this.ionRouterOutlet.nativeEl,
    });
    await modal.present();
    const { data: instrument } = await modal.onDidDismiss();
    if (instrument) {
      this.clearOrders();
      this.resetOrders();
      let queryParams: Params = { instrument: instrument.name };
      this.queryParams.set(queryParams);
      this.router.navigate(['/tabs/exchange'], {
        queryParams,
        queryParamsHandling: this.queryParamsHandling(),
      });
    }
  }
}
