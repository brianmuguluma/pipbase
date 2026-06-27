import { Injectable } from '@angular/core';
import { ConsentSettings, setConsent } from '@angular/fire/analytics';
import { PreferencesService } from '../preferences/preferences.service';

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  constructor(private preferences: PreferencesService) {}

  async setConsent(options: ConsentSettings) {
    setConsent(options);
    await this.preferences.setValue({
      key: 'consent',
      value: options.analytics_storage!,
    });
  }
}
