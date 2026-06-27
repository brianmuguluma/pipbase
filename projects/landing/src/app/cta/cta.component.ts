import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-cta',
  templateUrl: './cta.component.html',
  styleUrls: ['./cta.component.scss'],
  standalone: true,
  imports: [NgOptimizedImage],
})
export class CtaComponent {
  constructor(public app: AppComponent) {}
}
