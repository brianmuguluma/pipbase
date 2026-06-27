import { Component, effect, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AppComponent } from '../app.component';
import {
  differenceInCalendarMonths,
  getUnixTime,
  parseISO,
  startOfMonth,
  subMonths,
} from 'date-fns';
import { SpinnerComponent } from '../spinner/spinner.component';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';
import { RouterLink } from '@angular/router';
import { StartOfMonthPipe } from '../pipes/start-of-month/start-of-month.pipe';
import { EndOfMonthPipe } from '../pipes/end-of-month/end-of-month.pipe';
import { OrdinalPipe } from '../pipes/ordinal/ordinal.pipe';
import { GetDaysInMonthPipe } from '../pipes/get-days-in-month/get-days-in-month.pipe';
import { DifferenceInBusinessDaysPipe } from '../pipes/difference-in-business-days/difference-in-business-days.pipe';
import { range } from 'lodash-es';
import { ToDatePipe } from '../pipes/to-date/to-date.pipe';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
  standalone: true,
  imports: [
    SpinnerComponent,
    BreadcrumbsComponent,
    DatePipe,
    RouterLink,
    StartOfMonthPipe,
    EndOfMonthPipe,
    OrdinalPipe,
    GetDaysInMonthPipe,
    DifferenceInBusinessDaysPipe,
    ToDatePipe,
    HeaderComponent,
    FooterComponent,
  ],
})
export class ReportsPage {
  months = signal<number[]>([]);
  constructor(public app: AppComponent) {
    effect(() => {
      if (app.isReady()) this.getDates();
    });
  }

  getDates() {
    this.months().length = 0;
    this.months().push(
      getUnixTime(startOfMonth(subMonths(startOfMonth(new Date()), 0))),
    );

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
}
