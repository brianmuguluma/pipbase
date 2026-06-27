import { Component, computed, signal } from '@angular/core';
import { AppComponent } from '../app.component';
import { TitleCasePipe } from '@angular/common';
import { orderBy } from 'lodash-es';
import { Instrument } from '../interfaces/oanda';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AblyService } from '../services/ably/ably.service';
import { ToastService } from '../services/toast/toast.service';
import { NoCasePipe } from '../pipes/no-case/no-case.pipe';
import { TimeInForcePipe } from '../pipes/time-in-force/time-in-force.pipe';

@Component({
  selector: 'app-position-close-partial',
  templateUrl: './position-close-partial.page.html',
  styleUrls: ['./position-close-partial.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TitleCasePipe,
    NoCasePipe,
    TimeInForcePipe,
  ],
})
export class PositionClosePartialPage {
  instrument = signal<Instrument | undefined>(undefined);
  instruments = computed(() => this.computeInstruments());
  form = signal(
    new FormGroup({
      percentage: new FormControl(1, Validators.required),
      notes: new FormControl<string>(''),
    }),
  );
  isPublishing = signal(false);
  constructor(
    public app: AppComponent,
    private ably: AblyService,
    private toast: ToastService,
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

  async sendSignal() {
    const { percentage, notes } = this.form()?.value;

    const signal: any = {
      command: 'TAKE_PARTIAL_PROFIT',
      percentage: percentage! / 100,
      instrument: this.instrument()?.name,
      notes,
    };

    await this.ably.sendSignal(signal);
    this.toast.success('Your signal has been sent.');
  }
}
