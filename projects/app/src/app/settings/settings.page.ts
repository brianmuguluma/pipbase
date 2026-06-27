import { Component, OnInit, signal } from '@angular/core';
import {
  IonCard,
  IonCardContent,
  IonListHeader,
  IonItem,
  IonList,
  IonMenuButton,
  IonText,
  IonNote,
} from '@ionic/angular/standalone';
import { AuthService } from '../services/auth/auth.service';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonLabel,
  IonContent,
} from '@ionic/angular/standalone';
import { ProfileCardComponent } from '../profile-card/profile-card.component';
import { RouterLink } from '@angular/router';
import { AppComponent } from '../app.component';
import { AppInfo } from '@capacitor/app';
import { AppService } from '../services/app/app.service';
import { VersionComponent } from '../version/version.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [
    IonNote,
    IonList,
    IonItem,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonLabel,
    IonContent,
    IonCard,
    IonCardContent,
    IonListHeader,
    ProfileCardComponent,
    RouterLink,
    IonMenuButton,
    IonText,
    VersionComponent,
  ],
})
export class SettingsPage implements OnInit {
  info = signal<AppInfo | undefined>(undefined);
  constructor(
    public app: AppComponent,
    public auth: AuthService,
    private appService: AppService,
  ) {}

  async ngOnInit() {
    this.info.set(await this.appService.getInfo());
  }
}
