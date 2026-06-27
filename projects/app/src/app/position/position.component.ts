import { Component, computed, input } from '@angular/core';
import { Position } from '../interfaces/oanda';
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
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss'],
  standalone: true,
  imports: [CurrencyPipe, IonList, IonItem, IonLabel, IonText, IonNote],
})
export class PositionComponent {
  position = input.required<Position>();
  unrealizedPercentage = computed(() => this.computeUnrealizedPercentage());

  constructor(public app: AppComponent) {}

  computeUnrealizedPercentage(): number | undefined {
    if (!this.position()) return;

    const positions = this.app?.poll()?.state?.positions;
    const position = positions?.find(
      (p) => p.instrument === this.position().instrument,
    );

    if (!position) return;

    const { marginUsed, netUnrealizedPL } = position;
    const margin = Number(marginUsed);
    const gain = Number(netUnrealizedPL);
    return (margin + gain - margin) / margin;
  }
}
