import { Component } from '@angular/core';
import { AnalyticsService } from '../services/analytics/analytics.service';
import { ConsentStatusString } from '@angular/fire/analytics';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss'],
  standalone: true,
})
export class AnalyticsComponent {
  constructor(
    private app: AppComponent,
    private analytics: AnalyticsService,
  ) {}

  setEnabled(analytics_storage: ConsentStatusString) {
    this.analytics.setEnabled({ analytics_storage });
    this.app.getConsentStatus();
  }
}
