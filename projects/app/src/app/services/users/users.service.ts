import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionGroup,
  getCountFromServer,
  query,
  where,
} from '@angular/fire/firestore';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { ListUsersResult } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(
    private functions: Functions,
    private firestore: Firestore,
  ) {}

  async listUsers(data: any) {
    return await httpsCallable<ListUsersResult>(
      this.functions,
      'listUsers',
    )(data);
  }

  async getUser(data: any) {
    return await httpsCallable(this.functions, 'getUser')(data);
  }

  async updateUser(data: any) {
    return await httpsCallable(this.functions, 'updateUser')(data);
  }

  async getUserCount() {
    const c = collection(this.firestore, 'users');
    const q = query(c);
    return (await getCountFromServer(q)).data().count;
  }

  async getSubscriberCount() {
    const c = collectionGroup(this.firestore, 'subscriptions');
    const w = where('status', '==', 'active');
    const q = query(c, w);
    return (await getCountFromServer(q)).data().count;
  }
}
