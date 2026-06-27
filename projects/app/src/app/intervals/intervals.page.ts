import { Component, input } from '@angular/core';

import { PopoverController } from '@ionic/angular/standalone';
import { CandlestickGranularity } from '../interfaces/oanda';
import { IonContent, IonButton, IonText } from '@ionic/angular/standalone';

const {
  FIVE_SECONDS,
  TEN_SECONDS,
  FIFTEEN_SECONDS,
  THIRTY_SECONDS,
  ONE_MINUTE,
  TWO_MINUTES,
  FOUR_MINUTES,
  FIVE_MINUTES,
  TEN_MINUTES,
  FIFTEEN_MINUTES,
  THIRTY_MINUTES,
  ONE_HOUR,
  TWO_HOURS,
  THREE_HOURS,
  FOUR_HOURS,
  SIX_HOURS,
  EIGHT_HOURS,
  TWELVE_HOURS,
  ONE_DAY,
  ONE_WEEK,
  ONE_MONTH,
} = CandlestickGranularity;

@Component({
  selector: 'app-intervals',
  templateUrl: './intervals.page.html',
  styleUrls: ['./intervals.page.scss'],
  standalone: true,
  imports: [IonContent, IonButton, IonText],
})
export class IntervalsPage {
  interval = input<CandlestickGranularity>();
  intervals: CandlestickGranularity[] = [
    FIVE_SECONDS,
    TEN_SECONDS,
    FIFTEEN_SECONDS,
    THIRTY_SECONDS,
    ONE_MINUTE,
    TWO_MINUTES,
    FOUR_MINUTES,
    FIVE_MINUTES,
    TEN_MINUTES,
    FIFTEEN_MINUTES,
    THIRTY_MINUTES,
    ONE_HOUR,
    TWO_HOURS,
    THREE_HOURS,
    FOUR_HOURS,
    SIX_HOURS,
    EIGHT_HOURS,
    TWELVE_HOURS,
    ONE_DAY,
    ONE_WEEK,
    ONE_MONTH,
  ];

  constructor(private popover: PopoverController) {}

  selectInterval(interval: CandlestickGranularity) {
    this.popover.dismiss(interval);
  }
}
