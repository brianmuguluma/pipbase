import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { PercentPipe } from '@angular/common';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
  standalone: true,
  imports: [PercentPipe],
})
export class StatsComponent {
  constructor(public app: AppComponent) {}
}
