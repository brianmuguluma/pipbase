import { Component, computed } from '@angular/core';
import { AppComponent } from '../app.component';
import { ModalController } from '@ionic/angular/standalone';
import { orderBy } from 'lodash-es';
import { Instrument } from '../interfaces/oanda';

import { AblyService } from '../services/ably/ably.service';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
  IonFooter,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-position-close',
  templateUrl: './position-close.page.html',
  styleUrls: ['./position-close.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonContent,
    IonFooter,
  ],
})
export class PositionClosePage {
  instrument: Instrument | undefined;
  instruments = computed(() => this.computeInstruments());
  notes: string = '';
  constructor(
    public app: AppComponent,
    private modalController: ModalController,
    private ably: AblyService,
  ) {}

  computeInstruments() {
    return orderBy(this.app.instruments(), (i) => i.displayName);
  }

  selectInstrument(event: any) {
    if (event.value === undefined) return;

    this.instrument = this.filterInstruments(event.value);
  }

  filterInstruments(instrument: string) {
    return this.app.instruments()?.filter((i) => i.name === instrument)[0];
  }

  async sendSignal() {
    const signal = {
      command: 'CLOSE_POSITION',
      instrument: this.instrument?.name,
      notes: this.notes,
    };
    const x = await this.ably.sendSignal(signal);

    this.dismiss();
  }

  async dismiss() {
    this.modalController.dismiss();
  }
}
