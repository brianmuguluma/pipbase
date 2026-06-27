import { NgClass } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  standalone: true,
  imports: [NgClass, RouterLink],
})
export class BannerComponent {
  displayBanner = signal(true);
  constructor() {}

  dismissBanner() {
    this.displayBanner.set(false);
  }
}
