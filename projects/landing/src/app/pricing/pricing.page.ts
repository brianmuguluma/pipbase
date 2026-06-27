import { Component, signal } from '@angular/core';

import { Meta } from '@angular/platform-browser';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FaqsComponent } from '../faqs/faqs.component';
import { PlansComponent } from '../plans/plans.component';
import { AppComponent } from '../app.component';
import { testimonials } from '../testimonials';
import { QuoteComponent } from '../quote/quote.component';
import { CalculatorComponent } from '../calculator/calculator.component';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.page.html',
  styleUrls: ['./pricing.page.scss'],
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    FaqsComponent,
    PlansComponent,
    QuoteComponent,
    CalculatorComponent,
  ],
})
export class PricingPage {
  testimonials = signal(testimonials);
  constructor(
    public app: AppComponent,
    private meta: Meta,
  ) {
    meta.addTags([{ name: 'description', content: 'Pricing' }]);
  }
}
