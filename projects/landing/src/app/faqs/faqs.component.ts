import { Component, signal } from '@angular/core';
import { AppComponent } from '../app.component';

import { faqs } from '../faqs';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss'],
  standalone: true,
})
export class FaqsComponent {
  faqs = signal(faqs);
  constructor(public app: AppComponent) {}
}
