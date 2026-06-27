import { Component, computed, input, signal } from '@angular/core';
import { Instance, Region, Regions } from '../interfaces/vultr/vultr';
import { regions } from '../regions';
import { AppComponent } from '../app.component';
import { AuthService } from '../services/auth/auth.service';
import { ToastService } from '../services/toast/toast.service';
import { VultrService } from '../services/vultr/vultr.service';
import {
  DatePipe,
  LowerCasePipe,
  NgClass,
  TitleCasePipe,
} from '@angular/common';

@Component({
  selector: 'app-instance',
  templateUrl: './instance.component.html',
  styleUrls: ['./instance.component.scss'],
  standalone: true,
  imports: [DatePipe, NgClass, TitleCasePipe, LowerCasePipe],
})
export class InstanceComponent {
  instance = input.required<Instance>();
  regions = signal<Regions>(regions);
  region = computed<Region>(() => this.computeRegion());
  action = computed(() => this.computeAction());
  constructor(
    public app: AppComponent,
    public auth: AuthService,
    private toast: ToastService,
    private vultr: VultrService,
  ) {}

  computeRegion() {
    return this.regions().regions.filter(
      (region) => region.id === this.instance().region,
    )[0];
  }

  computeAction() {
    return this.instance().power_status === 'running' ? 'Stop' : 'Start';
  }

  toggleInstance() {
    const { power_status } = this.instance();
    if (power_status === 'running') this.haltInstance();
    if (power_status === 'stopped') this.reinstallInstance();
  }

  async reinstallInstance() {
    const action =
      this.instance().power_status === 'running' ? 'Restarting' : 'Starting';
    this.toast.loading(`${action} your instance...`);
    this.vultr.reinstallInstance({
      parameters: { 'instance-id': this.instance().id },
    });
  }

  private async haltInstance() {
    this.toast.loading('Stopping your instance...');
    this.vultr.haltInstance({
      parameters: { 'instance-id': this.instance().id },
    });
  }
}
