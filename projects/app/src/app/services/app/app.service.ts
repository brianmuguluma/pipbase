import { Injectable } from '@angular/core';
import { App } from '@capacitor/app';
import { AppComponent } from 'src/app/app.component';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private app: AppComponent) {}

  async getInfo() {
    try {
      if (this.isNative()) return await App.getInfo();
      return;
    } catch (error) {
      return;
    }
  }

  isNative() {
    return this.app.device() !== 'web';
  }
}
