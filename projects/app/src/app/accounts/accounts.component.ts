import { Component, computed, signal } from '@angular/core';

import { ItemSkeletonComponent } from '../item-skeleton/item-skeleton.component';
import { AccountItemComponent } from '../account-item/account-item.component';
import { AppComponent } from '../app.component';
import { AuthService } from '../services/auth/auth.service';
import {
  IonText,
  IonList,
  IonRadioGroup,
  IonLabel,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonCard,
  IonButton,
  IonModal,
  IonToolbar,
  IonButtons,
  IonPicker,
  IonPickerColumnOption,
  IonPickerColumn,
  IonNote,
} from '@ionic/angular/standalone';
import { AblyService } from '../services/ably/ably.service';
import { AccountSummary } from '../interfaces/oanda';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
  standalone: true,
  imports: [
    IonNote,
    IonButtons,
    IonToolbar,
    IonButton,
    IonItem,
    IonLabel,
    ItemSkeletonComponent,
    AccountItemComponent,
    IonText,
    IonList,
    IonRadioGroup,
    IonSelect,
    IonSelectOption,
    IonCard,
    IonModal,
    IonPicker,
    IonPickerColumnOption,
    IonPickerColumn,
  ],
})
export class AccountsComponent {
  id = signal<AccountSummary | undefined>(undefined);
  constructor(
    public app: AppComponent,
    public auth: AuthService,
    private ably: AblyService,
  ) {}

  onIonChange(event: CustomEvent) {
    this.id.set(event.detail.value);
  }

  async onDidDismiss(event: CustomEvent) {
    const { data: accountId, role } = event.detail;

    if (role !== 'confirm' && !accountId) return;

    await this.app.updateUserAccountID(accountId!);
    const settings: any = { oanda: { credentials: { accountId } } };
    await this.ably.sendUserSignal({ command: 'UPDATE_SETTINGS', ...settings });
  }
}
