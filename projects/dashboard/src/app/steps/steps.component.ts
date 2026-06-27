import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { AppComponent } from '../app.component';
import { NgClass } from '@angular/common';
import { StepCurrentComponent } from '../step-current/step-current.component';
import { StepCompleteComponent } from '../step-complete/step-complete.component';
import { StepUpcomingComponent } from '../step-upcoming/step-upcoming.component';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss'],
  standalone: true,
  imports: [
    NgClass,
    StepCurrentComponent,
    StepCompleteComponent,
    StepUpcomingComponent,
  ],
})
export class StepsComponent {
  constructor(
    public auth: AuthService,
    public app: AppComponent,
  ) {}
}
