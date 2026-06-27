import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-signal-update',
  templateUrl: './signal-update.page.html',
  styleUrls: ['./signal-update.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
})
export class SignalUpdatePage {
  constructor() {}
}
