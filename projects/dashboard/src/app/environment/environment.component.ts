import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-environment',
  templateUrl: './environment.component.html',
  styleUrls: ['./environment.component.scss'],
  standalone: true,
  imports: [NgClass],
})
export class EnvironmentComponent {
  isPaperTrading = input.required<boolean>();
  constructor(public auth: AuthService) {}
}
