import { TitleCasePipe } from '@angular/common';
import { Component, input } from '@angular/core';

import { OrderStateFilter } from '../interfaces/oanda';
import { addIcons } from 'ionicons';
import { timer, checkmarkCircle, closeCircle, pulse } from 'ionicons/icons';
import { IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-order-item-badge',
  templateUrl: './order-item-badge.component.html',
  styleUrls: ['./order-item-badge.component.scss'],
  standalone: true,
  imports: [TitleCasePipe, IonIcon],
})
export class OrderItemBadgeComponent {
  state = input.required<OrderStateFilter | string>();
  constructor() {
    addIcons({ timer, checkmarkCircle, closeCircle, pulse });
  }
}
