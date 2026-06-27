import {
  Component,
  OnInit,
  computed,
  effect,
  input,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  Candlestick,
  CandlestickGranularity,
  OandaError,
  Trade,
} from '../interfaces/oanda/oanda';
import { OandaService } from '../services/oanda/oanda.service';
import { AppComponent } from '../app.component';
import { SlashPipe } from '../pipes/slash/slash.pipe';
import { SpinnerComponent } from '../spinner/spinner.component';
import {
  CurrencyPipe,
  DatePipe,
  DecimalPipe,
  NgClass,
  NgStyle,
  PercentPipe,
  SlicePipe,
  TitleCasePipe,
} from '@angular/common';
import { CompactPipe } from '../pipes/compact/compact.pipe';
import { ToNumberPipe } from '../pipes/to-number/to-number.pipe';
import { DurationPipe } from '../pipes/duration/duration.pipe';
import { PipsPipe } from '../pipes/pips/pips.pipe';
import { FormatPipsPipe } from '../pipes/formatPips/format-pips.pipe';
import { AbsolutePipe } from '../pipes/absolute/absolute.pipe';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';
import { NoCasePipe } from '../pipes/no-case/no-case.pipe';
import { TradeBadgeComponent } from '../trade-badge/trade-badge.component';
import { OrderBadgeComponent } from '../order-badge/order-badge.component';
import { TooltipComponent } from '../tooltip/tooltip.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { TitleService } from '../services/title/title.service';
import { FooterComponent } from '../footer/footer.component';
import { SnapshotComponent } from '../snapshot/snapshot.component';
import { TradeDependantsComponent } from '../trade-dependants/trade-dependants.component';
import { TradeDetailsComponent } from '../trade-details/trade-details.component';
import { TradeStatsComponent } from '../trade-stats/trade-stats.component';
import { HttpParams } from '@capacitor/core';
import { CandlestickData } from 'lightweight-charts';
import { PreferencesService } from '../services/preferences/preferences.service';
import Cron from 'croner';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.page.html',
  styleUrls: ['./trade.page.scss'],
  standalone: true,
  imports: [
    SpinnerComponent,
    CurrencyPipe,
    SlashPipe,
    SlicePipe,
    NgClass,
    NgStyle,
    CompactPipe,
    ToNumberPipe,
    DurationPipe,
    RouterLink,
    DatePipe,
    PipsPipe,
    FormatPipsPipe,
    PercentPipe,
    TitleCasePipe,
    AbsolutePipe,
    DecimalPipe,
    BreadcrumbsComponent,
    SpinnerComponent,
    NoCasePipe,
    TradeBadgeComponent,
    OrderBadgeComponent,
    TooltipComponent,
    PageNotFoundComponent,
    FooterComponent,
    SnapshotComponent,
    TradeDependantsComponent,
    TradeDetailsComponent,
    TradeStatsComponent,
  ],
})
export class TradePage implements OnInit {
  id = input<string>();
  trade = signal<Trade | undefined>(undefined);
  closedTrade = computed(() => this.computeClosedTrade());
  calculatedTradeState = computed(() => this.computeCalculatedTradeState());
  candlestick = signal<Candlestick | undefined>(undefined);
  candles = signal<Candlestick[]>([]);
  candlestickData = signal<CandlestickData[]>([]);
  instrument = computed(() => this.computeInstrument());
  isEmpty = signal<boolean>(false);
  error = signal<OandaError | undefined>(undefined);
  status = signal<number | undefined>(undefined);
  isOpen = computed(() => this.trade()?.state === 'OPEN');
  dependants = computed(() => this.computeDependants());
  interval = signal<CandlestickGranularity | undefined>(undefined);
  cron = signal<Cron>(Cron('* * * * * *', () => this.startCron()));
  constructor(
    public app: AppComponent,
    private oanda: OandaService,
    private title: TitleService,
    private preferences: PreferencesService,
  ) {
    effect(() => {
      if (app.isReady()) this.getTrade();
    });
  }

  async ngOnInit() {
    await this.getInterval();
    await this.getInstrumentCandles();
  }

  async getInterval() {
    const { value } = await this.getGranularity();
    this.interval.set(
      value
        ? (value as CandlestickGranularity)
        : CandlestickGranularity.ONE_MINUTE,
    );
  }

  async getGranularity() {
    return await this.preferences.getValue({ key: 'granularity' });
  }

  formatPips(pips: number): number {
    return Number(pips) * 10 ** this.instrument()?.pipLocation!;
  }

  computeDependants() {
    return (
      this.trade()?.stopLossOrder ||
      this.trade()?.trailingStopLossOrder ||
      this.trade()?.takeProfitOrder
    );
  }

  computeCalculatedTradeState() {
    return this.app
      .poll()
      ?.state?.trades?.find((trade) => trade.id === this.id());
  }

  computeClosedTrade() {
    return this.app
      .poll()
      ?.changes?.tradesClosed?.find((trade) => trade.id === this.id());
  }

  computeInstrument() {
    return this.app
      .instruments()
      ?.filter((instrument) => instrument.name === this.trade()?.instrument)[0];
  }

  async refresh() {
    await this.getTrade();
  }

  async getTrade() {
    if (!this.app.account()?.id) return;
    const { data, status } = await this.oanda.getTrade(this.id()!);

    this.status.set(status);

    if (status !== 200) this.error.set(data);

    if (status === 200) {
      this.title.setTitle(`Trade ${this.id()}`);
      this.trade?.set(data.trade as Trade);
    }
  }

  async closeTrade() {
    await this.oanda.closeTrade(this.trade()?.id!, 'ALL');
    this.refresh();
  }

  async startCron() {
    const { instrument } = this.trade()!;
    if (this.trade()?.state !== 'OPEN') return;

    const params: HttpParams = {
      granularity: 'M1',
      count: '1',
    };
    const {
      data: { candles },
    } = await this.oanda.getCandlesticks(instrument, params);
    const candlestick = candles[0];
    this.candlestick.set(candlestick);
    this.candles().push(candlestick);
  }

  async getInstrumentCandles() {
    if (!this.trade()) return;

    const { instrument, openTime: from, closeTime: to } = this.trade()!;
    let candles: Candlestick[] = [];
    this.isEmpty.set(false);
    this.candles.set([]);
    let params: HttpParams = {
      granularity: this.interval()!,
      from,
    };
    if (to) params['to'] = to;
    else params['count'] = '5000';
    const { data, status } = await this.oanda.getCandlesticks(
      instrument,
      params,
    );
    // this.candleStatus.set(status);
    if (status === 200) candles = data.candles;
    if (candles?.length) {
      this.candles.set(candles);
    } else this.isEmpty.set(true);
  }
}
