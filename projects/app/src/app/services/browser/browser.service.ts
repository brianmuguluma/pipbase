import { Injectable } from '@angular/core';
import { Browser, OpenOptions } from '@capacitor/browser';

@Injectable({
  providedIn: 'root',
})
export class BrowserService {
  constructor() {}

  async open(options: OpenOptions) {
    await Browser.open({ ...options, presentationStyle: 'popover' });
  }
}
