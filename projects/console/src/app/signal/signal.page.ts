import { Component, OnInit, input, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { SpinnerComponent } from '../spinner/spinner.component';
import { FooterComponent } from '../footer/footer.component';
import { Signal } from '../interfaces/signal';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { UsersService } from '../services/users/users.service';
import { UserRecord } from '../interfaces/user';
import { UserCardComponent } from '../user-card/user-card.component';
import { SignalUpdatePage } from '../signal-update/signal-update.page';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-signal',
  templateUrl: './signal.page.html',
  styleUrls: ['./signal.page.scss'],
  standalone: true,
  imports: [
    NavbarComponent,
    SpinnerComponent,
    FooterComponent,
    UserCardComponent,
    DatePipe,
  ],
})
export class SignalPage implements OnInit {
  id = input<string>();
  data = signal<Signal | undefined>(undefined);
  user = signal<UserRecord | undefined>(undefined);
  constructor(
    public auth: AuthService,
    private firestore: Firestore,
    private users: UsersService,
  ) {}

  ngOnInit() {
    this.getSignal();
  }

  async getSignal() {
    const x = await getDoc(doc(this.firestore, `signals/${this.id()}`));
    if (x.exists()) this.data.set({ id: x.id, ...x.data() } as Signal);
    await this.getUser();
  }

  async getUser() {
    const { data } = await this.users.getUser({ uid: this.data()?.user?.uid });
    this.user.set(data as UserRecord);
  }

  async updateSignal() {
    // const modal = await this.modalController.create({
    //     component: SignalUpdatePage,
    //     componentProps: { data: this.data() },
    // });
    // await modal.present();
    // await modal.onDidDismiss();
    // await this.getSignal();
  }
}
