import { Component, computed } from '@angular/core';

import { PositionStateFilter } from '../interfaces/oanda';
import { AppComponent } from '../app.component';
import { NgClass, TitleCasePipe } from '@angular/common';
import { AnalyticsService } from '../services/analytics/analytics.service';
import { SlashPipe } from '../pipes/slash/slash.pipe';
import { SpinnerComponent } from '../spinner/spinner.component';
import { PositionComponent } from '../position/position.component';
import {
  IonContent,
  IonItem,
  IonLabel,
  IonChip,
  IonAccordionGroup,
  IonAccordion,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.scss'],
  standalone: true,
  imports: [
    NgClass,
    TitleCasePipe,
    SlashPipe,
    SpinnerComponent,
    PositionComponent,
    IonContent,
    IonItem,
    IonLabel,
    IonChip,
    IonAccordionGroup,
    IonAccordion,
  ],
})
export class PositionsComponent {
  positions = computed(() => this.app.account()?.positions);
  openPositions = computed(() => this.app.poll()?.state?.positions);
  isEmpty = false;
  constructor(
    public app: AppComponent,
    private analytics: AnalyticsService,
  ) {
    analytics.setCurrentScreen({ screenName: 'Positions' });
  }

  updatePositionStateFilter(state: PositionStateFilter) {
    this.analytics.logEvent({ name: 'positionStateFilter', params: { state } });
    this.app.positionStateFilter.set(state);
  }
}
