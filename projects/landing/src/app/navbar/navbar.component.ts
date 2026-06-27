import { Component } from '@angular/core';

import { AppComponent } from '../app.component';
import { Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [RouterLink, NgClass, MenuComponent],
})
export class NavbarComponent {
  constructor(
    public app: AppComponent,
    public router: Router,
  ) {}
}
