import { NgClass, TitleCasePipe } from '@angular/common';
import { Component, computed, effect, signal } from '@angular/core';
import {
  ModalController,
  IonRouterOutlet,
  RefresherEventDetail,
  InfiniteScrollCustomEvent,
  IonFab,
} from '@ionic/angular/standalone';
import { TradeItemComponent } from '../trade-item/trade-item.component';
import { ItemSkeletonComponent } from '../item-skeleton/item-skeleton.component';
import { Trade, TradeStateFilter } from '../interfaces/oanda';
import { AppComponent } from '../app.component';
import { OandaService } from '../services/oanda/oanda.service';
import { InstrumentsPage } from '../instruments/instruments.page';
import { SlashPipe } from '../pipes/slash/slash.pipe';
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
  IonText,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonFabButton,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-trades',
  templateUrl: './trades.component.html',
  styleUrls: ['./trades.component.scss'],
  standalone: true,
  imports: [
    IonFab,
    TradeItemComponent,
    ItemSkeletonComponent,
    NgClass,
    TitleCasePipe,
    SlashPipe,
    ScrollingModule,
    RouterLink,
    EmptyComponent,
    IonContent,
    IonRefresher,
    IonRefresherContent,
    IonItem,
    IonLabel,
    IonChip,
    IonIcon,
    IonButton,
    IonList,
    IonText,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
  ],
})
export class TradesComponent {
  trades = signal<Trade[] | undefined>(undefined);
  tradeStateFilter = signal<TradeStateFilter>('ALL');
  tradeStateFilters = signal<TradeStateFilter[]>(['ALL', 'OPEN', 'CLOSED']);
  instrument = computed(() => this.computeInstrument());
  instrumentName = signal<string | undefined>(undefined);
  isEmpty = signal<boolean | undefined>(false);
  count = signal(20); // max: 500
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
    analytics.setCurrentScreen({ screenName: 'Trades' });
    effect(() => {
      if (app.isReady()) this.getTrades();
    });

    route.queryParamMap.subscribe((params) => {
      const instrument = params.get('instrument');
      const state = params.get('state');

      this.tradeStateFilter.set(state ? (state as any) : 'ALL');
      this.instrumentName.set(instrument ? instrument : undefined);
    });
    addIcons({ filterCircle });
  }

  computeInstrument() {
    if (this.instrumentName()) {
      return this.app
        ?.instruments()
        ?.filter((i) => i.name === this.instrumentName())[0];
    }
    return;
  }

  trackTrades(index: number, trade: Trade) {
    return trade.id;
  }

  selectTradeState(state: TradeStateFilter) {
    this.trades.set([]);
    this.resetTrades();
    const queryParams = {
      state: state === 'ALL' ? null : state,
    };
    this.router.navigate([], {
      queryParams,
      queryParamsHandling: this.queryParamsHandling(),
    });
  }

  async getTrades() {
    const params: HttpParams = {
      state: this.tradeStateFilter(),
      count: this.count().toString(),
    };
    if (this.instrument()) params['instrument'] = this.instrument()?.name!;

    const { data, status } = await this.oanda.getTrades(params);
    if (status === 200) {
      const trades: Trade[] = data.trades;
      if (!trades.length) this.isEmpty?.set(true);
      this.trades?.set([...trades]);
    }
    if (!this.trades()?.length) this.isEmpty?.set(true);
  }

  async getNextPage(event: CustomEvent<InfiniteScrollCustomEvent>) {
    const trades = await this.loadTrades();
    if (trades?.length) {
      this.trades?.set([...this.trades()!, ...trades]);
    }
    if (!trades?.length) this.isEnd?.set(true);
    (event as InfiniteScrollCustomEvent).target.complete();
  }

  async refresh(event: CustomEvent<RefresherEventDetail>) {
    this.resetTrades();
    await this.getTrades();
    event.detail?.complete();
  }

  async loadTrades() {
    const params: HttpParams = {
      beforeID: this.trades()?.[this.trades()?.length! - 1].id!,
      state: this.tradeStateFilter(),
      count: this.count().toString(),
    };
    if (this.instrument()) params['instrument'] = this.instrument()?.name!;
    const { data, status } = await this.oanda.getTrades(params);

    if (status === 200) return data.trades;
  }

  clearTrades() {
    this.trades.set([]);
  }

  clearInstrument() {
    this.instrumentName.set(undefined);
    this.clearTrades();
    this.resetTrades();
    this.router.navigate([], {
      queryParams: { instrument: null },
      queryParamsHandling: this.queryParamsHandling(),
    });
  }

  async filterInstruments() {
    const modal = await this.modalController.create({
      component: InstrumentsPage,
      presentingElement: this.ionRouterOutlet.nativeEl,
    });
    await modal.present();
    const { data: instrument } = await modal.onDidDismiss();
    if (instrument) {
      this.resetTrades();
      this.clearTrades();
      let queryParams: Params = { instrument: instrument.name };
      this.queryParams.set(queryParams);
      this.router.navigate(['/tabs/exchange'], {
        queryParams,
        queryParamsHandling: this.queryParamsHandling(),
      });
    }
  }

  resetTrades() {
    this.isEmpty?.set(false);
    this.isEnd.set(false);
  }
}
