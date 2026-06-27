import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonText,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
} from '@ionic/angular/standalone';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
  standalone: true,
  imports: [
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonText,
    ReactiveFormsModule,
    IonButton,
  ],
})
export class PasswordPage {
  form = new FormGroup({
    password: new FormControl(''),
  });
  constructor(private auth: AuthService) {}

  async updatePassword() {
    const { password } = this.form.value;
    if (!password) return;

    try {
      await this.auth.updatePassword(password);
    } catch (error) {
      console.error(error);
    }
  }
}
