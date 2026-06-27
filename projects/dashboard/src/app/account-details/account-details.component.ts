import { Component, signal } from '@angular/core';
import { AppComponent } from '../app.component';
import { TooltipComponent } from '../tooltip/tooltip.component';
import { CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { glossary } from '../glossary';
import { GuarenteedStopLossOrderModePipe } from '../pipes/enum/guarenteed-stop-loss-order-mode.pipe';
import { ToNumberPipe } from '../pipes/to-number/to-number.pipe';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss'],
  standalone: true,
  imports: [
    TooltipComponent,
    CurrencyPipe,
    DatePipe,
    DecimalPipe,
    GuarenteedStopLossOrderModePipe,
    ToNumberPipe,
  ],
})
export class AccountDetailsComponent {
  glossary = signal(glossary);
  constructor(public app: AppComponent) {}
}
