import { Injectable } from '@angular/core';
import { ToastService } from '../toast/toast.service';
import { HapticsService } from '../haptics/haptics.service';
import { AuthService } from '../auth/auth.service';
import { NotificationType } from '@capacitor/haptics';
import { ClientOptions, Realtime } from 'ably';
import { environment } from 'src/environments/environment.example';
import {
  Firestore,
  addDoc,
  collection,
  serverTimestamp,
} from '@angular/fire/firestore';
import { AppComponent } from 'src/app/app.component';

@Injectable({
  providedIn: 'root',
})
export class AblyService {
  constructor(
    private app: AppComponent,
    private auth: AuthService,
    private toast: ToastService,
    private haptics: HapticsService,
    private firestore: Firestore,
  ) {}

  async sendSignal(data: any) {
    try {
      const options: ClientOptions = { key: environment.ably };
      const client = new Realtime(options);
      const channel = client.channels.get(`signals`);
      await client.connection.once('connected');

      channel.publish(`signals`, data);
      channel.detach();
      await this.sendSignalToDb(data);

      await this.haptics.notify({ type: NotificationType.Success });
      await this.toast.present({
        icon: 'checkmark',
        message: 'Signal has been sent successfully.',
      });
    } catch (error) {
      await this.haptics.notify({ type: NotificationType.Error });
      // await this.toast.present({
      //   icon: 'checkmark',
      //   message: 'Unable to send signal',
      // });
      return;
    }
  }

  private async sendSignalToDb(data: any) {
    const { uid, displayName, photoURL } = this.auth.profile()!;
    return await addDoc(collection(this.firestore, 'signals'), {
      ...data,
      occupancy: this.app.occupancy()!,
      user: { uid, displayName, photoURL },
      createdAt: serverTimestamp(),
    });
  }

  async sendUserSignal(data: any) {
    try {
      const options: ClientOptions = { key: environment.ably };
      const { channels, connection } = new Realtime(options);
      const channel = channels.get(`signals`);
      await connection.once('connected');

      channel.publish(this.auth.profile()?.uid!, data);
      channel.detach();
    } catch (error) {
      await this.haptics.notify({ type: NotificationType.Error });
      // await this.toast.present({
      //   icon: 'checkmark',
      //   message: 'Unable to send signal',
      // });
      return;
    }
  }
}
