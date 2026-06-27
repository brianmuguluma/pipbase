import { Component, computed, effect, signal } from '@angular/core';
import { RefresherEventDetail } from '@ionic/angular/standalone';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AppComponent } from '../app.component';
import { glossary } from '../glossary';
import { Transaction } from '../interfaces/oanda';
import { OandaService } from '../services/oanda/oanda.service';
import {
  AsyncPipe,
  CurrencyPipe,
  DatePipe,
  DecimalPipe,
  Location,
  TitleCasePipe,
} from '@angular/common';
import { LinkComponent } from '../link/link.component';
import { SlashPipe } from '../pipes/slash/slash.pipe';
import { SpinnerComponent } from '../spinner/spinner.component';
import { NoCasePipe } from '../pipes/no-case/no-case.pipe';
import { ReasonPipe } from '../pipes/enum/reason.pipe';
import { RejectReasonPipe } from '../pipes/enum/reject-reason.pipe';
import { TooltipComponent } from '../tooltip/tooltip.component';
import { ToNumberPipe } from '../pipes/to-number/to-number.pipe';
import { addIcons } from 'ionicons';
import { chevronDown, chevronUp } from 'ionicons/icons';
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
  IonList,
  IonItem,
  IonLabel,
  IonText,
  IonNote,
  IonCard,
  IonCardContent,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.page.html',
  styleUrls: ['./transaction.page.scss'],
  standalone: true,
  imports: [
    RouterLink,
    LinkComponent,
    SpinnerComponent,
    SlashPipe,
    NoCasePipe,
    TitleCasePipe,
    ReasonPipe,
    AsyncPipe,
    RejectReasonPipe,
    DecimalPipe,
    CurrencyPipe,
    DatePipe,
    TooltipComponent,
    ToNumberPipe,
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
    IonList,
    IonItem,
    IonLabel,
    IonText,
    IonNote,
    IonCard,
    IonCardContent,
  ],
})
export class TransactionPage {
  id = signal<string | undefined | null>(undefined);
  transaction = signal<Transaction | any | undefined>(undefined);
  glossary = signal(glossary);
  instrument = computed(() => this.getInstrument());
  constructor(
    public app: AppComponent,
    private oanda: OandaService,
    private route: ActivatedRoute,
    private location: Location,
  ) {
    this.id?.set(this.route.snapshot.paramMap.get('id'));
    effect(() => {
      if (app.isReady()) this.getTransaction();
    });
    addIcons({ chevronDown, chevronUp });
  }

  async getTransaction() {
    if (this.app.account()?.id) {
      const { data, status } = await this.oanda.getTransaction(this.id()!);
      if (status === 200) {
        const transaction = data.transaction;
        this.transaction.set(transaction);
      }
    }
  }

  getInstrument() {
    return this.app
      .instruments()
      ?.filter(
        (instrument) => instrument.name === this.transaction()?.instrument,
      )[0];
  }

  async refresh(event?: CustomEvent<RefresherEventDetail>) {
    await this.getTransaction();
    event?.detail.complete();
  }

  incrementTicket() {
    this.id.set((Number(this.id()) + 1).toString());
    this.transaction.set(undefined);
    this.loadTransaction();
  }

  decrementTicket() {
    this.id.set((Number(this.id()) - 1).toString());
    this.transaction.set(undefined);
    this.loadTransaction();
  }

  loadTransaction() {
    this.location.replaceState(`/transactions/${this.id()}`);
  }
}
