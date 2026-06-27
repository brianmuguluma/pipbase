import { Component, computed, input, signal } from '@angular/core';
import { AlertController, ToastOptions } from '@ionic/angular/standalone';
import { Instance, Region, Regions } from '../interfaces/vultr';
import { regions } from '../regions';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { AuthService } from '../services/auth/auth.service';
import { ToastService } from '../services/toast/toast.service';
import { VultrService } from '../services/vultr/vultr.service';
import { HapticsService } from '../services/haptics/haptics.service';
import { NotificationType } from '@capacitor/haptics';
import { addIcons } from 'ionicons';
import { refresh, powerOutline } from 'ionicons/icons';
import {
  IonList,
  IonItem,
  IonLabel,
  IonText,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-instance-details',
  templateUrl: './instance-details.component.html',
  styleUrls: ['./instance-details.component.scss'],
  standalone: true,
  imports: [
    TitleCasePipe,
    DatePipe,
    IonList,
    IonItem,
    IonLabel,
    IonText,
    IonButton,
    IonIcon,
  ],
})
export class InstanceDetailsComponent {
  instance = input.required<Instance>();
  regions = signal<Regions>(regions);
  region = computed<Region>(() => this.computeRegion());
  constructor(
    public auth: AuthService,
    private toast: ToastService,
    private vultr: VultrService,
    private alertController: AlertController,
    private haptics: HapticsService,
  ) {
    addIcons({ refresh, powerOutline });
  }

  computeRegion() {
    return this.regions().regions.filter(
      (region) => region.id === this.instance()?.region,
    )[0];
  }

  async notify() {
    await this.haptics.notify({ type: NotificationType.Warning });
  }

  async confirmToggleInstance() {
    this.notify();
    const action =
      this.instance()?.power_status === 'running' ? 'Stop' : 'Start';
    const alert = await this.alertController.create({
      header: `${action} Instance`,
      message: `Are you sure you want to ${action.toLowerCase()} your instance?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: action,
          role: action === 'Stop' ? 'destructive' : undefined,
          handler: () => this.toggleInstance(),
        },
      ],
    });

    await alert.present();
  }

  async confirmReinstallInstance() {
    this.notify();
    const isOwner = this.instance()?.label === this.auth.profile()?.uid;
    const determiner = isOwner ? 'your' : 'this';
    const alert = await this.alertController.create({
      header: 'Restart Instance',
      message: `Are you sure you want to restart ${determiner} instance?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Restart',
          role: 'destructive',
          handler: () => this.reinstallInstance(),
        },
      ],
    });

    await alert.present();
  }

  private toggleInstance() {
    const { power_status } = this.instance()!;
    if (power_status === 'running') this.haltInstance();
    if (power_status === 'stopped') this.reinstallInstance();
  }

  private async haltInstance() {
    const options: ToastOptions = {
      message: 'Stopping your instance...',
      icon: 'information-circle-outline',
    };
    this.toast.present(options);
    this.vultr.haltInstance({
      parameters: { 'instance-id': this.instance()?.id },
    });
  }

  private async reinstallInstance() {
    const action =
      this.instance()?.power_status === 'running' ? 'Restarting' : 'Starting';
    const options: ToastOptions = {
      message: `${action} your instance...`,
      icon: 'information-circle-outline',
    };
    this.toast.present(options);
    this.vultr.reinstallInstance({
      parameters: { 'instance-id': this.instance()?.id },
    });
  }
}
