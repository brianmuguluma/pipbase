import { Component, computed, effect, input, signal } from '@angular/core';
import { DatePipe, DecimalPipe, TitleCasePipe } from '@angular/common';
import { RefresherEventDetail } from '@ionic/angular/standalone';
import { AppComponent } from '../app.component';
import { ActivatedRoute } from '@angular/router';
import { OandaService } from '../services/oanda/oanda.service';
import { OandaError, Order } from '../interfaces/oanda';
import { glossary } from '../glossary';
import { SpinnerComponent } from '../spinner/spinner.component';
import { LinkComponent } from '../link/link.component';
import { NoCasePipe } from '../pipes/no-case/no-case.pipe';
import { SlashPipe } from '../pipes/slash/slash.pipe';
import { TooltipComponent } from '../tooltip/tooltip.component';
import { ErrorComponent } from '../error/error.component';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonRefresher,
  IonRefresherContent,
  IonList,
  IonItem,
  IonLabel,
  IonText,
  IonNote,
  IonListHeader,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
  standalone: true,
  imports: [
    SpinnerComponent,
    LinkComponent,
    NoCasePipe,
    TitleCasePipe,
    SlashPipe,
    DecimalPipe,
    DatePipe,
    TooltipComponent,
    ErrorComponent,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    IonRefresher,
    IonRefresherContent,
    IonList,
    IonItem,
    IonLabel,
    IonText,
    IonNote,
    IonListHeader,
  ],
})
export class OrderPage {
  id = input<string>();
  instrument = computed(() => this.getInstrument());
  order = signal<Order | undefined | null>(undefined);
  glossary = signal(glossary);
  error = signal<OandaError | undefined>(undefined);
  status = signal<number | undefined>(undefined);
  constructor(
    public app: AppComponent,
    private oanda: OandaService,
  ) {
    effect(() => {
      if (app.account()) this.getOrder();
    });
  }

  async getOrder(event?: CustomEvent<RefresherEventDetail>) {
    const { data, status } = await this.oanda.getOrder(this.id()!);
    this.status.set(status);
    if (status === 200) {
      this.order.set(data.order);
    } else {
      this.order.set(null);
      this.error.set(data);
    }
    event?.detail.complete();
  }

  getInstrument() {
    return this.app
      .instruments()
      ?.filter((instrument) => instrument.name === this.order()?.instrument)[0];
  }
}
