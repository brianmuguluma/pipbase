import { Injectable } from '@angular/core';
import {
  Analytics,
  ConsentSettings,
  setConsent,
  setUserId,
  setUserProperties,
  CustomParams,
  AnalyticsCallOptions,
} from '@angular/fire/analytics';
import { PreferencesService } from '../preferences/preferences.service';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  constructor(
    private preferences: PreferencesService,
    private analytics: Analytics,
  ) {}

  setEnabled(options: ConsentSettings) {
    setConsent(options);
    this.preferences.setValue({
      key: 'consent',
      value: options.analytics_storage!,
    });
  }

  setUserId(uid: string | null) {
    return setUserId(this.analytics, uid);
  }

  async setUserProperty(
    properties: CustomParams,
    options?: AnalyticsCallOptions,
  ) {
    return setUserProperties(this.analytics, properties, options);
  }
}
