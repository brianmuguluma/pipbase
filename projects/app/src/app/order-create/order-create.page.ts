import { Component, computed, signal } from '@angular/core';
import { AppComponent } from '../app.component';
import { orderBy } from 'lodash-es';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ModalController } from '@ionic/angular/standalone';
import { ToastService } from '../services/toast/toast.service';
import { AblyService } from '../services/ably/ably.service';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
  IonList,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonRadioGroup,
  IonRadio,
  IonSpinner,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.page.html',
  styleUrls: ['./order-create.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonContent,
    IonList,
    IonItem,
    IonSelect,
    IonSelectOption,
    IonRadioGroup,
    IonRadio,
    IonSpinner,
  ],
})
export class OrderCreatePage {
  instruments = computed(() => this.computeInstruments());
  form = signal(
    new FormGroup({
      instrument: new FormControl(undefined, Validators.required),
      side: new FormControl(undefined, Validators.required),
      percentage: new FormControl(1, Validators.required),
      takeProfit: new FormControl(undefined),
      stopLoss: new FormControl(undefined),
      trailingStopLoss: new FormControl(undefined),
      notes: new FormControl(undefined),
    }),
  );
  isPublishing = signal(false);
  constructor(
    public app: AppComponent,
    private ably: AblyService,
    private modalController: ModalController,
    private toast: ToastService,
  ) {}

  computeInstruments() {
    return orderBy(this.app.instruments(), (i) => i.displayName);
  }

  filterInstruments(instrument: string) {
    return this.app.instruments()?.filter((i) => i.name === instrument)[0];
  }

  async sendSignal() {
    this.isPublishing.set(true);
    const {
      instrument,
      notes,
      percentage,
      side,
      stopLoss,
      takeProfit,
      trailingStopLoss,
    } = this.form()?.value;
    const signal: any = {
      command: 'CREATE_ORDER',
      notes,
      side,
      percentage: percentage! / 100,
      instrument,
    };

    if (stopLoss) signal.stopLossOnFill = { price: stopLoss };
    if (takeProfit) signal.takeProfitOnFill = { price: takeProfit };
    if (trailingStopLoss)
      signal.trailingStopLossOnFill = { distance: trailingStopLoss };

    await this.ably.sendSignal(signal);
    await this.toast.present({ message: 'Your signal has been sent.' });
    this.dismiss();
  }

  async dismiss() {
    await this.modalController.dismiss();
  }
}
