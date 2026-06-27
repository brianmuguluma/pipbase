import { Component, OnInit, computed, signal } from '@angular/core';
import { DecimalPipe, TitleCasePipe } from '@angular/common';
import {
  InfiniteScrollCustomEvent,
  RefresherEventDetail,
} from '@ionic/angular/standalone';
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
} from '@angular/fire/firestore';
import { NoCasePipe } from '../pipes/no-case/no-case.pipe';
import { Signal } from '../interfaces/signal';
import { SignalService } from '../services/signals/signals.service';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ItemSkeletonComponent } from '../item-skeleton/item-skeleton.component';
import { SignalItemComponent } from '../signal-item/signal-item.component';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonButton,
  IonIcon,
  IonContent,
  IonRefresher,
  IonRefresherContent,
  IonList,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-signals',
  templateUrl: './signals.page.html',
  styleUrls: ['./signals.page.scss'],
  standalone: true,
  imports: [
    RouterLink,
    FormatRelativePipe,
    TitleCasePipe,
    NoCasePipe,
    FormatRelativePipe,
    DecimalPipe,
    ScrollingModule,
    ItemSkeletonComponent,
    SignalItemComponent,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonButton,
    IonIcon,
    IonContent,
    IonRefresher,
    IonRefresherContent,
    IonList,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
  ],
})
export class SignalsPage implements OnInit {
  signals = signal<Signal[] | undefined>([]);
  limit = signal(10);
  query = signal<QuerySnapshot<DocumentData> | undefined>(undefined);
  signalCount = signal<number>(0);
  isEnd = computed(() => this.computeIsEnd());
  constructor(
    private firestore: Firestore,
    private signalService: SignalService,
  ) {
    addIcons({ add });
  }

  ngOnInit() {
    this.getSignals();
    this.getSignalCount();
  }

  createSignal() {
    this.signalService.getSignals();
  }

  async getSignalCount() {
    const c = this.getCollection();
    const q = query(c);
    this.signalCount.set((await getCountFromServer(q)).data().count);
  }

  computeIsEnd() {
    return this.signalCount() === this.signals()?.length;
  }

  async getSignals() {
    const c = this.getCollection();
    const o = orderBy('createdAt', 'desc');
    const l = limit(this.limit());
    const q = query(c, o, l);
    const docs = await getDocs(q);
    this.query.set(docs);

    const signals: any[] = [];

    if (docs.size) {
      this.signals.set([]);
      docs.docs.forEach((d) => {
        if (d.exists()) signals.push({ id: d.id, ...d.data() });
      });
    }

    this.signals.set([...signals]);
  }

  getCollection() {
    return collection(this.firestore, 'signals');
  }

  async loadSignals(event?: CustomEvent<InfiniteScrollCustomEvent>) {
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

    (event as InfiniteScrollCustomEvent)?.target?.complete();
  }

  async refresh(event: CustomEvent<RefresherEventDetail>) {
    await this.getSignals();
    event.detail.complete();
  }
}
