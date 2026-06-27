import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { NewsletterComponent } from '../newsletter/newsletter.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [NewsletterComponent],
})
export class FooterComponent {
  constructor(public app: AppComponent) {}
}
