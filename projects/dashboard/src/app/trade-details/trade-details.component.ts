import { Component, computed, input, signal } from '@angular/core';
import { glossary } from '../glossary';
import { TooltipComponent } from '../tooltip/tooltip.component';
import { Trade } from '../interfaces/oanda/oanda';
import { SlashPipe } from '../pipes/slash/slash.pipe';
import {
  CurrencyPipe,
  DatePipe,
  DecimalPipe,
  TitleCasePipe,
} from '@angular/common';
import { AppComponent } from '../app.component';
import { NoCasePipe } from '../pipes/no-case/no-case.pipe';

@Component({
  selector: 'app-trade-details',
  templateUrl: './trade-details.component.html',
  styleUrls: ['./trade-details.component.scss'],
  standalone: true,
  imports: [
    CurrencyPipe,
    DatePipe,
    DecimalPipe,
    SlashPipe,
    TitleCasePipe,
    NoCasePipe,
    TooltipComponent,
  ],
})
export class TradeDetailsComponent {
  trade = input.required<Trade>();
  calculatedTradeState = computed(() => this.computeCalculatedTradeState());
  instrument = computed(() => this.computeInstrument());
  glossary = signal(glossary);

  constructor(public app: AppComponent) {}

  computeCalculatedTradeState() {
    return this.app
      .poll()
      ?.state?.trades?.find((t) => t.id === this.trade().id);
  }

  computeInstrument() {
    return this.app
      .instruments()
      ?.filter((i) => i.name === this.trade().instrument)[0];
  }
}
