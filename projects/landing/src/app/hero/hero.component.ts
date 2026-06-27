import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  standalone: true,
  imports: [NgOptimizedImage, RouterLink],
})
export class HeroComponent {
  constructor(public app: AppComponent) {}
}
