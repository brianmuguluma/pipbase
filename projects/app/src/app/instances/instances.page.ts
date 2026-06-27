import { Component, effect, signal } from '@angular/core';

import { RefresherEventDetail } from '@ionic/angular/standalone';
import { SpinnerComponent } from '../spinner/spinner.component';
import { VultrService } from '../services/vultr/vultr.service';
import { RouterLink } from '@angular/router';
import { FormatRelativePipe } from '../pipes/format-relative/format-relative.pipe';
import { InstanceItemComponent } from '../instance-item/instance-item.component';
import { Instance } from '../interfaces/vultr';
import { ItemSkeletonComponent } from '../item-skeleton/item-skeleton.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AuthService } from '../services/auth/auth.service';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonRefresher,
  IonRefresherContent,
  IonList,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-instances',
  templateUrl: './instances.page.html',
  styleUrls: ['./instances.page.scss'],
  standalone: true,
  imports: [
    SpinnerComponent,
    RouterLink,
    FormatRelativePipe,
    InstanceItemComponent,
    ItemSkeletonComponent,
    ScrollingModule,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    IonRefresher,
    IonRefresherContent,
    IonList,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
  ],
})
export class InstancesPage {
  instances = signal<Instance[]>([]);
  isEnd = signal(false);
  constructor(
    private auth: AuthService,
    private vultr: VultrService,
  ) {
    effect(() => {
      if (auth.profile()) this.listInstances();
    });
  }

  async listInstances() {
    const { data } = await this.vultr.listInstances({ parameters: {} });
    this.instances.set((data as any).instances);
  }

  async refresh(event: CustomEvent<RefresherEventDetail>) {
    await this.listInstances();
    event.detail?.complete();
  }
}
