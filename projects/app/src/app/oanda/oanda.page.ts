import { Component } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
} from '@ionic/angular/standalone';
import { CredentialsComponent } from '../credentials/credentials.component';
import { AccountsComponent } from '../accounts/accounts.component';

@Component({
  selector: 'app-oanda',
  templateUrl: './oanda.page.html',
  styleUrls: ['./oanda.page.scss'],
  standalone: true,
  imports: [
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CredentialsComponent,
    AccountsComponent,
  ],
})
export class OandaPage {
  constructor() {}
}
