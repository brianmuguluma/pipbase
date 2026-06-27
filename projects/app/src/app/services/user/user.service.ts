import { Injectable } from '@angular/core';
import { Functions, httpsCallable } from '@angular/fire/functions';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private functions: Functions) {}

  async listUsers(data: any) {
    return await httpsCallable(this.functions, 'listUsers')(data);
  }

  async getUser(data: any) {
    return await httpsCallable(this.functions, 'getUser')(data);
  }

  async getUserByEmail(data: any) {
    return await httpsCallable(this.functions, 'getUserByEmail')(data);
  }

  async updateUser(data: any) {
    return await httpsCallable(this.functions, 'updateUser')(data);
  }
}
