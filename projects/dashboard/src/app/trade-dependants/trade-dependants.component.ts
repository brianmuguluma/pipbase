import { Component, input } from '@angular/core';
import { Trade } from '../interfaces/oanda/oanda';
import { OrderBadgeComponent } from '../order-badge/order-badge.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-trade-dependants',
  templateUrl: './trade-dependants.component.html',
  styleUrls: ['./trade-dependants.component.scss'],
  standalone: true,
  imports: [RouterLink, OrderBadgeComponent],
})
export class TradeDependantsComponent {
  trade = input.required<Trade>();
  constructor() {}
}
