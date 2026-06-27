import { Component, computed, effect, input, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  Candlestick,
  OandaError,
  StopLossOrder,
  TakeProfitOrder,
  Trade,
  TrailingStopLossOrder,
} from '../interfaces/oanda';
import { OandaService } from '../services/oanda/oanda.service';
import {
  ActionSheetButton,
  ActionSheetController,
  AlertController,
  RefresherEventDetail,
} from '@ionic/angular/standalone';
import { AppComponent } from '../app.component';
import { glossary } from '../glossary';
import { capitalCase } from 'change-case';
import { PreferencesService } from '../services/preferences/preferences.service';
import { SlashPipe } from '../pipes/slash/slash.pipe';
import { SpinnerComponent } from '../spinner/spinner.component';
import {
  CurrencyPipe,
  DatePipe,
  DecimalPipe,
  NgClass,
  NgStyle,
  PercentPipe,
  SlicePipe,
  TitleCasePipe,
} from '@angular/common';
import { CompactPipe } from '../pipes/compact/compact.pipe';
import { ToNumberPipe } from '../pipes/to-number/to-number.pipe';
import { DurationPipe } from '../pipes/duration/duration.pipe';
import { LinkComponent } from '../link/link.component';
import { PipsPipe } from '../pipes/pips/pips.pipe';
import { FormatPipsPipe } from '../pipes/formatPips/format-pips.pipe';
import { AbsolutePipe } from '../pipes/absolute/absolute.pipe';
import { TooltipComponent } from '../tooltip/tooltip.component';
import { OrderItemBadgeComponent } from '../order-item-badge/order-item-badge.component';
import { ErrorComponent } from '../error/error.component';
import { SnapshotComponent } from '../snapshot/snapshot.component';
import { addIcons } from 'ionicons';
import { link } from 'ionicons/icons';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonButton,
  IonIcon,
  IonContent,
  IonRefresher,
  IonRefresherContent,
  IonText,
  IonNote,
  IonList,
  IonItem,
  IonLabel,
  IonCard,
  IonCardHeader,
  IonCardTitle,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.page.html',
  styleUrls: ['./trade.page.scss'],
  standalone: true,
  imports: [
    SpinnerComponent,
    CurrencyPipe,
    SlashPipe,
    SlicePipe,
    NgClass,
    NgStyle,
    CompactPipe,
    ToNumberPipe,
    DurationPipe,
    LinkComponent,
    RouterLink,
    DatePipe,
    PipsPipe,
    FormatPipsPipe,
    PercentPipe,
    TitleCasePipe,
    AbsolutePipe,
    DecimalPipe,
    TooltipComponent,
    OrderItemBadgeComponent,
    ErrorComponent,
    SnapshotComponent,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonButton,
    IonIcon,
    IonContent,
    IonRefresher,
    IonRefresherContent,
    IonText,
    IonNote,
    IonList,
    IonItem,
    IonLabel,
    IonCard,
    IonCardHeader,
    IonCardTitle,
  ],
})
export class TradePage {
  id = input<string>();
  closedTrade = computed(() => this.computeClosedTrade());
  calculatedTradeState = computed(() => this.computeCalculatedTradeState());
  candlestick = signal<Candlestick | undefined>(undefined);
  trade = signal<Trade | undefined | null>(undefined);
  instrument = computed(() => this.computeInstrument());
  isEmpty = signal<boolean>(false);
  glossary = signal(glossary);
  isOpen = computed(() => this.trade()?.state === 'OPEN');
  isBreakEven = computed(() => this.computeIsBreakEven());
  percentage = computed(() => this.computePercentage());
  pointSize = computed(() => this.computePointSize());
  distance = computed(() => this.computeDistance());
  value = computed(() => this.computePipValue());
  side = computed(() => this.computeSide());
  error = signal<OandaError | undefined>(undefined);
  status = signal<number | undefined>(undefined);
  constructor(
    public app: AppComponent,
    private router: Router,
    private oanda: OandaService,
    private alertController: AlertController,
    private actionSheetController: ActionSheetController,
    private preferences: PreferencesService,
  ) {
    effect(() => {
      if (app.isReady()) this.getTrade();
    });
    addIcons({ link });
  }

  async getTrade() {
    if (this.app.isReady()) {
      const { data, status } = await this.oanda.getTrade(this.id()!);

      this.status.set(status);
      if (status === 200) {
        this.trade?.set(data.trade as Trade);
      } else {
        this.trade.set(null);
        this.error.set(data);
      }
    }
  }

  computeCalculatedTradeState() {
    return this.app
      .poll()
      ?.state?.trades?.find((trade) => trade.id === this.trade()?.id);
  }

  computeClosedTrade() {
    return this.app
      .poll()
      ?.changes?.tradesClosed?.find((trade) => trade.id === this.id());
  }

  computeSide() {
    return Number(this.trade()?.initialUnits) > 0 ? 'long' : 'short';
  }

  computeIsBreakEven() {
    const { averageClosePrice, price } = this.trade()!;
    return price === this.candlestick()?.mid?.c || price === averageClosePrice;
  }

  computeDistance() {
    if (this.instrument()) {
      const { displayPrecision, pipLocation } = this.instrument()!;
      const { averageClosePrice, price, state } = this.trade()!;
      const close = Number(
        state === 'OPEN' ? this.candlestick()?.mid?.c : averageClosePrice,
      );
      return Number(
        (Number(close - Number(price)) * 10 ** Math.abs(pipLocation)).toFixed(
          displayPrecision,
        ),
      );
    }
    return;
  }

  computePointSize() {
    if (this.instrument()) {
      const { pipLocation, displayPrecision } = this.instrument()!;
      return Number((10 ** pipLocation).toFixed(displayPrecision));
    }
    return;
  }

  computePercentage() {
    return (
      (Number(this.trade()?.initialMarginRequired) +
        (this.trade()?.state! === 'OPEN'
          ? Number(this.calculatedTradeState()?.unrealizedPL)
          : Number(this.trade()?.realizedPL)) -
        Number(this.trade()?.initialMarginRequired)) /
      Number(this.trade()?.initialMarginRequired)
    );
  }

  computePipValue(): number {
    const { state, realizedPL, unrealizedPL } = this.trade()!;
    const isOpen = state === 'OPEN';
    const gain = Number(isOpen ? unrealizedPL : realizedPL);
    return Math.abs(gain / Number(this.distance()));
  }

  async getGranularity() {
    return await this.preferences.getValue({ key: 'granularity' });
  }

  computeInstrument() {
    return this.app
      .instruments()
      ?.filter((instrument) => instrument.name === this.trade()?.instrument)[0];
  }

  async refresh(event?: CustomEvent<RefresherEventDetail>) {
    await this.getTrade();
    event?.detail.complete();
  }

  async presentActionSheet(
    order: StopLossOrder | TakeProfitOrder | TrailingStopLossOrder,
    description: string,
  ) {
    const { id, fillingTransactionID, cancellingTransactionID, state, type } =
      order;

    const buttons: ActionSheetButton<any>[] = [
      {
        text: 'Order',
        handler: () => {
          this.router.navigateByUrl(`orders/${id}`);
        },
      },
    ];

    if (state === 'FILLED' || state === 'CANCELLED') {
      buttons.push({
        text: 'Transaction',
        handler: () => {
          this.router.navigateByUrl(
            `transactions/${
              state === 'FILLED'
                ? fillingTransactionID
                : cancellingTransactionID
            }`,
          );
        },
      });
    }

    buttons.push({
      text: 'Cancel',
      role: 'cancel',
    });
    const actionSheet = await this.actionSheetController.create({
      header: capitalCase(type.split('_').join(' ')),
      subHeader: description,
      buttons,
    });

    await actionSheet.present();
  }

  async closeTrade() {
    await this.oanda.closeTrade(this.trade()?.id!, 'ALL');
    this.refresh();
  }

  async confirmCloseTrade() {
    const alert = await this.alertController.create({
      header: 'Close Trade',
      message: 'Are you sure you want to close this trade?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Close',
          role: 'destructive',
          handler: async () => {
            await this.closeTrade();
          },
        },
      ],
    });

    await alert.present();
  }
}
