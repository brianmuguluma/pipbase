import { Component, computed, input, signal } from '@angular/core';
import { Candlestick, Trade } from '../interfaces/oanda/oanda';
import { DecimalPipe, NgClass, PercentPipe } from '@angular/common';
import { AppComponent } from '../app.component';
import { CompactPipe } from '../pipes/compact/compact.pipe';
import { ToNumberPipe } from '../pipes/to-number/to-number.pipe';
import { DurationPipe } from '../pipes/duration/duration.pipe';

@Component({
  selector: 'app-trade-stats',
  templateUrl: './trade-stats.component.html',
  styleUrls: ['./trade-stats.component.scss'],
  standalone: true,
  imports: [
    DecimalPipe,
    NgClass,
    PercentPipe,
    CompactPipe,
    DurationPipe,
    ToNumberPipe,
  ],
})
export class TradeStatsComponent {
  trade = input.required<Trade | undefined>();
  calculatedTradeState = computed(() => this.computeCalculatedTradeState());
  candlestick = signal<Candlestick | undefined>(undefined);
  isBreakEven = computed(() => this.computeIsBreakEven());
  isOpen = computed(() => this.trade()?.state === 'OPEN');
  instrument = computed(() => this.computeInstrument());
  percentage = computed(() => this.computePercentage());
  pointSize = computed(() => this.computePointSize());
  distance = computed(() => this.computeDistance());
  value = computed(() => this.computePipValue());
  side = computed(() => this.computeSide());
  constructor(public app: AppComponent) {}

  computePercentage(): number {
    const { initialMarginRequired, state, realizedPL } = this.trade()!;
    const gain =
      state === 'OPEN'
        ? Number(this.calculatedTradeState()?.unrealizedPL)
        : Number(realizedPL);
    const margin = Number(initialMarginRequired);
    return (margin + gain - margin) / margin;
  }

  computePipValue(): number {
    const { state, realizedPL, unrealizedPL } = this.trade()!;
    const isOpen = state === 'OPEN';
    const gain = Number(isOpen ? unrealizedPL : realizedPL);
    return Math.abs(gain / Number(this.distance()));
  }

  computeIsBreakEven() {
    const { averageClosePrice, price } = this.trade()!;
    return price === this.candlestick()?.mid?.c || price === averageClosePrice;
  }

  computeDistance() {
    if (!this.instrument()) return;

    const { displayPrecision, pipLocation } = this.instrument()!;
    const { averageClosePrice, price, state } = this.trade()!;
    const close = Number(
      state === 'OPEN' ? this.candlestick()?.mid?.c : averageClosePrice,
    );

    if (this.isBreakEven()) return 0;

    return Number(
      (Number(close - Number(price)) * 10 ** Math.abs(pipLocation)).toFixed(
        displayPrecision,
      ),
    );
  }

  computePointSize() {
    if (!this.instrument()) return;

    const { pipLocation, displayPrecision } = this.instrument()!;
    return Number((10 ** pipLocation).toFixed(displayPrecision));
  }

  computeCalculatedTradeState() {
    return this.app
      .poll()
      ?.state?.trades?.find((trade) => trade.id === this.trade()?.id);
  }

  computeClosedTrade() {
    return this.app
      .poll()
      ?.changes?.tradesClosed?.find((trade) => trade.id === this.trade()?.id);
  }

  computeSide() {
    return Number(this.trade()?.initialUnits) > 0 ? 'long' : 'short';
  }

  computeInstrument() {
    return this.app
      .instruments()
      ?.filter((instrument) => instrument.name === this.trade()?.instrument)[0];
  }

  getPointSize(): number {
    const { displayPrecision, pipLocation } = this.instrument()!;
    return Number((10 ** pipLocation).toFixed(displayPrecision));
  }

  getPipValue() {
    const { initialUnits } = this.trade()!;
    return this.getPointSize()! * Number(initialUnits);
  }
}
