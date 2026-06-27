import { Component } from '@angular/core';
import { OrderCreatePage } from '../order-create/order-create.page';
import { OrderUpdatePage } from '../order-update/order-update.page';
import { OrderCancelComponent } from '../order-cancel/order-cancel.component';
import { PositionClosePartialPage } from '../position-close-partial/position-close-partial.page';
import { BufferComponent } from '../buffer/buffer.component';
import { BreakEvenComponent } from '../break-even/break-even.component';
import { PositionCloseComponent } from '../position-close/position-close.component';
import { InstancesReinstallComponent } from '../instances-reinstall/instances-reinstall.component';

@Component({
  selector: 'app-actions-panel',
  templateUrl: './actions-panel.component.html',
  styleUrls: ['./actions-panel.component.scss'],
  standalone: true,
  imports: [
    OrderCreatePage,
    OrderUpdatePage,
    OrderCancelComponent,
    PositionClosePartialPage,
    BufferComponent,
    BreakEvenComponent,
    PositionCloseComponent,
    InstancesReinstallComponent,
  ],
})
export class ActionsPanelComponent {
  constructor() {}
}
