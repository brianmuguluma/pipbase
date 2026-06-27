import { Component, OnInit, computed, signal } from '@angular/core';
import { DatePipe, TitleCasePipe } from '@angular/common';
import {
  AlertController,
  RefresherEventDetail,
} from '@ionic/angular/standalone';
import { SpinnerComponent } from '../spinner/spinner.component';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { FormatRelativePipe } from '../pipes/format-relative/format-relative.pipe';
import { User, UserRecord } from '../interfaces/user';
import { Instance, Instances, Region, Regions } from '../interfaces/vultr';
import { regions } from '../regions';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { UserService } from '../services/user/user.service';
import { ToastService } from '../services/toast/toast.service';
import { LoadingService } from '../services/loading/loading.service';
import { HapticsService } from '../services/haptics/haptics.service';
import { NotificationType } from '@capacitor/haptics';
import { AvatarComponent } from '../avatar/avatar.component';
import { ErrorComponent } from '../error/error.component';
import { capitalCase } from 'change-case';
import { addIcons } from 'ionicons';
import { checkmarkCircle } from 'ionicons/icons';
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
  IonText,
  IonList,
  IonItem,
  IonLabel,
  IonNote,
} from '@ionic/angular/standalone';
import { BrowserService } from '../services/browser/browser.service';
import { InstanceCardComponent } from '../instance-card/instance-card.component';
import { VultrService } from '../services/vultr/vultr.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
  standalone: true,
  imports: [
    SpinnerComponent,
    FormatRelativePipe,
    DatePipe,
    TitleCasePipe,
    AvatarComponent,
    ErrorComponent,
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
    IonText,
    IonList,
    IonItem,
    IonLabel,
    IonNote,
    InstanceCardComponent,
  ],
})
export class UserPage implements OnInit {
  uid = signal<string | undefined | null>(undefined);
  user = signal<User | undefined>(undefined);
  userRecord = signal<UserRecord | undefined>(undefined);
  instances = signal<Instances | undefined>(undefined);
  instance = computed<Instance | undefined>(() => this.computeInstance());
  constructor(
    public auth: AuthService,
    private route: ActivatedRoute,
    private users: UserService,
    private firestore: Firestore,
    private toast: ToastService,
    private vultr: VultrService,
    private loading: LoadingService,
    private haptics: HapticsService,
    private browser: BrowserService,
    private alertController: AlertController,
  ) {
    this.uid.set(this.route.snapshot.paramMap.get('uid'));
    addIcons({ checkmarkCircle });
  }

  ngOnInit() {
    this.getUser();
    this.getUserFromFirestore();
    this.getInstance();
  }

  async refresh(event: CustomEvent<RefresherEventDetail>) {
    await this.getUser();
    event.detail.complete();
  }

  async getUserFromFirestore() {
    const user = await getDoc(doc(this.firestore, `users/${this.uid()}`));
    if (user.exists()) {
      this.user.set(user.data() as User);
    }
  }

  async getUser() {
    const { data } = await this.users.getUser({ uid: this.uid() });
    this.userRecord.set(data as UserRecord);
  }

  async updateUser() {
    await this.haptics.impact();
    await this.loading.present();
    await this.disableUser();
    await this.loading.dismiss();
  }

  async disableUser() {
    const user = await this.users.updateUser({
      uid: this.uid(),
      properties: { disabled: !this.userRecord()?.disabled },
    });
    if (user?.data) {
      await this.toast.present({
        icon: 'checkmark',
        message: 'User has been updated.',
      });
      this.userRecord.set(user?.data as UserRecord);
      this.haptics.notify({ type: NotificationType.Success });
    }
    if (!user?.data) {
      await this.toast.present({
        icon: 'alert-circle-outline',
        message: 'Unable to update user.',
      });
      this.haptics.notify({ type: NotificationType.Error });
    }
  }

  async confirmUpdateUser() {
    await this.haptics.notify({ type: NotificationType.Warning });
    const { disabled } = this.userRecord()!;
    const action = capitalCase(disabled ? 'enable' : 'disable');
    const alert = await this.alertController.create({
      header: `${action} User`,
      message: `Are you sure you want to ${action.toLowerCase()} this user?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: `${action}`,
          role: !disabled ? 'destructive' : undefined,
          handler: () => this.updateUser(),
        },
      ],
    });

    await alert.present();
  }

  computeInstance() {
    return this.instances()?.instances[0];
  }

  async getInstance() {
    try {
      const parameters = { label: this.uid() };
      const { data } = await this.vultr.listInstances({ parameters });
      this.instances.set(data as Instances);
    } catch (error) {
      console.error(error);
    }
  }

  async openBrowser() {
    const { stripeLink } = this.user()!;
    if (!stripeLink)
      return this.toast.present({
        icon: 'alert-circle',
        message: 'Stripe unavailable',
      });

    await this.browser.open({ url: stripeLink! });
  }
}
