import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FaqsComponent } from '../faqs/faqs.component';
import { PlansComponent } from '../plans/plans.component';
import { TestimonialsComponent } from '../testimonials/testimonials.component';
import { CalculatorComponent } from '../calculator/calculator.component';
import { FeaturesComponent } from '../features/features.component';
import { ServerComponent } from '../server/server.component';
import { StatsComponent } from '../stats/stats.component';
import { HeroComponent } from '../hero/hero.component';
import { CtaComponent } from '../cta/cta.component';
import { ClubComponent } from '../club/club.component';
import { TrialComponent } from '../trial/trial.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    FaqsComponent,
    PlansComponent,
    TestimonialsComponent,
    CalculatorComponent,
    NgOptimizedImage,
    FeaturesComponent,
    ServerComponent,
    StatsComponent,
    HeroComponent,
    CtaComponent,
    ClubComponent,
    TrialComponent,
  ],
})
export class HomePage {
  constructor() {}
}
