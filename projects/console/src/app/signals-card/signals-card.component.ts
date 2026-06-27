import { TitleCasePipe } from '@angular/common';
import { Component, effect, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import {
  Firestore,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
} from '@angular/fire/firestore';
import { NoCasePipe } from '../pipes/no-case/no-case.pipe';

@Component({
  selector: 'app-signals-card',
  templateUrl: './signals-card.component.html',
  styleUrls: ['./signals-card.component.scss'],
  standalone: true,
  imports: [RouterLink, NoCasePipe, TitleCasePipe],
})
export class SignalsCardComponent {
  signals = signal<any[] | undefined>([]);
  limit = signal(4);
  constructor(
    private auth: AuthService,
    private firestore: Firestore,
  ) {
    effect(() => {
      if (this.auth.profile()) this.getSignals();
    });
  }

  async getSignals() {
    const c = collection(this.firestore, 'signals');
    const o = orderBy('createdAt', 'desc');
    const l = limit(this.limit());
    const q = query(c, o, l);
    const docs = await getDocs(q);

    const x: any[] = [];
    if (docs.size) {
      this.signals.set([]);
      docs.docs.forEach((d) => {
        if (d.exists()) x.push({ id: d.id, ...d.data() });
      });
    }
    this.signals.set([...x]);
  }
}
