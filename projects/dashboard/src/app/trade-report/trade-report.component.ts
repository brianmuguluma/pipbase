import { Component, computed, input } from '@angular/core';
import { Trade } from '../interfaces/oanda/oanda';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, DecimalPipe, PercentPipe } from '@angular/common';
import { SlashPipe } from '../pipes/slash/slash.pipe';
import { AppComponent } from '../app.component';
import { CompactPipe } from '../pipes/compact/compact.pipe';
import { DurationPipe } from '../pipes/duration/duration.pipe';

@Component({
  selector: 'app-trade-report',
  templateUrl: './trade-report.component.html',
  styleUrls: ['./trade-report.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    CurrencyPipe,
    SlashPipe,
    CompactPipe,
    DecimalPipe,
    DurationPipe,
    PercentPipe,
  ],
})
export class TradeReportComponent {
  trade = input.required<Trade>();
  instrument = computed(() => this.getInstrument());
  percentage = computed(() => this.computePercentage());
  pointSize = computed(() => this.computePointSize());
  distance = computed(() => this.computeDistance());
  value = computed(() => this.computePipValue());
  side = computed(() => this.computeSide());
  constructor(public app: AppComponent) {}

  getInstrument() {
    return this.app
      .instruments()
      ?.filter((instrument) => instrument.name === this.trade().instrument)[0];
  }

  formatPips(pips: number): number {
    return Number(pips) * 10 ** this.instrument()?.pipLocation!;
  }

  computeDistance() {
    if (this.instrument()) {
      const { displayPrecision, pipLocation } = this.instrument()!;
      const { averageClosePrice, price } = this.trade();
      const close = Number(averageClosePrice);
      return Number(
        (Number(close - Number(price)) * 10 ** Math.abs(pipLocation)).toFixed(
          displayPrecision,
        ),
      );
    }
    return;
  }

  computePointSize() {
    if (this.instrument()) {
      const { pipLocation, displayPrecision } = this.instrument()!;
      return Number((10 ** pipLocation).toFixed(displayPrecision));
    }
    return;
  }

  computeClosedTrade() {
    return this.app
      .poll()
      ?.changes?.tradesClosed?.find((trade) => trade.id === this.trade().id);
  }

  computeSide() {
    return Number(this.trade().initialUnits) > 0 ? 'long' : 'short';
  }

  computePercentage(): number {
    const { initialMarginRequired, realizedPL } = this.trade();
    const gain = Number(realizedPL);
    const margin = Number(initialMarginRequired);
    return (margin + gain - margin) / margin;
  }

  computePipValue(): number {
    const { state, realizedPL, unrealizedPL } = this.trade();
    const isOpen = state === 'OPEN';
    const gain = Number(isOpen ? unrealizedPL : realizedPL);
    return Math.abs(gain / Number(this.distance()));
  }
}
