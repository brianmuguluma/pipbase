import { Component, computed, effect, signal } from '@angular/core';

import {
  AlertController,
  InfiniteScrollCustomEvent,
  RefresherEventDetail,
} from '@ionic/angular/standalone';
import { AuthService } from '../services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormatRelativePipe } from '../pipes/format-relative/format-relative.pipe';
import { UserRecord } from '../interfaces/user';
import { UserService } from '../services/user/user.service';
import { ItemSkeletonComponent } from '../item-skeleton/item-skeleton.component';
import { UserItemComponent } from '../user-item/user-item.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { LoadingService } from '../services/loading/loading.service';
import { ToastService } from '../services/toast/toast.service';
import { addIcons } from 'ionicons';
import { search } from 'ionicons/icons';
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
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
  standalone: true,
  imports: [
    RouterLink,
    FormatRelativePipe,
    ItemSkeletonComponent,
    UserItemComponent,
    ScrollingModule,
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
export class UsersPage {
  users = signal<UserRecord[]>([]);
  userCount = signal<number>(0);
  subscriberCount = signal<number>(0);
  pageToken = signal<string | undefined>('');
  maxResults = signal(20);
  isEnd = computed(() => this.computeIsEnd());
  constructor(
    public auth: AuthService,
    private user: UserService,
    private alertController: AlertController,
    private loading: LoadingService,
    private router: Router,
    private toast: ToastService,
  ) {
    effect(() => {
      if (auth.profile()) this.listUsers();
    });
    addIcons({ search });
  }

  async listUsers(pageToken?: string) {
    const options: any = {
      maxResults: this.maxResults(),
    };

    if (pageToken) options.pageToken = pageToken;

    const { data } = await this.user.listUsers(options);

    this.pageToken.set((data as any).pageToken);
    this.users.set((data as any).users);
  }

  async listMoreUsers(event?: CustomEvent<InfiniteScrollCustomEvent>) {
    await this.listUsers(this.pageToken());
    (event as InfiniteScrollCustomEvent)?.target.complete();
  }

  computeIsEnd() {
    return this.userCount() === this.users().length;
  }

  async refresh(event: CustomEvent<RefresherEventDetail>) {
    await this.listUsers();
    event.detail.complete();
  }

  async searchUsers() {
    const alert = await this.alertController.create({
      header: 'Search Users',
      message: 'Get the user data for the user corresponding to a given email.',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Email address',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Search',
          handler: async (input) => await this.getUserByEmail(input.email),
        },
      ],
    });

    await alert.present();
  }

  async getUserByEmail(email: string) {
    if (!email) return this.searchUsers();

    await this.loading.present();
    const { data } = await this.user.getUserByEmail({ email });
    await this.loading.dismiss();

    const user: UserRecord | any = data;

    if (!user.uid) return this.presentAlertConfirm(user);

    this.router.navigateByUrl(`/users/${user.uid}`);
  }

  async presentAlertConfirm(error: any) {
    const alert = await this.alertController.create({
      header: 'Error',
      subHeader: error.errorInfo.code,
      message: error.errorInfo.message,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
