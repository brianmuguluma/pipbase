import { Component } from '@angular/core';
import { StepsComponent } from '../steps/steps.component';
import { CredentialsComponent } from '../credentials/credentials.component';
import { AccountsComponent } from '../accounts/accounts.component';
import { AuthService } from '../services/auth/auth.service';
import { StepCompleteComponent } from '../step-complete/step-complete.component';
import { StepCurrentComponent } from '../step-current/step-current.component';
import { StepUpcomingComponent } from '../step-upcoming/step-upcoming.component';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss'],
  standalone: true,
  imports: [
    StepsComponent,
    CredentialsComponent,
    AccountsComponent,
    StepCompleteComponent,
    StepCurrentComponent,
    StepUpcomingComponent,
  ],
})
export class SetupComponent {
  constructor(public auth: AuthService) {}
}
