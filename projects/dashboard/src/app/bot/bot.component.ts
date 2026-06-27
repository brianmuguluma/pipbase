import { Component, computed, effect, signal } from '@angular/core';
import { AppComponent } from '../app.component';
import { AuthService } from '../services/auth/auth.service';
import { TitleCasePipe } from '@angular/common';
import { AblyService } from '../services/ably/ably.service';
import { ToastService } from '../services/toast/toast.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-bot',
  templateUrl: './bot.component.html',
  styleUrls: ['./bot.component.scss'],
  standalone: true,
  imports: [TitleCasePipe, ReactiveFormsModule],
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
    public app: AppComponent,
    public auth: AuthService,
    private ably: AblyService,
    private toast: ToastService,
    private firestore: Firestore,
  ) {
    effect(() => this.updateForm());
  }

  updateForm() {
    if (!this.auth.settings()) return;
    const { onStart, onStop, onPing } = this.notifications()!;
    this.form().patchValue({ onStart, onStop, onPing });
  }

  async updateNotifications() {
    const command = 'UPDATE_SETTINGS';
    const message = 'Your settings have been updated.';
    const settings = { bot: { notifications: this.form()?.value } };
    const path = `settings/${this.auth.profile()?.uid}`;
    const ref = doc(this.firestore, path);

    await setDoc(ref, settings, { merge: true });
    await this.ably.sendSignal({ command, ...settings });

    this.toast.success(message);
  }

  toggleBot() {
    const { status } = this.auth.settings()?.bot!;
    if (status === 'running') this.stopBot();
    if (status === 'stopped') this.startBot();
  }

  private startBot() {
    this.toast.loading('Starting your bot...');
    this.ably.sendSignal({ command: 'START_BOT' });
  }

  private stopBot() {
    this.toast.loading('Stopping your bot...');
    this.ably.sendSignal({ command: 'STOP_BOT' });
  }
}
