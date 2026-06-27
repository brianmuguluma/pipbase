import { Injectable } from '@angular/core';
import { Realtime, Types } from 'ably';
import { environment } from 'src/environments/environment.example';
import {
  Firestore,
  addDoc,
  collection,
  serverTimestamp,
} from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';
import { AppComponent } from 'src/app/app.component';

@Injectable({
  providedIn: 'root',
})
export class AblyService {
  constructor(
    private app: AppComponent,
    private auth: AuthService,
    private firestore: Firestore,
  ) {}

  async sendSignal(data: any) {
    const options: Types.ClientOptions = { key: environment.ably };
    const client = new Realtime(options);
    const channel = client.channels.get(`signals`);
    await client.connection.once('connected');

    channel.publish(`signals`, data);
    channel.detach();
    await this.sendSignalToDb(data);
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
}
