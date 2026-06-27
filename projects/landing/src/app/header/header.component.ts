import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [NavbarComponent],
})
export class HeaderComponent {
  constructor(public app: AppComponent) {}
}
