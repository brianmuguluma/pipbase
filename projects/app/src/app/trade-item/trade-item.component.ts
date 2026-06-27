import { Component, computed, input } from '@angular/core';

import { Trade } from '../interfaces/oanda';
import { AppComponent } from '../app.component';
import {
  CurrencyPipe,
  LowerCasePipe,
  NgPlural,
  NgPluralCase,
  PercentPipe,
} from '@angular/common';
import { SlashPipe } from '../pipes/slash/slash.pipe';
import { ToNumberPipe } from '../pipes/to-number/to-number.pipe';
import { FormatRelativePipe } from '../pipes/formatDistance/formatDistance.pipe';
import { RouterLink } from '@angular/router';
import { CompactPipe } from '../pipes/compact/compact.pipe';
import { AbsolutePipe } from '../pipes/absolute/absolute.pipe';
import { addIcons } from 'ionicons';
import { ellipse } from 'ionicons/icons';
import {
  IonItem,
  IonLabel,
  IonText,
  IonNote,
  IonIcon,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-trade-item',
  templateUrl: './trade-item.component.html',
  styleUrls: ['./trade-item.component.scss'],
  standalone: true,
  imports: [
    SlashPipe,
    ToNumberPipe,
    FormatRelativePipe,
    LowerCasePipe,
    CurrencyPipe,
    PercentPipe,
    RouterLink,
    NgPluralCase,
    CompactPipe,
    NgPlural,
    AbsolutePipe,
    IonItem,
    IonLabel,
    IonText,
    IonNote,
    IonIcon,
  ],
})
export class TradeItemComponent {
  trade = input.required<Trade>();
  calculatedTradeState = computed(() => this.computeCalculatedTradeState());
  closedTrade = computed(() => this.computeClosedTrade());
  constructor(public app: AppComponent) {
    addIcons({ ellipse });
  }

  computeClosedTrade() {
    return this.app
      .poll()
      ?.changes?.tradesClosed?.find((t) => t.id === this.trade().id);
  }

  computeCalculatedTradeState() {
    return this.app
      .poll()
      ?.state?.trades?.find((t) => t.id === this.trade().id);
  }
}
