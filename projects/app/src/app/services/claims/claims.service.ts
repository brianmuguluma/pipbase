import { Injectable } from '@angular/core';
import { Functions, httpsCallable } from '@angular/fire/functions';

@Injectable({
  providedIn: 'root',
})
export class ClaimsService {
  constructor(private functions: Functions) {}

  async setCustomUserClaims(data: any) {
    return await httpsCallable(this.functions, 'setCustomUserClaims')(data);
  }
}
