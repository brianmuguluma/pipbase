import { Injectable } from '@angular/core';
import { Network } from '@capacitor/network';
import { ToastOptions } from '@ionic/angular/standalone';
import { ToastService } from '../toast/toast.service';
import { addIcons } from 'ionicons';
import { informationCircle } from 'ionicons/icons';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  constructor(private toast: ToastService) {
    addIcons({ informationCircle });
  }

  addListener() {
    Network.addListener('networkStatusChange', (status) => {
      if (!status.connected) {
        const options: ToastOptions = {
          message: 'No internet connection',
          icon: 'information-circle',
        };
        this.toast.present(options);
      }
    });
  }

  async getStatus() {
    const { connected } = await Network.getStatus();
    if (!connected) {
      const options: ToastOptions = {
        message: 'No internet connection',
        icon: 'information-circle',
      };
      this.toast.present(options);
    }
  }
}
