import { Injectable } from '@angular/core';
import {
  Camera,
  CameraResultType,
  ImageOptions,
  Photo,
} from '@capacitor/camera';

@Injectable({
  providedIn: 'root',
})
export class CameraService {
  constructor() {}

  async getPhoto(): Promise<Photo | undefined> {
    try {
      let options: ImageOptions = {
        resultType: CameraResultType.DataUrl,
        correctOrientation: true,
        quality: 100,
        saveToGallery: true,
      };
      return await Camera.getPhoto(options);
    } catch (e) {
      return;
      // this.error.present('Error', e);
    }
  }
}
