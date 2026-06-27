import { Component, OnInit, computed, input, signal } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { SpinnerComponent } from '../spinner/spinner.component';
import { FooterComponent } from '../footer/footer.component';
import { Instance, Region, Regions } from '../interfaces/vultr';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { regions } from '../regions';
import { VultrService } from '../services/vultr/vultr.service';
import { AuthService } from '../services/auth/auth.service';
import { ToastService } from '../services/toast/toast.service';
import { UserCardComponent } from '../user-card/user-card.component';
import { UserRecord } from '../interfaces/user';
import { UsersService } from '../services/users/users.service';

@Component({
  selector: 'app-instance',
  templateUrl: './instance.page.html',
  styleUrls: ['./instance.page.scss'],
  standalone: true,
  imports: [
    NavbarComponent,
    SpinnerComponent,
    FooterComponent,
    DatePipe,
    TitleCasePipe,
    UserCardComponent,
  ],
})
export class InstancePage implements OnInit {
  id = input<string>();
  instance = signal<Instance | undefined>(undefined);
  regions = signal<Regions>(regions);
  region = computed<Region>(() => this.computeRegion());
  user = signal<UserRecord | undefined>(undefined);
  constructor(
    public auth: AuthService,
    private vultr: VultrService,
    private toast: ToastService,
    private users: UsersService,
  ) {}

  async ngOnInit() {
    await this.getInstance();
    this.getUser();
  }

  computeRegion() {
    return this.regions().regions.filter(
      (region) => region.id === this.instance()?.region,
    )[0];
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
      }
    } catch (error) {
      console.error(error);
    }
  }

  async confirmReinstallInstance() {
    // const isOwner = this.instance()?.label === this.auth.profile()?.uid;
    // const determiner = isOwner ? 'your' : 'this';
    // const alert = await this.alertController.create({
    //   header: 'Restart Instance',
    //   message: `Are you sure you want to restart ${determiner} instance?`,
    //   buttons: [
    //     {
    //       text: 'Cancel',
    //       role: 'cancel',
    //     },
    //     {
    //       text: 'Restart',
    //       role: 'destructive',
    //       handler: () => this.reinstallInstance(),
    //     },
    //   ],
    // });
    // await alert.present();
  }

  private async reinstallInstance() {
    const action =
      this.instance()?.power_status === 'running' ? 'Restarting' : 'Starting';
    this.toast.loading(`${action} your instance...`);
    this.vultr.reinstallInstance({
      parameters: { 'instance-id': this.instance()?.id },
    });
  }

  async getUser() {
    const { data } = await this.users.getUser({ uid: this.instance()?.label });
    this.user.set(data as UserRecord);
  }
}
