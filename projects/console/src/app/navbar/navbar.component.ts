import { Component, signal } from '@angular/core';
import { AvatarComponent } from '../avatar/avatar.component';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [AvatarComponent, RouterLink, MenuComponent],
})
export class NavbarComponent {
  id = signal(crypto.randomUUID());
  menu = [
    {
      url: '/users',
      name: 'Users',
      pattern: '/users?/?\\w+',
    },
    {
      url: '/instances',
      name: 'Instances',
      pattern: '/instances?/?\\w+',
    },
    {
      url: '/signals',
      name: 'Signals',
      pattern: '/signals?/?\\w+',
    },
    {
      url: '/settings',
      name: 'Config',
      pattern: '/settings?/?\\w+',
    },
  ];
  constructor(
    public auth: AuthService,
    public router: Router,
  ) {}
}
