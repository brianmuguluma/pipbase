import { CUSTOM_ELEMENTS_SCHEMA, Component, signal } from '@angular/core';
import {
  IonRouterOutlet,
  ModalController,
  SegmentChangeEventDetail,
} from '@ionic/angular/standalone';
import { AuthService } from '../services/auth/auth.service';
import {
  ActivatedRoute,
  QueryParamsHandling,
  Router,
  RouterLink,
} from '@angular/router';
import { AppComponent } from '../app.component';
import { NgClass, TitleCasePipe } from '@angular/common';
import { TradesComponent } from '../trades/trades.component';
import { OrdersComponent } from '../orders/orders.component';
import { PositionsComponent } from '../positions/positions.component';
import { TransactionsComponent } from '../transactions/transactions.component';
import { TradeItemComponent } from '../trade-item/trade-item.component';
import { ItemSkeletonComponent } from '../item-skeleton/item-skeleton.component';
import { SlashPipe } from '../pipes/slash/slash.pipe';
import { addIcons } from 'ionicons';
import { informationCircleOutline } from 'ionicons/icons';
import {
  IonRouterLink,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonButton,
  IonIcon,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonContent,
} from '@ionic/angular/standalone';
import { SubAccountPage } from '../sub-account/sub-account.page';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.page.html',
  styleUrls: ['./exchange.page.scss'],
  standalone: true,
  imports: [
    TradesComponent,
    TitleCasePipe,
    OrdersComponent,
    PositionsComponent,
    TransactionsComponent,
    TradeItemComponent,
    ItemSkeletonComponent,
    NgClass,
    SlashPipe,
    RouterLink,
    IonRouterLink,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
    IonButton,
    IonIcon,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonContent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ExchangePage {
  segments = signal([
    { value: 'trades', label: 'trades' },
    { value: 'orders', label: 'orders' },
    { value: 'positions', label: 'positions' },
    { value: 'transactions', label: 'activity' },
  ]);
  segment = signal('trades');
  queryParamsHandling = signal<QueryParamsHandling>('');
  constructor(
    public app: AppComponent,
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private modalController: ModalController,
    private ionRouterOutlet: IonRouterOutlet,
  ) {
    route.queryParamMap.subscribe((params) => {
      const segment = params.get('segment');
      this.segment.set(segment ? segment : 'trades');
    });
    addIcons({ informationCircleOutline });
  }

  updateSegment(event: CustomEvent<SegmentChangeEventDetail>) {
    const { value } = event.detail;
    this.router.navigate(['/tabs/exchange'], {
      queryParams: { segment: value },
      queryParamsHandling: this.queryParamsHandling(),
    });
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: SubAccountPage,
      presentingElement: this.ionRouterOutlet.nativeEl,
    });

    await modal.present();
  }
}
