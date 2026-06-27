import { Component, effect, signal } from '@angular/core';

import { AuthService } from '../services/auth/auth.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { UserRecord } from '../interfaces/user';
import { WelcomePanelComponent } from '../welcome-panel/welcome-panel.component';
import { UsersCardComponent } from '../users-card/users-card.component';
import { SignalsCardComponent } from '../signals-card/signals-card.component';
import { ActionsPanelComponent } from '../actions-panel/actions-panel.component';
import {
  Firestore,
  collection,
  collectionGroup,
  getCountFromServer,
  query,
  where,
} from '@angular/fire/firestore';
import { RouterLink } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    WelcomePanelComponent,
    UsersCardComponent,
    SignalsCardComponent,
    ActionsPanelComponent,
    RouterLink,
  ],
})
export class HomePage {
  users = signal<UserRecord[] | undefined>(undefined);
  userCount = signal<number>(0);
  activeSubscriptions = signal<number>(0);
  constructor(
    public app: AppComponent,
    public auth: AuthService,
    private firestore: Firestore,
  ) {
    effect(() => {
      if (this.auth.profile()) this.getStats();
    });
  }

  getStats() {
    this.getUserCount();
    this.getSubscriptionCount();
  }

  async getUserCount() {
    const c = collection(this.firestore, 'users');
    const q = query(c);
    this.userCount.set((await getCountFromServer(q)).data().count);
  }

  async getSubscriptionCount() {
    const c = collectionGroup(this.firestore, 'subscriptions');
    const w = where('status', '==', 'active');
    const q = query(c, w);
    this.activeSubscriptions.set((await getCountFromServer(q)).data().count);
  }
}
