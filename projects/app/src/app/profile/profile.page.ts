import { SlicePipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { StripeService } from '../services/stripe/stripe.service';
import { AvatarComponent } from '../avatar/avatar.component';
import { CameraService } from '../services/camera/camera.service';
import { StorageService } from '../services/storage/storage.service';
import { Photo } from '@capacitor/camera';
import { LoadingService } from '../services/loading/loading.service';
import { ToastService } from '../services/toast/toast.service';
import {
  AlertController,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  ModalController,
} from '@ionic/angular/standalone';
import { AppComponent } from '../app.component';
import { NotificationType } from '@capacitor/haptics';
import { HapticsService } from '../services/haptics/haptics.service';
import { IonText, IonButton, IonNote } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { checkmarkCircle } from 'ionicons/icons';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    IonButtons,
    IonHeader,
    SlicePipe,
    FormsModule,
    ReactiveFormsModule,
    AvatarComponent,
    IonText,
    IonButton,
    IonNote,
    IonToolbar,
    IonTitle,
    IonContent,
  ],
})
export class ProfilePage {
  form = new FormGroup({
    displayName: new FormControl(this.auth.profile()?.displayName),
    email: new FormControl(this.auth.profile()?.email),
  });
  photo = signal<Photo | undefined>(undefined);
  constructor(
    public app: AppComponent,
    public auth: AuthService,
    private toast: ToastService,
    private stripe: StripeService,
    private camera: CameraService,
    private storage: StorageService,
    private loading: LoadingService,
    private alertController: AlertController,
    private haptics: HapticsService,
    private modalController: ModalController,
  ) {
    addIcons({ checkmarkCircle });
  }

  async getPhoto() {
    this.photo.set(await this.camera.getPhoto());
  }

  async uploadString() {
    return await this.storage.uploadString(this.photo()?.dataUrl!);
  }

  async update() {
    await this.loading.present();

    const { displayName, email } = this.form.value;
    if (displayName) this.updateProfile({ displayName });
    if (email) this.updateEmail(email);

    if (this.photo()) {
      await this.uploadString();
      await this.updateProfile({
        photoURL: await this.storage.getDownloadURL(),
      });

      this.clearPhoto();
    }

    this.loading.dismiss();
    this.toast.present({
      icon: 'checkmark-circle',
      message: 'Your profile has been updated.',
    });
  }

  async updateProfile({
    displayName,
    photoURL,
  }: {
    displayName?: string | null | undefined;
    photoURL?: string | null | undefined;
  }) {
    await this.auth.updateProfile({ displayName, photoURL });

    if (!displayName) return;

    await this.stripe.updateCustomer({
      id: this.auth.user()?.stripeId,
      params: { name: displayName },
    });
  }

  clearPhoto() {
    this.photo.set(undefined);
  }

  async confirmDeletePhoto() {
    this.haptics.notify({ type: NotificationType.Warning });
    const alert = await this.alertController.create({
      header: 'Delete photo',
      message: 'Are you sure you want to delete your photo?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => this.deletePhoto(),
        },
      ],
    });

    await alert.present();
  }

  private async deletePhoto() {
    try {
      await this.loading.present();
      await this.storage.deleteObject();
      await this.auth.updateProfile({ photoURL: '' });
      this.toast.present({
        message: 'Your photo has been deleted.',
      });
      this.loading.dismiss();
    } catch (error) {
      this.toast.present({ message: 'Failed to delete photo.' });
      this.loading.dismiss();
    }
  }

  async updateEmail(newEmail: string) {
    try {
      await this.auth.updateEmail(newEmail);
    } catch (error) {}
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
