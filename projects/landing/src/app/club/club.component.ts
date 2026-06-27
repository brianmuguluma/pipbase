import { NgOptimizedImage, PercentPipe } from '@angular/common';
import { Component } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.scss'],
  standalone: true,
  imports: [NgOptimizedImage, PercentPipe],
})
export class ClubComponent {
  constructor(public app: AppComponent) {}
}
