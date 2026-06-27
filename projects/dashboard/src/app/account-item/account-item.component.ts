import { Component, input } from '@angular/core';
import { Account } from '../interfaces/oanda/oanda';
import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { AuthService } from '../services/auth/auth.service';
import { AppComponent } from '../app.component';
import { AblyService } from '../services/ably/ably.service';

@Component({
  selector: 'app-account-item',
  templateUrl: './account-item.component.html',
  styleUrls: ['./account-item.component.scss'],
  standalone: true,
  imports: [NgClass, CurrencyPipe, DatePipe],
})
export class AccountItemComponent {
  account = input.required<Account>();
  isLast = input<boolean>();
  constructor(
    public app: AppComponent,
    public auth: AuthService,
    private ably: AblyService,
  ) {}

  selectAccount() {
    const accountId = this.account().id;
    this.app.updateUserAccountID(this.account().id!);
    const settings: any = { oanda: { credentials: { accountId } } };
    this.ably.sendSignal({ command: 'UPDATE_SETTINGS', ...settings });
  }
}
