import { Injectable } from '@angular/core';
import {
  Haptics,
  ImpactOptions,
  NotificationOptions,
  VibrateOptions,
} from '@capacitor/haptics';
import { AppComponent } from 'src/app/app.component';

@Injectable({
  providedIn: 'root',
})
export class HapticsService {
  constructor(private app: AppComponent) {}

  async impact(options?: ImpactOptions) {
    if (this.isNative()) Haptics.impact(options);
  }

  async notify(options?: NotificationOptions) {
    if (this.isNative()) Haptics.notification(options);
  }

  async vibrate(options?: VibrateOptions) {
    if (this.isNative()) Haptics.vibrate(options);
  }

  isNative() {
    return this.app.device() !== 'web';
  }
}
