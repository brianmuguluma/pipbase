import { Component, computed, signal } from '@angular/core';
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

const formControlState: FormControlState<number | null> = {
  value: null,
  disabled: false,
};

@Component({
  selector: 'app-order-update',
  templateUrl: './order-update.page.html',
  styleUrls: ['./order-update.page.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
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

    const {
      stopLoss: sl,
      takeProfit: tp,
      trailingStopLoss: ts,
    } = this.form()?.controls;

    const signal: any = {
      instrument: this.instrument()?.name,
      command: 'UPDATE_DEPENDANTS',
      notes,
    };

    if (stopLoss) signal.stopLoss = { price: stopLoss };
    if (takeProfit) signal.takeProfit = { price: takeProfit };
    if (trailingStopLoss)
      signal.trailingStopLoss = { distance: trailingStopLoss };

    if (sl?.disabled) signal.stopLoss = null;
    if (tp?.disabled) signal.takeProfit = null;
    if (ts?.disabled) signal.trailingStopLoss = null;

    await this.ably.sendSignal(signal);
  }
}
