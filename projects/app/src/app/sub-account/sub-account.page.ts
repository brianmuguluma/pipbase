import { Component, signal } from '@angular/core';
import {
  CurrencyPipe,
  DatePipe,
  DecimalPipe,
  PercentPipe,
} from '@angular/common';

import { SpinnerComponent } from '../spinner/spinner.component';
import { AppComponent } from '../app.component';
import { ToNumberPipe } from '../pipes/to-number/to-number.pipe';
import { RouterLink } from '@angular/router';
import { TooltipComponent } from '../tooltip/tooltip.component';
import { glossary } from '../glossary';
import { GuarenteedStopLossOrderModePipe } from '../pipes/enum/guarenteed-stop-loss-order-mode.pipe';
import { addIcons } from 'ionicons';
import { link } from 'ionicons/icons';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonButton,
  IonIcon,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonText,
  IonNote,
  IonCard,
  IonCardContent,
  IonListHeader,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-sub-account',
  templateUrl: './sub-account.page.html',
  styleUrls: ['./sub-account.page.scss'],
  standalone: true,
  imports: [
    SpinnerComponent,
    CurrencyPipe,
    ToNumberPipe,
    DecimalPipe,
    DatePipe,
    RouterLink,
    TooltipComponent,
    PercentPipe,
    GuarenteedStopLossOrderModePipe,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonButton,
    IonIcon,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonText,
    IonNote,
    IonCard,
    IonCardContent,
    IonListHeader,
  ],
})
export class SubAccountPage {
  glossary = signal(glossary);
  constructor(public app: AppComponent) {
    addIcons({ link });
  }
}
