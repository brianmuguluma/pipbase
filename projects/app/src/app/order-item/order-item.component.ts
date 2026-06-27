import { Component, input } from '@angular/core';
import { AppComponent } from '../app.component';
import { Order } from '../interfaces/oanda';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SlashPipe } from '../pipes/slash/slash.pipe';
import { ToNumberPipe } from '../pipes/to-number/to-number.pipe';
import { NoCasePipe } from '../pipes/no-case/no-case.pipe';
import { FormatPipsPipe } from '../pipes/formatPips/format-pips.pipe';
import { CompactPipe } from '../pipes/compact/compact.pipe';
import { FormatRelativePipe } from '../pipes/formatDistance/formatDistance.pipe';
import { IonItem, IonLabel, IonText, IonNote } from '@ionic/angular/standalone';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    TitleCasePipe,
    SlashPipe,
    ToNumberPipe,
    NoCasePipe,
    FormatPipsPipe,
    CompactPipe,
    FormatRelativePipe,
    DatePipe,
    IonItem,
    IonLabel,
    IonText,
    IonNote,
  ],
})
export class OrderItemComponent {
  order = input.required<Order>();
  displayName: string | undefined;
  pipLocation: number | undefined;
  constructor(private app: AppComponent) {}

  getDisplayName() {
    return this.app
      .instruments()
      ?.filter((instrument) => instrument.name === this.order().instrument)?.[0]
      ?.displayName;
  }
}
