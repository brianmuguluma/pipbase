import { Injectable } from '@angular/core';
import { Functions, httpsCallable } from '@angular/fire/functions';

@Injectable({
  providedIn: 'root',
})
export class VultrService {
  constructor(private functions: Functions) {}

  async listInstances(data: any) {
    return await httpsCallable(this.functions, 'listInstances')(data);
  }

  async getInstance(data: any) {
    return await httpsCallable(this.functions, 'getInstance')(data);
  }

  async startInstance(data: any) {
    return await httpsCallable(this.functions, 'startInstance')(data);
  }

  async haltInstance(data: any) {
    return await httpsCallable(this.functions, 'haltInstance')(data);
  }

  async reinstallInstance(data: any) {
    return await httpsCallable(this.functions, 'reinstallInstance')(data);
  }
}
