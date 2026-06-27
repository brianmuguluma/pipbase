import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { AuthService } from '../services/auth/auth.service';
import { IonText } from '@ionic/angular/standalone';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss'],
  standalone: true,
  imports: [IonText],
})
export class StepsComponent {
  constructor(
    public app: AppComponent,
    public auth: AuthService,
  ) {}
}
