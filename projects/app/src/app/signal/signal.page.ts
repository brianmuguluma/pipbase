import { Component, OnInit, input, signal } from '@angular/core';
import {
  RefresherEventDetail,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonRefresher,
  IonRefresherContent,
  IonList,
  IonItem,
  IonLabel,
  IonText,
  IonCard,
  IonCardContent,
} from '@ionic/angular/standalone';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import {
  DatePipe,
  DecimalPipe,
  PercentPipe,
  TitleCasePipe,
} from '@angular/common';
import { NoCasePipe } from '../pipes/no-case/no-case.pipe';
import { SpinnerComponent } from '../spinner/spinner.component';
import { SlashPipe } from '../pipes/slash/slash.pipe';
import { UserCardComponent } from '../user-card/user-card.component';
import { UserRecord } from '../interfaces/user';
import { UsersService } from '../services/users/users.service';

@Component({
  selector: 'app-signal',
  templateUrl: './signal.page.html',
  styleUrls: ['./signal.page.scss'],
  standalone: true,
  imports: [
    NoCasePipe,
    TitleCasePipe,
    SpinnerComponent,
    DecimalPipe,
    SlashPipe,
    PercentPipe,
    DatePipe,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    IonRefresher,
    IonRefresherContent,
    IonList,
    IonItem,
    IonLabel,
    IonText,
    IonCard,
    IonCardContent,
    UserCardComponent,
  ],
})
export class SignalPage implements OnInit {
  id = input<string>();
  signal = signal<any | undefined>(undefined);
  user = signal<UserRecord | undefined>(undefined);
  constructor(
    private firestore: Firestore,
    private users: UsersService,
  ) {}

  async ngOnInit() {
    await this.getSignal();
    await this.getUser();
  }

  async getSignal() {
    const signal = await getDoc(doc(this.firestore, `signals/${this.id()}`));
    if (signal.exists()) this.signal.set(signal.data());
  }

  async getUser() {
    const { uid } = this.signal()?.user;
    const { data } = await this.users.getUser({ uid });
    this.user.set(data as UserRecord);
  }

  async refresh(event: CustomEvent<RefresherEventDetail>) {
    await this.getSignal();
    event.detail.complete();
  }
}
