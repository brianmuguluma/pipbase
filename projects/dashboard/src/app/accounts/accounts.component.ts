import { NgClass } from '@angular/common';
import { Component, computed } from '@angular/core';
import { AccountItemComponent } from '../account-item/account-item.component';
import { AppComponent } from '../app.component';
import { AuthService } from '../services/auth/auth.service';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
  standalone: true,
  imports: [NgClass, SpinnerComponent, AccountItemComponent],
})
export class AccountsComponent {
  account = computed(() => this.computeAccount());
  constructor(
    public app: AppComponent,
    public auth: AuthService,
  ) {}

  computeAccount() {
    return this.auth.hasAccountId() ? this.app.account()?.id : undefined;
  }
}
