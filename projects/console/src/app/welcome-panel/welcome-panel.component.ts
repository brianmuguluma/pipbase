import { Component } from '@angular/core';
import { ProfileOverviewComponent } from '../profile-overview/profile-overview.component';

@Component({
  selector: 'app-welcome-panel',
  templateUrl: './welcome-panel.component.html',
  styleUrls: ['./welcome-panel.component.scss'],
  standalone: true,
  imports: [ProfileOverviewComponent],
})
export class WelcomePanelComponent {
  constructor() {}
}
