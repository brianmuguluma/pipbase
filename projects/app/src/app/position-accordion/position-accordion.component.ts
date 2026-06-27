import { Component, computed, input } from '@angular/core';

import { Trade } from '../interfaces/oanda';
import { AppComponent } from '../app.component';
import { CurrencyPipe } from '@angular/common';
import {
  IonList,
  IonItem,
  IonLabel,
  IonText,
  IonNote,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-position-accordion',
  templateUrl: './position-accordion.component.html',
  styleUrls: ['./position-accordion.component.scss'],
  standalone: true,
  imports: [CurrencyPipe, IonList, IonItem, IonLabel, IonText, IonNote],
})
export class PositionAccordionComponent {
  name = input.required<string>();
  tradeInputs = input.required<Trade[]>();

  instrument = computed(() => this.computeInstrument());
  trades = computed(() => this.computeTrades());
  realized = computed(() => this.computeRealized());
  max = computed(() => this.computeMax());
  min = computed(() => this.computeMin());
  average = computed(() => this.computeAverage());
  constructor(public app: AppComponent) {}

  computeTrades() {
    return this.tradeInputs().filter((t) => t.instrument === this.name());
  }

  computeRealized() {
    return this.trades()
      ?.map((t) => Number(t.realizedPL)!)
      ?.reduce((r, a) => r + a, 0);
  }

  computeAverage() {
    return this.realized()! / this.trades()?.length!;
  }

  computeInstrument() {
    return this.app.instruments()?.filter((i) => i.name == this.name())[0];
  }

  computeMax() {
    return Math.max(...this.trades()?.map((t) => Number(t?.realizedPL))!);
  }

  computeMin() {
    return Math.min(...this.trades()?.map((t) => Number(t?.realizedPL))!);
  }
}
