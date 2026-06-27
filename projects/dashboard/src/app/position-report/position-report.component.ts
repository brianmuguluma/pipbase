import { Component, computed, input } from '@angular/core';
import { Trade } from '../interfaces/oanda/oanda';
import { CurrencyPipe } from '@angular/common';
import { AppComponent } from '../app.component';
import { SlashPipe } from '../pipes/slash/slash.pipe';

@Component({
  selector: 'app-position-report',
  templateUrl: './position-report.component.html',
  styleUrls: ['./position-report.component.scss'],
  standalone: true,
  imports: [CurrencyPipe, SlashPipe],
})
export class PositionReportComponent {
  name = input.required<string>();
  tradeInputs = input.required<Trade[]>();

  instrument = computed(() => this.computeInstrument());
  trades = computed(() => this.computeTrades());
  realized = computed(() => this.computeRealized());
  max = computed(() => this.computeMax());
  min = computed(() => this.computeMin());
  average = computed(() => this.computeAverage());
  constructor(public app: AppComponent) {}

  computeTrades() {
    return this.tradeInputs()?.filter((t) => t.instrument === this.name());
  }

  computeRealized() {
    return this.trades()
      ?.map((t) => Number(t.realizedPL)!)
      ?.reduce((r, a) => r + a, 0);
  }

  computeAverage() {
    return this.realized()! / this.trades()?.length!;
  }

  computeInstrument() {
    return this.app.instruments()?.filter((i) => i.name == this.name())[0];
  }

  computeMax() {
    return Math.max(...this.trades()?.map((t) => Number(t.realizedPL))!);
  }

  computeMin() {
    return Math.min(...this.trades()?.map((t) => Number(t.realizedPL))!);
  }
}
