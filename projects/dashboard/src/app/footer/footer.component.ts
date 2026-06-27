import { Component } from '@angular/core';
import { DisclaimerComponent } from '../disclaimer/disclaimer.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [DisclaimerComponent],
})
export class FooterComponent {
  constructor() {}
}
