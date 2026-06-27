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
import { HapticsService } from '../services/haptics/haptics.service';
import { NotificationType } from '@capacitor/haptics';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-security',
  templateUrl: './security.page.html',
  styleUrls: ['./security.page.scss'],
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
    SpinnerComponent,
  ],
})
export class SecurityPage {
  form = new FormGroup({
    password: new FormControl(''),
  });
  constructor(
    public auth: AuthService,
    private haptics: HapticsService,
  ) {}

  async updatePassword() {
    const { password } = this.form.value;
    if (!password) return;

    try {
      await this.auth.updatePassword(password);
    } catch (error) {
      console.error(error);
    }
  }

  async deleteUser() {
    await this.haptics.notify({ type: NotificationType.Warning });
    await this.auth.deleteUser();
  }
}
