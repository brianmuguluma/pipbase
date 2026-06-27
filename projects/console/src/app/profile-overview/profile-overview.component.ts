import { Component, effect, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AvatarComponent } from '../avatar/avatar.component';
import { AuthService } from '../services/auth/auth.service';
import { DecimalPipe } from '@angular/common';
import {
  Firestore,
  collection,
  getCountFromServer,
  query,
  where,
} from '@angular/fire/firestore';

@Component({
  selector: 'app-profile-overview',
  templateUrl: './profile-overview.component.html',
  styleUrls: ['./profile-overview.component.scss'],
  standalone: true,
  imports: [RouterLink, AvatarComponent, DecimalPipe],
})
export class ProfileOverviewComponent {
  signalCount = signal<number>(0);
  orderCount = signal<number>(0);
  constructor(
    public auth: AuthService,
    private firestore: Firestore,
  ) {
    effect(() => {
      if (this.auth.profile()) {
        this.getSignalCount();
        this.getOrderCount();
      }
    });
  }

  async getSignalCount() {
    const c = collection(this.firestore, 'signals');
    const w = where('user.uid', '==', this.auth.profile()?.uid);
    const q = query(c, w);
    this.signalCount.set((await getCountFromServer(q)).data().count);
  }

  async getOrderCount() {
    const c = collection(this.firestore, 'signals');
    const uid = where('user.uid', '==', this.auth.profile()?.uid);
    const order = where('command', '==', 'CREATE_ORDER');
    const q = query(c, uid, order);
    this.orderCount.set((await getCountFromServer(q)).data().count);
  }
}
