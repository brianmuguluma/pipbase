import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { TradeStateFilter } from '../interfaces/oanda/oanda';

@Component({
  selector: 'app-trade-badge',
  templateUrl: './trade-badge.component.html',
  styleUrls: ['./trade-badge.component.scss'],
  standalone: true,
  imports: [NgClass],
})
export class TradeBadgeComponent {
  state = input.required<TradeStateFilter>();
  constructor() {}
}
