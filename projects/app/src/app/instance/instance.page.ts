import { Component, computed, effect, input, signal } from '@angular/core';
import { RefresherEventDetail } from '@ionic/angular/standalone';
import { VultrService } from '../services/vultr/vultr.service';
import { Instance, Region, Regions } from '../interfaces/vultr';
import { regions } from '../regions';
import { AuthService } from '../services/auth/auth.service';
import { SpinnerComponent } from '../spinner/spinner.component';
import { InstanceDetailsComponent } from '../instance-details/instance-details.component';
import { ErrorComponent } from '../error/error.component';
import { UsersService } from '../services/users/users.service';
import { UserRecord } from '../interfaces/user';
import { UserCardComponent } from '../user-card/user-card.component';
import { addIcons } from 'ionicons';
import { alertCircle, terminal } from 'ionicons/icons';
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
} from '@ionic/angular/standalone';
import { BrowserService } from '../services/browser/browser.service';
import { ToastService } from '../services/toast/toast.service';

@Component({
  selector: 'app-instance-page',
  templateUrl: './instance.page.html',
  styleUrls: ['./instance.page.scss'],
  standalone: true,
  imports: [
    SpinnerComponent,
    InstanceDetailsComponent,
    ErrorComponent,
    UserCardComponent,
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
  ],
})
export class InstancePage {
  id = input<string>();
  instance = signal<Instance | undefined>(undefined);
  regions = signal<Regions>(regions);
  region = computed<Region>(() => this.computeRegion());
  user = signal<UserRecord | undefined>(undefined);
  constructor(
    private auth: AuthService,
    private vultr: VultrService,
    private users: UsersService,
    private browser: BrowserService,
    private toast: ToastService,
  ) {
    effect(() => {
      if (auth.profile()?.uid) this.getInstance();
    });
    addIcons({ terminal, alertCircle });
  }

  async getInstance() {
    try {
      const response = await this.vultr.getInstance({
        parameters: {
          'instance-id': this.id(),
        },
      });
      if ((response?.data as any)?.instance) {
        this.instance.set((response?.data as any)?.instance);
        this.getUser();
      }
    } catch (error) {
      console.error(error);
    }
  }

  async refresh(event: CustomEvent<RefresherEventDetail>) {
    await this.getInstance();
    event.detail.complete();
  }

  computeRegion() {
    return this.regions().regions.filter(
      (region) => region.id === this.instance()?.region,
    )[0];
  }

  async getUser() {
    const { data } = await this.users.getUser({ uid: this.instance()?.label });
    this.user.set(data as UserRecord);
  }

  async openBrowser() {
    const { kvm } = this.instance()!;
    if (!kvm)
      return this.toast.present({
        icon: 'alert-circle',
        message: 'Web console unavailable',
      });

    await this.browser.open({ url: kvm! });
  }
}
