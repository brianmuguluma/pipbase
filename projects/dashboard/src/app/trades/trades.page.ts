import {
  CurrencyPipe,
  DatePipe,
  DecimalPipe,
  LowerCasePipe,
  NgClass,
  SlicePipe,
  TitleCasePipe,
} from '@angular/common';
import { Component, computed, effect, input, signal } from '@angular/core';
import { Trade, TradeStateFilter, Trades } from '../interfaces/oanda/oanda';
import { AppComponent } from '../app.component';
import { OandaService } from '../services/oanda/oanda.service';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';
import { sortBy } from 'lodash-es';
import {
  Params,
  QueryParamsHandling,
  Router,
  RouterLink,
} from '@angular/router';
import { HttpParams } from '@capacitor/core';
import { capitalCase } from 'change-case';
import { EmptyComponent } from '../empty/empty.component';
import { HeaderComponent } from '../header/header.component';
import { TitleService } from '../services/title/title.service';
import { SlashPipe } from '../pipes/slash/slash.pipe';
import { TradeBadgeComponent } from '../trade-badge/trade-badge.component';
import { DurationPipe } from '../pipes/duration/duration.pipe';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-trades',
  templateUrl: './trades.page.html',
  styleUrls: ['./trades.page.scss'],
  standalone: true,
  imports: [
    NgClass,
    TitleCasePipe,
    LowerCasePipe,
    BreadcrumbsComponent,
    RouterLink,
    EmptyComponent,
    HeaderComponent,
    SlashPipe,
    TradeBadgeComponent,
    CurrencyPipe,
    DurationPipe,
    DecimalPipe,
    DatePipe,
    FooterComponent,
    SlicePipe,
  ],
})
export class TradesPage {
  state = input<TradeStateFilter>();
  instrument = input<string>();
  tab = computed(() => this.computeTitle());
  trades = signal<Trade[]>([]);
  tradesResponse = signal<Trades | undefined>(undefined);
  pair = computed(() => this.computeInstrument());
  instruments = computed(() => this.computeInstruments());
  tradeStateFilters = signal<TradeStateFilter[]>(['ALL', 'OPEN', 'CLOSED']);
  isEmpty = computed(() => this.computeIsEmpty());
  count = signal(20); // max: 500
  isEnd = signal<boolean | undefined>(false);
  queryParams = signal<Params>({});
  queryParamsHandling = signal<QueryParamsHandling>('merge');

  // Pagination
  currentPage = signal(0);
  constructor(
    public app: AppComponent,
    private oanda: OandaService,
    private title: TitleService,
    private router: Router,
  ) {
    effect(
      () => {
        if (app.isReady()) this.getTrades();
      },
      { allowSignalWrites: true },
    );
    effect(() => this.title.setTitle(this.tab()));
  }

  computeTitle() {
    const state =
      this.state() && this.state() !== 'ALL' ? capitalCase(this.state()!) : '';

    return this.pair()
      ? `${state} ${this.pair()?.displayName} Trades`
      : `${state} Trades`;
  }

  computeIsEmpty() {
    return this.tradesResponse() && !this.tradesResponse()?.trades?.length;
  }

  computeInstrument() {
    if (!this.instrument()) return;

    return this.instruments()?.filter((i) => i.name === this.instrument())[0];
  }

  computeInstruments() {
    return sortBy(this.app.instruments(), (i) => i.displayName);
  }

  selectTradeState(event: any) {
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

  setInstrument(event: any) {
    let queryParams: Params = {};
    if (event.value === 'undefined') queryParams['instrument'] = null;
    else queryParams['instrument'] = event.value;
    this.queryParams.set(queryParams);
    this.router.navigate([], {
      queryParams,
      queryParamsHandling: this.queryParamsHandling(),
    });
  }

  async getTrades() {
    this.trades.set([]);
    const state = this.state()! ?? 'ALL';

    const params: HttpParams = {
      state,
      count: this.count().toString(),
    };
    if (this.instrument()) params['instrument'] = this.instrument()!;

    const { data, status } = await this.oanda.getTrades(params);

    this.isEnd.set(false);
    if (status === 200 && data.trades?.length) {
      this.tradesResponse.set(data);
      const trades: Trade[] = data.trades;
      this.trades.set([...trades]);
    }
  }

  async getNextPage() {
    const trades = await this.loadTrades();

    if (trades?.length) this.trades?.set([...this.trades()!, ...trades]);
    if (!trades?.length) this.isEnd?.set(true);
  }

  async loadTrades() {
    const state = this.state()! ?? 'ALL';

    const params: HttpParams = {
      state,
      count: this.count().toString(),
      beforeID: this.trades()?.[this.trades()?.length! - 1].id!,
    };
    if (this.instrument()) params['instrument'] = this.instrument()!;

    const { data, status } = await this.oanda.getTrades(params);
    if (status === 200) return data.trades;
  }
}
