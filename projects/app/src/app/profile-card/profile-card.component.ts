import { Component } from '@angular/core';
import {
  IonAvatar,
  IonCard,
  IonItem,
  IonLabel,
  IonRouterOutlet,
  IonText,
  ModalController,
  IonSkeletonText,
} from '@ionic/angular/standalone';
import { AvatarComponent } from '../avatar/avatar.component';
import { AuthService } from '../services/auth/auth.service';
import { AppComponent } from '../app.component';
import { ProfilePage } from '../profile/profile.page';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss'],
  standalone: true,
  imports: [
    IonSkeletonText,
    IonCard,
    IonItem,
    IonAvatar,
    AvatarComponent,
    IonLabel,
    IonText,
  ],
})
export class ProfileCardComponent {
  constructor(
    public app: AppComponent,
    public auth: AuthService,
    private modalController: ModalController,
    private ionRouterOutlet: IonRouterOutlet,
  ) {}

  async getProfile() {
    if (!this.auth.profile()) return;

    const modal = await this.modalController.create({
      component: ProfilePage,
      presentingElement: this.ionRouterOutlet.nativeEl,
    });

    await modal.present();
  }
}
