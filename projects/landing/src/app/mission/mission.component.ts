import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { DecimalPipe, PercentPipe } from '@angular/common';

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.scss'],
  standalone: true,
  imports: [PercentPipe, DecimalPipe],
})
export class MissionComponent {
  constructor(public app: AppComponent) {}
}
