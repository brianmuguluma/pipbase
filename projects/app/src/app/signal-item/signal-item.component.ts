import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FormatRelativePipe } from '../pipes/format-relative/format-relative.pipe';
import { TitleCasePipe } from '@angular/common';
import { NoCasePipe } from '../pipes/no-case/no-case.pipe';
import { IonItem, IonLabel, IonText, IonNote } from '@ionic/angular/standalone';
import { Signal } from '../interfaces/signal';

@Component({
  selector: 'app-signal-item',
  templateUrl: './signal-item.component.html',
  styleUrls: ['./signal-item.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    FormatRelativePipe,
    NoCasePipe,
    TitleCasePipe,
    IonItem,
    IonLabel,
    IonText,
    IonNote,
  ],
})
export class SignalItemComponent {
  signal = input.required<Signal>();
  constructor() {}
}
