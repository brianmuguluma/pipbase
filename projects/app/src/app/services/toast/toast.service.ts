import { Injectable } from '@angular/core';
import { ToastController, ToastOptions } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastController: ToastController) {}

  async present(options: ToastOptions = {}) {
    if (!options.position) options.position = 'bottom';
    if (!options.duration) options.duration = 5000;
    if (!options.color) options.color = 'dark';
    const toast = await this.toastController.create(options);
    toast.present();
  }
}
