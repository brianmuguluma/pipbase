import { Component } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonText,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
} from '@ionic/angular/standalone';
import { AuthService } from '../services/auth/auth.service';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-metadata',
  templateUrl: './metadata.page.html',
  styleUrls: ['./metadata.page.scss'],
  standalone: true,
  imports: [
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonText,
    SpinnerComponent,
  ],
})
export class MetadataPage {
  constructor(public auth: AuthService) {}
}
