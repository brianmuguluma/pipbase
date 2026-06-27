import { Component, computed, signal } from '@angular/core';

import { RefresherEventDetail } from '@ionic/angular/standalone';
import { BotComponent } from '../bot/bot.component';
import { Instance, Instances, Region, Regions } from '../interfaces/vultr';
import { regions } from '../regions';
import { AuthService } from '../services/auth/auth.service';
import { VultrService } from '../services/vultr/vultr.service';
import { InstanceDetailsComponent } from '../instance-details/instance-details.component';
import { SpinnerComponent } from '../spinner/spinner.component';
import { ErrorComponent } from '../error/error.component';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonContent,
  IonRefresher,
  IonRefresherContent,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-server',
  templateUrl: './server.page.html',
  styleUrls: ['./server.page.scss'],
  standalone: true,
  imports: [
    BotComponent,
    InstanceDetailsComponent,
    SpinnerComponent,
    ErrorComponent,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonContent,
    IonRefresher,
    IonRefresherContent,
  ],
})
export class ServerPage {
  segment = signal('bot');
  instances = signal<Instances | undefined>(undefined);
  instance = computed<Instance | undefined>(() => this.computeInstance());
  regions = signal<Regions>(regions);
  region = computed<Region>(() => this.computeRegion());
  constructor(
    public auth: AuthService,
    private vultr: VultrService,
  ) {}

  updateSegment(event: any) {
    const {
      detail: { value },
    } = event;
    this.segment.set(value);
    if (value === 'instance' && !this.instance()) {
      this.listInstances();
    }
  }

  async refresh(event: CustomEvent<RefresherEventDetail>) {
    await this.listInstances();
    event.detail.complete();
  }

  computeInstance() {
    return this.instances()?.instances[0];
  }

  async listInstances() {
    try {
      const parameters = { label: this.auth.profile()?.uid };
      const { data } = await this.vultr.listInstances({ parameters });
      this.instances.set(data as Instances);
    } catch (error) {
      console.error(error);
    }
  }

  computeRegion() {
    return this.regions().regions.filter(
      (region) => region.id === this.instance()?.region,
    )[0];
  }
}
