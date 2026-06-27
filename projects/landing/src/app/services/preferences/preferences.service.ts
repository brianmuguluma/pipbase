import { Injectable } from '@angular/core';
import {
  Preferences,
  GetResult,
  GetOptions,
  SetOptions,
  RemoveOptions,
} from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class PreferencesService {
  constructor() {}

  async getValue(options: GetOptions): Promise<GetResult> {
    return await Preferences.get(options);
  }

  async setValue(options: SetOptions): Promise<void> {
    return await Preferences.set(options);
  }

  async clear(): Promise<void> {
    return await Preferences.clear();
  }

  async remove(options: RemoveOptions): Promise<void> {
    return await Preferences.remove(options);
  }
}
