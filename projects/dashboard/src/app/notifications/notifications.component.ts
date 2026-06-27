import { Component, computed, effect, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { ToastService } from '../services/toast/toast.service';
import { AblyService } from '../services/ably/ably.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
})
export class NotificationsComponent {
  form = signal(
    new FormGroup({
      orders: new FormGroup({
        ordersCancelled: new FormControl(),
        ordersCreated: new FormControl(),
        ordersFilled: new FormControl(),
        ordersTriggered: new FormControl(),
      }),
      trades: new FormGroup({
        tradesClosed: new FormControl(),
        tradesOpened: new FormControl(),
        tradesReduced: new FormControl(),
      }),
    }),
  );

  notifications = computed(() => this.auth.settings()?.oanda.notifications);
  orders = computed(() => this.notifications()?.orders);
  trades = computed(() => this.notifications()?.trades);
  constructor(
    public auth: AuthService,
    private firestore: Firestore,
    private toast: ToastService,
    private ably: AblyService,
  ) {
    effect(() => this.updateForm());
  }

  updateForm() {
    if (!this.auth.settings()) return;

    const { orders, trades } = this.notifications()!;

    const { ordersCancelled, ordersCreated, ordersFilled, ordersTriggered } =
      orders;
    const { tradesClosed, tradesOpened, tradesReduced } = trades;

    this.form().patchValue({
      orders: {
        ordersCancelled,
        ordersCreated,
        ordersFilled,
        ordersTriggered,
      },
      trades: { tradesClosed, tradesOpened, tradesReduced },
    });
  }

  async updateNotifications() {
    const command = 'UPDATE_SETTINGS';
    const settings: any = { oanda: { notifications: this.form()?.value } };
    const ref = doc(this.firestore, `settings/${this.auth.profile()?.uid}`);

    await setDoc(ref, settings, { merge: true });
    await this.ably.sendSignal({ command, settings });

    this.toast.success('Your settings have been updated');
  }
}
