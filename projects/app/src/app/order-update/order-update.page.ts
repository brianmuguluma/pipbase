import { Component, computed, signal } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import { Instrument } from '../interfaces/oanda';
import { orderBy } from 'lodash-es';
import { AppComponent } from '../app.component';

import { AblyService } from '../services/ably/ably.service';
import {
  FormControl,
  FormControlState,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
} from '@ionic/angular/standalone';

const formControlState: FormControlState<number | null> = {
  value: null,
  disabled: false,
};

@Component({
  selector: 'app-order-update',
  templateUrl: './order-update.page.html',
  styleUrls: ['./order-update.page.scss'],
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
  ],
})
export class OrderUpdatePage {
  instrument = signal<Instrument | undefined>(undefined);
  instruments = computed(() => this.computeInstruments());
  isPublishing = signal(false);
  form = signal(
    new FormGroup({
      takeProfit: new FormControl<number | null>(formControlState),
      stopLoss: new FormControl<number | null>(formControlState),
      trailingStopLoss: new FormControl<number | null>(formControlState),
      notes: new FormControl<string>(''),
    }),
  );
  constructor(
    private app: AppComponent,
    private modalController: ModalController,
    private ably: AblyService,
  ) {}

  computeInstruments() {
    return orderBy(this.app.instruments(), (i) => i.displayName);
  }

  selectInstrument(event: any) {
    if (event.value === undefined) return;

    this.instrument.set(this.filterInstruments(event.value));
  }

  filterInstruments(instrument: string) {
    return this.app.instruments()?.filter((i) => i.name === instrument)[0];
  }

  toggleDependant(dependant: 'stopLoss' | 'takeProfit' | 'trailingStopLoss') {
    this.form()?.controls[dependant].reset({
      value: this.form()?.controls[dependant].value,
      disabled: this.form()?.controls[dependant].enabled,
    });
  }

  async sendSignal() {
    this.isPublishing.set(true);

    const { stopLoss, takeProfit, trailingStopLoss, notes } =
      this.form()?.value;

    const signal: any = {
      instrument: this.instrument?.name,
      command: 'UPDATE_DEPENDANTS',
      notes,
    };

    if (stopLoss) signal.stopLoss = { price: stopLoss };
    if (takeProfit) signal.takeProfit = { price: takeProfit };
    if (trailingStopLoss)
      signal.trailingStopLoss = { distance: trailingStopLoss };

    if (this.form()?.controls.stopLoss.disabled) signal.stopLoss = null;
    if (this.form()?.controls.takeProfit.disabled) signal.takeProfit = null;
    if (this.form()?.controls.trailingStopLoss.disabled)
      signal.trailingStopLoss = null;

    await this.ably.sendSignal(signal);
    this.dismiss();
  }

  async dismiss() {
    await this.modalController.dismiss();
  }

  hk(dependant: Object) {
    return Boolean(Object.keys(dependant).length);
  }
}
