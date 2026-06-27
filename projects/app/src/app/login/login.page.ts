import { Component, effect, signal } from '@angular/core';

import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular/standalone';
import { AuthService } from '../services/auth/auth.service';
import { ToastService } from '../services/toast/toast.service';
import { LoadingService } from '../services/loading/loading.service';
import { addIcons } from 'ionicons';
import { closeCircle } from 'ionicons/icons';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonText,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonIcon,
    IonContent,
    IonText,
  ],
})
export class LoginPage {
  isRegistered = signal(true);
  form = signal(
    new FormGroup({
      email: new FormControl('', Validators.required),
      displayName: new FormControl(
        '',
        this.isRegistered() ? null : Validators.required,
      ),
      password: new FormControl('', Validators.required),
    }),
  );
  constructor(
    public auth: AuthService,
    private alert: AlertController,
    private modalController: ModalController,
    private toast: ToastService,
    private loading: LoadingService,
  ) {
    effect(() => {
      if (auth.user()) this.dismiss();
    });
    addIcons({ closeCircle });
  }

  authenticateUser() {
    if (this.isRegistered()) {
      this.signInWithEmailAndPassword();
    } else {
      this.createUserWithEmailAndPassword();
    }
  }

  async signInWithEmailAndPassword() {
    const { email, password } = this.form().value;
    await this.auth.signInWithEmailAndPassword(email!, password!);
  }

  async createUserWithEmailAndPassword() {
    const { displayName, email, password } = this.form().value;

    await this.loading.present();
    await this.auth.createUserWithEmailAndPassword(email!, password!);
    await this.auth.updateProfile({ displayName });
    await this.loading.dismiss();
  }

  updateAuthType(event: any) {
    this.isRegistered = event.detail.value;
  }

  async sendPasswordResetEmail() {
    const alert = await this.alert.create({
      header: 'Password Reset',
      subHeader: 'Sends a password reset email to the given email address.',
      translucent: true,
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Enter you email',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: 'Send',
          handler: async (input) => {
            const { email } = input;
            await this.auth.sendPasswordResetEmail(email);
            this.toast.present({
              icon: 'checkmark',
              message: `An email has been sent to ${email}`,
            });
          },
        },
      ],
    });

    await alert.present();
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
