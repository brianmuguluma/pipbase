import { Component, input } from '@angular/core';

import { Instrument } from '../interfaces/oanda';
import { IonItem, IonLabel } from '@ionic/angular/standalone';

@Component({
  selector: 'app-instrument-item',
  templateUrl: './instrument-item.component.html',
  styleUrls: ['./instrument-item.component.scss'],
  standalone: true,
  imports: [IonItem, IonLabel],
})
export class InstrumentItemComponent {
  instrument = input.required<Instrument>();
  constructor() {}
}
