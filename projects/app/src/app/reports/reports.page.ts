import { Component, effect, signal } from '@angular/core';

import { RefresherEventDetail } from '@ionic/angular/standalone';
import { ItemSkeletonComponent } from '../item-skeleton/item-skeleton.component';
import { AppComponent } from '../app.component';
import {
  differenceInCalendarMonths,
  getUnixTime,
  parseISO,
  startOfMonth,
  subMonths,
} from 'date-fns';
import { ReportItemComponent } from '../report-item/report-item.component';
import { range } from 'lodash-es';
import { ToDatePipe } from '../pipes/to-date/to-date.pipe';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonRefresher,
  IonRefresherContent,
  IonList,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
  standalone: true,
  imports: [
    ItemSkeletonComponent,
    ReportItemComponent,
    ToDatePipe,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
    IonContent,
    IonRefresher,
    IonRefresherContent,
    IonList,
  ],
})
export class ReportsPage {
  months = signal<number[]>([]);
  constructor(public app: AppComponent) {
    effect(() => {
      if (this.app.account()) this.getDates();
    });
  }

  getDates() {
    this.months().length = 0;
    this.months().push(getUnixTime(startOfMonth(subMonths(new Date(), 0))));

    range(
      differenceInCalendarMonths(
        new Date(),
        parseISO(this.app.account()?.createdTime!),
      ),
    ).forEach((_i, index) => {
      this.months().push(
        getUnixTime(startOfMonth(subMonths(new Date(), index + 1))),
      );
    });
  }

  refresh(event: CustomEvent<RefresherEventDetail>) {
    this.getDates();
    event.detail.complete();
  }
}
