import { Injectable } from '@angular/core';
import { Functions, httpsCallable } from '@angular/fire/functions';

@Injectable({
  providedIn: 'root',
})
export class VultrService {
  constructor(private functions: Functions) {}

  async getAccountInfo(data: any) {
    return await httpsCallable(this.functions, 'getAccountInfo')(data);
  }

  async listInstances(data: any) {
    return await httpsCallable(this.functions, 'listInstances')(data);
  }

  async getInstance(data: any) {
    return await httpsCallable(this.functions, 'getInstance')(data);
  }

  async reinstallInstance(data: any) {
    return await httpsCallable(this.functions, 'reinstallInstance')(data);
  }
}
