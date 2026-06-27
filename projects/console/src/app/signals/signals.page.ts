import { Component, OnInit, computed, signal } from '@angular/core';
import { DatePipe, DecimalPipe, TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormatRelativePipe } from '../pipes/format-relative/format-relative.pipe';
import {
  DocumentData,
  Firestore,
  QuerySnapshot,
  collection,
  getCountFromServer,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from '@angular/fire/firestore';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { NoCasePipe } from '../pipes/no-case/no-case.pipe';
import { AuthService } from '../services/auth/auth.service';
import { Signal } from '../interfaces/signal';
import { ActionsPanelComponent } from '../actions-panel/actions-panel.component';

@Component({
  selector: 'app-signals',
  templateUrl: './signals.page.html',
  styleUrls: ['./signals.page.scss'],
  standalone: true,
  imports: [
    RouterLink,
    FormatRelativePipe,
    NavbarComponent,
    FooterComponent,
    TitleCasePipe,
    NoCasePipe,
    FormatRelativePipe,
    DecimalPipe,
    DatePipe,
    ActionsPanelComponent,
  ],
})
export class SignalsPage implements OnInit {
  signals = signal<Signal[] | undefined>([]);
  limit = signal(10);
  query = signal<QuerySnapshot<DocumentData> | undefined>(undefined);
  signalCount = signal<number>(0);
  userSignalCount = signal<number>(0);
  isEnd = computed(() => this.computeIsEnd());
  constructor(
    private firestore: Firestore,
    private auth: AuthService,
  ) {}

  ngOnInit() {
    this.getSignals();
    this.getSignalCount();
    this.getUserSignalCount();
  }

  computeIsEnd() {
    return this.signalCount() === this.signals()?.length;
  }

  getCollection() {
    return collection(this.firestore, 'signals');
  }

  async getSignalCount() {
    const c = this.getCollection();
    const q = query(c);
    this.signalCount.set((await getCountFromServer(q)).data().count);
  }

  async getUserSignalCount() {
    const c = this.getCollection();
    const w = where('user.uid', '==', this.auth.profile()?.uid);
    const q = query(c, w);
    this.userSignalCount.set((await getCountFromServer(q)).data().count);
  }

  async getSignals() {
    const c = this.getCollection();
    const o = orderBy('createdAt', 'desc');
    const l = limit(this.limit());
    const q = query(c, o, l);
    const docs = await getDocs(q);
    this.query.set(docs);

    const x: any[] = [];
    if (docs.size) {
      this.signals.set([]);
      docs.docs.forEach((d) => {
        if (d.exists()) x.push({ id: d.id, ...d.data() });
      });
    }
    this.signals.set([...x]);
  }

  async loadSignals(event?: CustomEvent) {
    const c = this.getCollection();
    const o = orderBy('createdAt', 'desc');
    const s = startAfter(this.query()?.docs[this.query()?.docs?.length! - 1]);
    const l = limit(this.limit());
    const q = query(c, o, s, l);
    const docs = await getDocs(q);
    this.query.set(docs);

    const x: any[] = [];
    if (docs.size) {
      docs.docs.forEach((d) => {
        if (d.exists()) x.push({ id: d.id, ...d.data() });
      });
    }

    this.signals.set([...this.signals()!, ...x]);

    // this.signals.mutate((values) => values?.push(...x));

    // (event as InfiniteScrollCustomEvent)?.target?.complete();
  }
}
