import { NgClass, SlicePipe } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { RegexPipe } from '../pipes/regex/regex.pipe';
import { EnvironmentComponent } from '../environment/environment.component';
import { AvatarComponent } from '../avatar/avatar.component';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [
    NgClass,
    RegexPipe,
    EnvironmentComponent,
    RouterLink,
    SlicePipe,
    AvatarComponent,
  ],
})
export class MenuComponent {
  menu = [
    {
      url: '/server',
      displayName: 'Server',
      pattern: '/server?/?\\w+',
      paths: [
        {
          d: 'M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z',
        },
      ],
    },
    {
      url: '/reports',
      displayName: 'Reports',
      pattern: '/reports?/?\\w+',
      paths: [
        { d: 'M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z' },
        { d: 'M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z' },
      ],
    },
    {
      url: '/settings',
      displayName: 'Settings',
      pattern: '/settings?/?\\w+',
      paths: [
        {
          d: 'M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z',
        },
        { d: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
      ],
    },
  ];
  exchangeMenu = [
    {
      url: '/orders',
      displayName: 'Orders',
      pattern: '/orders?/?\\w+',
    },
    {
      url: '/trades',
      displayName: 'Trades',
      pattern: '/trades?/?\\w+',
    },
    {
      url: '/positions',
      displayName: 'Positions',
      pattern: '/positions?/?\\w+',
    },
    {
      url: '/transactions',
      displayName: 'Transactions',
      pattern: '/transactions?/?\\w+',
    },
  ];
  constructor(
    public app: AppComponent,
    public auth: AuthService,
    public router: Router,
  ) {}
}
