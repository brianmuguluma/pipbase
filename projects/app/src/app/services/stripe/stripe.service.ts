import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  onSnapshot,
} from '@angular/fire/firestore';
import {
  Functions,
  getFunctions,
  httpsCallable,
} from '@angular/fire/functions';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class StripeService {
  constructor(
    private functions: Functions,
    private firestore: Firestore,
    private auth: AuthService,
  ) {}

  async retrieveCustomer(data: any) {
    return await httpsCallable(this.functions, 'retrieveCustomer')(data);
  }

  async updateCustomer(data: any) {
    return await httpsCallable(this.functions, 'updateCustomer')(data);
  }

  async listPrices(data: any) {
    return await httpsCallable(this.functions, 'listPrices')(data);
  }

  async createPortalLink(params: any) {
    const functions = getFunctions(this.functions.app, 'europe-west2');
    return await httpsCallable(
      functions,
      'ext-firestore-stripe-payments-createPortalLink',
    )(params);
  }

  async createCheckoutSession(price: string) {
    const snapshot = await addDoc(
      collection(
        this.firestore,
        `users/${this.auth.profile()?.uid}/checkout_sessions`,
      ),
      {
        price,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      },
    );
    onSnapshot(snapshot, (snap) => {
      const { error, url } = snap.data()!;
      if (error) {
        // Show an error to your customer and
        // inspect your Cloud Function logs in the Firebase console.
        alert(`An error occured: ${error.message}`);
      }
      if (url) {
        // We have a Stripe Checkout URL, let's redirect.
        window.location.assign(url);
      }
    });
  }
}
