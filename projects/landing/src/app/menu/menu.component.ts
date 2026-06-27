import { NgClass } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { AppComponent } from '../app.component';
import { menu } from '../menu';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [NgClass, RouterLink],
})
export class MenuComponent {
  menu = signal(menu);
  constructor(
    public app: AppComponent,
    public router: Router,
  ) {}
}
