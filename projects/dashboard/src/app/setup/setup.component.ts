import { Component, OnInit, signal } from '@angular/core';
import { StepsComponent } from '../steps/steps.component';
import { EmailComponent } from '../email/email.component';
import { CredentialsComponent } from '../credentials/credentials.component';
import { AccountsComponent } from '../accounts/accounts.component';
import { AuthService } from '../services/auth/auth.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss'],
  standalone: true,
  imports: [
    StepsComponent,
    EmailComponent,
    CredentialsComponent,
    AccountsComponent,
  ],
})
export class SetupComponent {
  step = signal<'credentials' | 'account' | undefined>(undefined);
  constructor(
    public auth: AuthService,
    public app: AppComponent,
  ) {}
}
