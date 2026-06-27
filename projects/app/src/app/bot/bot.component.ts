import {
  AsyncPipe,
  DatePipe,
  DecimalPipe,
  TitleCasePipe,
} from '@angular/common';
import { Component, computed, effect, signal } from '@angular/core';
import { ToastOptions } from '@ionic/angular/standalone';
import { SpinnerComponent } from '../spinner/spinner.component';
import { AuthService } from '../services/auth/auth.service';
import { HapticsService } from '../services/haptics/haptics.service';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { ToastService } from '../services/toast/toast.service';
import { AppComponent } from '../app.component';
import { AblyService } from '../services/ably/ably.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { addIcons } from 'ionicons';
import { radioOutline, powerOutline, informationCircle } from 'ionicons/icons';
import {
  IonList,
  IonItem,
  IonLabel,
  IonText,
  IonNote,
  IonButton,
  IonIcon,
  IonToggle,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-bot',
  templateUrl: './bot.component.html',
  styleUrls: ['./bot.component.scss'],
  standalone: true,
  imports: [
    TitleCasePipe,
    DecimalPipe,
    DatePipe,
    SpinnerComponent,
    AsyncPipe,
    FormsModule,
    ReactiveFormsModule,
    IonList,
    IonItem,
    IonLabel,
    IonText,
    IonNote,
    IonButton,
    IonIcon,
    IonToggle,
  ],
})
export class BotComponent {
  form = signal(
    new FormGroup({
      onStart: new FormControl(),
      onStop: new FormControl(),
      onPing: new FormControl(),
    }),
  );
  notifications = computed(() => this.auth.settings()?.bot.notifications);
  constructor(
    public auth: AuthService,
    public app: AppComponent,
    private haptics: HapticsService,
    private firestore: Firestore,
    private toast: ToastService,
    private ably: AblyService,
  ) {
    addIcons({ radioOutline, powerOutline, informationCircle });
    effect(() => this.updateForm());
  }

  updateForm() {
    if (!this.auth.settings()) return;
    const { onStart, onStop, onPing } = this.notifications()!;
    this.form().patchValue({ onStart, onStop, onPing });
  }

  async impact() {
    await this.haptics.impact();
  }

  async updateNotifications() {
    const command = 'UPDATE_SETTINGS';
    const icon = 'checkmark';
    const message = 'Your settings have been updated.';
    const options: ToastOptions = { message, icon };
    const settings = { bot: { notifications: this.form()?.value } };
    const path = `settings/${this.auth.profile()?.uid}`;
    const ref = doc(this.firestore, path);

    await setDoc(ref, settings, { merge: true });
    await this.ably.sendUserSignal({ command, ...settings });
    this.toast.present(options);
    this.haptics.notify();
  }

  toggleBot() {
    this.impact();
    const { status } = this.auth.settings()?.bot!;
    if (status === 'running') this.stopBot();
    if (status === 'stopped') this.startBot();
  }

  pingBot() {
    this.impact();
    const options: ToastOptions = {
      message: `Contacting your bot...`,
      icon: 'information-circle',
    };
    this.toast.present(options);
    this.ably.sendUserSignal({ command: 'PING_BOT' });
  }

  private startBot() {
    const options: ToastOptions = {
      message: `Starting your bot...`,
      icon: 'information-circle',
    };
    this.toast.present(options);
    this.ably.sendUserSignal({ command: 'START_BOT' });
  }

  private stopBot() {
    const options: ToastOptions = {
      message: `Stopping your bot...`,
      icon: 'information-circle',
    };
    this.toast.present(options);
    this.ably.sendUserSignal({ command: 'STOP_BOT' });
  }
}
