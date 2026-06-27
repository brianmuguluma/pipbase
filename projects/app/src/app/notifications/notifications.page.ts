import { Component, computed, effect, signal } from '@angular/core';

import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonItem,
  IonText,
  IonTitle,
  IonToggle,
  IonToolbar,
  IonButtons,
  IonBackButton,
} from '@ionic/angular/standalone';
import { AuthService } from '../services/auth/auth.service';
import { AppComponent } from '../app.component';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { HapticsService } from '../services/haptics/haptics.service';
import { ToastService } from '../services/toast/toast.service';
import { AblyService } from '../services/ably/ably.service';
import { ImpactStyle } from '@capacitor/haptics';
import { SpinnerComponent } from '../spinner/spinner.component';
import { addIcons } from 'ionicons';
import { checkmarkCircle } from 'ionicons/icons';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
  standalone: true,
  imports: [
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonText,
    IonItem,
    IonToggle,
    IonButton,
    IonCard,
    IonCardContent,
    ReactiveFormsModule,
    SpinnerComponent,
  ],
})
export class NotificationsPage {
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
    public app: AppComponent,
    private firestore: Firestore,
    private haptics: HapticsService,
    private toast: ToastService,
    private ably: AblyService,
  ) {
    addIcons({ checkmarkCircle });
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

  async impact() {
    await this.haptics.impact({ style: ImpactStyle.Heavy });
  }

  async updateNotifications() {
    const command = 'UPDATE_SETTINGS';
    const settings: any = { oanda: { notifications: this.form()?.value } };
    const ref = doc(this.firestore, `settings/${this.auth.profile()?.uid}`);

    await setDoc(ref, settings, { merge: true });
    await this.ably.sendUserSignal({ command, settings });

    this.toast.present({
      message: 'Your settings have been updated',
      icon: 'checkmark-circle',
    });
  }
}
