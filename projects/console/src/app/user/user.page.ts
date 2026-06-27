import {
  Component,
  OnInit,
  computed,
  effect,
  input,
  signal,
} from '@angular/core';
import {
  DatePipe,
  LowerCasePipe,
  NgClass,
  TitleCasePipe,
} from '@angular/common';
import { UsersService } from '../services/users/users.service';
import { SpinnerComponent } from '../spinner/spinner.component';
import { AuthService } from '../services/auth/auth.service';
import { FormatRelativePipe } from '../pipes/format-relative/format-relative.pipe';
import { User, UserRecord } from '../interfaces/user';
import { NavbarComponent } from '../navbar/navbar.component';
import { AvatarComponent } from '../avatar/avatar.component';
import { FooterComponent } from '../footer/footer.component';
import { ToastService } from '../services/toast/toast.service';
import { capitalCase } from 'change-case';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { TitleService } from '../services/title/title.service';
import { InstanceCardComponent } from '../instance-card/instance-card.component';
import { Instance, Instances } from '../interfaces/vultr';
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
    NavbarComponent,
    AvatarComponent,
    FooterComponent,
    LowerCasePipe,
    NgClass,
    InstanceCardComponent,
  ],
})
export class UserPage implements OnInit {
  uid = input<string>();
  user = signal<User | undefined>(undefined);
  userRecord = signal<UserRecord | undefined>(undefined);
  action = computed(() => this.computeAction());
  instances = signal<Instances | undefined>(undefined);
  instance = computed<Instance | undefined>(() => this.computeInstance());
  constructor(
    public auth: AuthService,
    private users: UsersService,
    private toast: ToastService,
    private firestore: Firestore,
    private title: TitleService,
    private vultr: VultrService,
  ) {
    effect(() => {
      if (this.userRecord())
        this.title.setTitle(`${this.userRecord()?.displayName}`);
    });
  }

  async ngOnInit() {
    await this.getUserRecord();
    this.getUser();
    this.getInstance();
  }

  async getUser() {
    const user = await getDoc(doc(this.firestore, `users/${this.uid()}`));
    this.user.set(user.data());
  }

  async getUserRecord() {
    const { data } = await this.users.getUser({ uid: this.uid() });
    this.userRecord.set(data as UserRecord);
  }

  async updateUser() {
    const user = await this.users.updateUser({
      uid: this.uid(),
      properties: { disabled: !this.userRecord()?.disabled },
    });

    if (!user?.data) return this.toast.error('Unable to update user.');

    this.toast.success('User has been updated.');
    this.userRecord.set(user?.data as UserRecord);
  }

  computeInstance() {
    return this.instances()?.instances[0];
  }

  computeAction() {
    if (!this.userRecord()) return;

    const { disabled } = this.userRecord()!;
    return capitalCase(disabled ? 'Enable' : 'Disable');
  }

  async getInstance() {
    if (!this.userRecord()?.customClaims?.['premium']) return;
    try {
      const parameters = { label: this.uid() };
      const { data } = await this.vultr.listInstances({ parameters });
      this.instances.set(data as Instances);
    } catch (error) {
      console.error(error);
    }
  }
}
