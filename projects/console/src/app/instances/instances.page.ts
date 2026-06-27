import { Component, computed, effect, signal } from '@angular/core';
import {
  CurrencyPipe,
  DatePipe,
  DecimalPipe,
  TitleCasePipe,
} from '@angular/common';
import { SpinnerComponent } from '../spinner/spinner.component';
import { VultrService } from '../services/vultr/vultr.service';
import { RouterLink } from '@angular/router';
import { FormatRelativePipe } from '../pipes/format-relative/format-relative.pipe';
import {
  Account,
  Instance,
  InstanceMeta,
  Instances,
  Regions,
} from '../interfaces/vultr';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { AuthService } from '../services/auth/auth.service';
import { AppComponent } from '../app.component';
import { regions } from '../regions';
import { InstancesReinstallComponent } from '../instances-reinstall/instances-reinstall.component';

@Component({
  selector: 'app-instances',
  templateUrl: './instances.page.html',
  styleUrls: ['./instances.page.scss'],
  standalone: true,
  imports: [
    SpinnerComponent,
    RouterLink,
    FormatRelativePipe,
    NavbarComponent,
    FooterComponent,
    DecimalPipe,
    CurrencyPipe,
    DatePipe,
    TitleCasePipe,
    InstancesReinstallComponent,
  ],
})
export class InstancesPage {
  account = signal<Account | undefined>(undefined);
  instances = signal<Instance[]>([]);
  meta = signal<InstanceMeta | undefined>(undefined);
  regions = signal<Regions>(regions);
  isEnd = computed(() => this.computeIsEnd());
  limit = signal(10);
  constructor(
    public app: AppComponent,
    public auth: AuthService,
    private vultr: VultrService,
  ) {
    effect(() => {
      if (auth.profile()) {
        this.listInstances();
        this.getAccountInfo();
      }
    });
  }

  computeIsEnd() {
    return this.meta()?.total === this.instances().length;
  }

  async getAccountInfo() {
    const { data } = await this.vultr.getAccountInfo({ parameters: {} });
    this.account.set(data as any);
  }

  async listInstances(cursor?: string) {
    const parameters: any = { per_page: this.limit.toString() };

    if (cursor) parameters.cursor = cursor;

    const { data } = await this.vultr.listInstances({
      parameters,
    });

    this.instances.set([
      ...this.instances(),
      ...this.mapInstances((data as Instances).instances),
    ]);
    this.meta.set((data as Instances).meta);
  }

  async listMoreInstances(event?: any) {
    await this.listInstances(this.meta()?.links.next);
    // (event as InfiniteScrollCustomEvent)?.target?.complete();
  }

  mapInstances(instances: Instance[]) {
    return instances.map((i) => ({ ...i, location: this.mapInstance(i) }));
  }

  mapInstance(instance: any) {
    return regions.regions.filter(
      (region: any) => region.id === instance.region,
    )[0];
  }
}
