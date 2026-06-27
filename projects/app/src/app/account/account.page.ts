import { Component } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonButtons,
  IonItem,
  IonList,
  IonText,
  AlertController,
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { HapticsService } from '../services/haptics/haptics.service';
import { NotificationType } from '@capacitor/haptics';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: true,
  imports: [
    IonText,
    IonList,
    IonItem,
    IonButtons,
    IonBackButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    RouterLink,
  ],
})
export class AccountPage {
  constructor(
    private auth: AuthService,
    private haptics: HapticsService,
    private alertController: AlertController,
  ) {}

  async notify() {
    await this.haptics.notify({ type: NotificationType.Warning });
  }

  async signOut() {
    await this.notify();

    const alert = await this.alertController.create({
      header: 'Sign Out',
      message: 'Are you sure you want to sign out?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Sign Out',
          role: 'destructive',
          handler: async () => await this.auth.signOut(),
        },
      ],
    });

    await alert.present();
  }
}
