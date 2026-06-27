import { Injectable } from '@angular/core';
import { Realtime, ClientOptions } from 'ably';
import { environment } from 'src/environments/environment.example';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AblyService {
  constructor(private auth: AuthService) {}

  async sendSignal(data: any) {
    const options: ClientOptions = { key: environment.ably };
    const { channels, connection } = new Realtime(options);
    const channel = channels.get(`signals`);
    await connection.once('connected');

    channel.publish(this.auth.profile()?.uid!, data);
    channel.detach();
  }
}
