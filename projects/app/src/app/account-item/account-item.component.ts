import { Component, input } from '@angular/core';

import { Account } from '../interfaces/oanda';
import { CurrencyPipe } from '@angular/common';
import { AppComponent } from '../app.component';
import { ItemSkeletonComponent } from '../item-skeleton/item-skeleton.component';
import { AblyService } from '../services/ably/ably.service';
import { IonItem, IonRadio, IonText, IonNote } from '@ionic/angular/standalone';

@Component({
  selector: 'app-account-item',
  templateUrl: './account-item.component.html',
  styleUrls: ['./account-item.component.scss'],
  standalone: true,
  imports: [
    CurrencyPipe,
    ItemSkeletonComponent,
    IonItem,
    IonRadio,
    IonText,
    IonNote,
  ],
})
export class AccountItemComponent {
  account = input.required<Account>();
  constructor(
    public app: AppComponent,
    private ably: AblyService,
  ) {}

  async selectAccount() {
    const accountId = this.account()?.id;
    await this.app.updateUserAccountID(accountId!);
    const settings: any = { oanda: { credentials: { accountId } } };
    await this.ably.sendUserSignal({ command: 'UPDATE_SETTINGS', ...settings });
  }
}
