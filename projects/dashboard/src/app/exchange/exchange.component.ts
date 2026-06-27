import { Component } from '@angular/core';
import { CredentialsComponent } from '../credentials/credentials.component';
import { AuthService } from '../services/auth/auth.service';
import { AccountsComponent } from '../accounts/accounts.component';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss'],
  standalone: true,
  imports: [CredentialsComponent, AccountsComponent],
})
export class ExchangeComponent {
  constructor(public auth: AuthService) {}
}
