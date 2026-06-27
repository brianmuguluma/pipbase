import {
  Component,
  OnDestroy,
  OnInit,
  computed,
  input,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { TradeBadgeComponent } from '../trade-badge/trade-badge.component';
import {
  Candlestick,
  CandlestickGranularity,
  Trade,
} from '../interfaces/oanda/oanda';
import {
  CandlestickData,
  ColorType,
  IChartApi,
  ISeriesApi,
  UTCTimestamp,
  createChart,
} from 'lightweight-charts';
import { PreferencesService } from '../services/preferences/preferences.service';
import { OandaService } from '../services/oanda/oanda.service';
import { HttpParams } from '@capacitor/core';
import { getUnixTime } from 'date-fns';
import { NgStyle } from '@angular/common';
import { SpinnerComponent } from '../spinner/spinner.component';
import Cron from 'croner';

const {
  FIVE_SECONDS,
  TEN_SECONDS,
  FIFTEEN_SECONDS,
  THIRTY_SECONDS,
  ONE_MINUTE,
  TWO_MINUTES,
  FOUR_MINUTES,
  FIVE_MINUTES,
  TEN_MINUTES,
  FIFTEEN_MINUTES,
  THIRTY_MINUTES,
  ONE_HOUR,
  TWO_HOURS,
  THREE_HOURS,
  FOUR_HOURS,
  SIX_HOURS,
  EIGHT_HOURS,
  TWELVE_HOURS,
  ONE_DAY,
  ONE_WEEK,
  ONE_MONTH,
} = CandlestickGranularity;

@Component({
  selector: 'app-snapshot',
  templateUrl: './snapshot.component.html',
  styleUrls: ['./snapshot.component.scss'],
  standalone: true,
  imports: [RouterLink, NgStyle, TradeBadgeComponent, SpinnerComponent],
})
export class SnapshotComponent implements OnInit, OnDestroy {
  trade = input.required<Trade>();
  tradingViewID = signal(crypto.randomUUID());
  candlestick = signal<Candlestick | undefined>(undefined);
  candles = signal<Candlestick[]>([]);
  candlestickData = signal<CandlestickData[]>([]);
  isEmpty = signal<boolean>(false);
  status = signal<number | undefined>(undefined);
  interval = signal<CandlestickGranularity | undefined>(undefined);
  chart = signal<IChartApi | undefined>(undefined);
  chartSeries = signal<ISeriesApi<'Candlestick'> | undefined>(undefined);
  candlestickLimit = signal(40);
  candleStatus = signal(200);
  isOpen = computed(() => this.trade()?.state === 'OPEN');
  count = signal(5000);
  intervals = signal<CandlestickGranularity[]>([
    FIVE_SECONDS,
    TEN_SECONDS,
    FIFTEEN_SECONDS,
    THIRTY_SECONDS,
    ONE_MINUTE,
    TWO_MINUTES,
    FOUR_MINUTES,
    FIVE_MINUTES,
    TEN_MINUTES,
    FIFTEEN_MINUTES,
    THIRTY_MINUTES,
    ONE_HOUR,
    TWO_HOURS,
    THREE_HOURS,
    FOUR_HOURS,
    SIX_HOURS,
    EIGHT_HOURS,
    TWELVE_HOURS,
    ONE_DAY,
    ONE_WEEK,
    ONE_MONTH,
  ]);
  private cron = signal<Cron>(Cron('* * * * * *', () => this.startCron()));
  constructor(
    private preferences: PreferencesService,
    private oanda: OandaService,
  ) {}

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

  updateInterval(interval: CandlestickGranularity | any) {
    this.candleStatus.set(200);
    this.clearChart();
    this.interval.set(interval.value);
    this.setGranularity(interval.value);
    this.resetCandlestickChartData();
    this.getInstrumentCandles();
  }

  async setGranularity(interval: CandlestickGranularity) {
    await this.preferences.setValue({
      key: 'granularity',
      value: interval,
    });
  }

  clearChart() {
    if (this.chart) {
      this.chart()?.remove();
    }
    this.chart.set(undefined);
  }

  resetCandlestickChartData() {
    if (this.chart()) {
      this.chartSeries()?.setData([]);
    }
  }

  async getInstrumentCandles() {
    const { instrument, openTime: from, closeTime: to } = this.trade();
    let candles: Candlestick[] = [];
    this.isEmpty.set(false);
    this.candles.set([]);
    let params: HttpParams = {
      granularity: this.interval()!,
      from,
    };

    if (to) params['to'] = to;
    else params['count'] = this.count().toString();

    const { data, status } = await this.oanda.getCandlesticks(
      instrument,
      params,
    );
    this.candleStatus.set(status);

    if (status === 200) candles = data.candles;
    if (candles?.length) {
      this.candles.set(candles);
      this.createCandlestickChart(candles);
    } else this.isEmpty.set(true);
  }

  createChart(): IChartApi {
    return createChart(document?.getElementById(this.tradingViewID())!, {
      grid: {
        vertLines: { visible: false },
        horzLines: { visible: false },
      },
      rightPriceScale: { visible: false },
      layout: { background: { type: ColorType.Solid, color: 'rgba(0,0,0,0)' } },
      timeScale: { visible: false },
      crosshair: {
        vertLine: { visible: false },
        horzLine: { visible: false },
      },
    });
  }

  addCandlestickSeries(): ISeriesApi<'Candlestick'> {
    return this.chart()?.addCandlestickSeries({ priceLineVisible: false })!;
  }

  createCandlestickChart(candles: Candlestick[]) {
    this.clearChart();
    if (!this.chart()) {
      this.chart?.set(this.createChart());
      this.chartSeries?.set(this.addCandlestickSeries());
    }
    this.candlestickData.set(this.mapCandleStickData(candles));

    this.setCandlestickChartData();

    if (candles.length < this.candlestickLimit()) {
      this.chart()?.timeScale().fitContent();
    }
  }

  mapCandleStickData(candles: Candlestick[]): CandlestickData[] {
    return candles.map((candle: Candlestick) => ({
      time: getUnixTime(new Date(candle.time)) as UTCTimestamp,
      close: Number(candle.mid.c),
      open: Number(candle.mid.o),
      high: Number(candle.mid.h),
      low: Number(candle.mid.l),
    }));
  }

  setCandlestickChartData() {
    this.chartSeries()?.setData(this.candlestickData());
  }

  updateCandleStickChart(candlestick: Candlestick) {
    const {
      mid: { o, h, l, c },
      time,
    } = candlestick;
    this.chartSeries()?.update({
      time: getUnixTime(new Date(time)) as UTCTimestamp,
      close: Number(c),
      open: Number(o),
      high: Number(h),
      low: Number(l),
    });
  }

  async startCron() {
    const { instrument } = this.trade();

    if (!this.isOpen()) return;

    const params: HttpParams = {
      granularity: this.interval()!,
      count: '1',
    };
    const {
      data: { candles },
    } = await this.oanda.getCandlesticks(instrument, params);
    const candlestick = candles[0];
    this.candlestick.set(candlestick);
    this.candles().push(candlestick);
    this.updateCandleStickChart(candlestick);
  }

  stopCron() {
    this.cron()?.stop();
  }

  ngOnDestroy(): void {
    this.stopCron();
  }
}
