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
  selector: 'app-break-even',
  templateUrl: './break-even.component.html',
  styleUrls: ['./break-even.component.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
})
export class BreakEvenComponent {
  instrument = signal<Instrument | undefined>(undefined);
  instruments = computed(() => this.computeInstruments());
  isPublishing = signal(false);
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
    this.isPublishing.set(true);

    const { notes } = this.form()?.value;

    const signal: any = {
      instrument: this.instrument()?.name,
      command: 'BREAK_EVEN',
      notes,
    };

    await this.ably.sendSignal(signal);
  }
}
