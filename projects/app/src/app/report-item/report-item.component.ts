import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ToDatePipe } from '../pipes/to-date/to-date.pipe';
import { IonItem, IonLabel, IonText } from '@ionic/angular/standalone';

@Component({
  selector: 'app-report-item',
  templateUrl: './report-item.component.html',
  styleUrls: ['./report-item.component.scss'],
  standalone: true,
  imports: [RouterLink, DatePipe, ToDatePipe, IonItem, IonLabel, IonText],
})
export class ReportItemComponent {
  month = input.required<number>();
  constructor() {}
}
