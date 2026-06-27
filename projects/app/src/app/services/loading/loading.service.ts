import { Injectable, signal } from '@angular/core';
import { LoadingController, LoadingOptions } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  loading = signal<HTMLIonLoadingElement | undefined>(undefined);
  constructor(private loadingController: LoadingController) {}

  async present(options: LoadingOptions = {}) {
    if (!options.translucent) options.translucent = true;
    this.loading.set(await this.loadingController.create(options));
    await this.loading()?.present();
  }

  async dismiss() {
    await this.loading()?.dismiss();
  }
}
