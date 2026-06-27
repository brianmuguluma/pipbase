import { Injectable } from '@angular/core';
import {
  FirebaseAnalytics,
  LogEventOptions,
  SetCurrentScreenOptions,
  SetUserIdOptions,
  SetUserPropertyOptions,
} from '@capacitor-firebase/analytics';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  constructor() {}

  async setUserId(options: SetUserIdOptions) {
    return await FirebaseAnalytics.setUserId(options);
  }

  async setCurrentScreen(options: SetCurrentScreenOptions) {
    return await FirebaseAnalytics.setCurrentScreen(options);
  }

  async setUserProperty(options: SetUserPropertyOptions) {
    return await FirebaseAnalytics.setUserProperty(options);
  }

  async logEvent(options: LogEventOptions) {
    return await FirebaseAnalytics.logEvent(options);
  }
}
