import { Component, computed, signal } from '@angular/core';
import { Instrument } from '../interfaces/oanda';
import { orderBy } from 'lodash-es';
import { AppComponent } from '../app.component';

import { AblyService } from '../services/ably/ably.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-position-close',
  templateUrl: './position-close.component.html',
  styleUrls: ['./position-close.component.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
})
export class PositionCloseComponent {
  instrument = signal<Instrument | undefined>(undefined);
  instruments = computed(() => this.computeInstruments());
  form = signal(
    new FormGroup({
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

  async sendSignal() {
    const { notes } = this.form()?.value;

    const signal: any = {
      instrument: this.instrument()?.name,
      command: 'CLOSE_POSITION',
      notes,
    };

    await this.ably.sendSignal(signal);
  }
}
