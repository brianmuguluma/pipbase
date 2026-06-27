import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { OrderStateFilter } from '../interfaces/oanda/oanda';

@Component({
  selector: 'app-order-badge',
  templateUrl: './order-badge.component.html',
  styleUrls: ['./order-badge.component.scss'],
  standalone: true,
  imports: [NgClass],
})
export class OrderBadgeComponent {
  state = input.required<OrderStateFilter>();
  constructor() {}
}
