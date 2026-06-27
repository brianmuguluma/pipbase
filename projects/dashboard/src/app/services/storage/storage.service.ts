import { Injectable } from '@angular/core';
import {
  deleteObject,
  getDownloadURL,
  ref,
  Storage,
  uploadString,
} from '@angular/fire/storage';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(
    private auth: AuthService,
    private storage: Storage,
  ) {}

  private getRef() {
    const { uid } = this.auth.profile()!;
    return ref(this.storage, `users/${uid}/${uid}`);
  }

  async uploadString(value: string, format: any = 'data_url') {
    return await uploadString(this.getRef(), value, format);
  }

  async getDownloadURL() {
    return await getDownloadURL(this.getRef());
  }

  async deleteObject() {
    return await deleteObject(this.getRef());
  }
}
