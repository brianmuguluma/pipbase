import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-trial',
  templateUrl: './trial.component.html',
  styleUrls: ['./trial.component.scss'],
  standalone: true,
  imports: [RouterLink],
})
export class TrialComponent {
  constructor(public app: AppComponent) {}
}
