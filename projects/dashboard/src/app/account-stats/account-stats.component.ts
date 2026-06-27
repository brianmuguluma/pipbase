import { Component, computed } from '@angular/core';
import { AppComponent } from '../app.component';
import { CurrencyPipe, NgClass, PercentPipe } from '@angular/common';
import { PercentageService } from '../services/percentage/percentage.service';

@Component({
  selector: 'app-account-stats',
  templateUrl: './account-stats.component.html',
  styleUrls: ['./account-stats.component.scss'],
  standalone: true,
  imports: [CurrencyPipe, PercentPipe, NgClass],
})
export class AccountStatsComponent {
  change = computed(() => this.computeUnrealizedPercentage());
  constructor(
    public app: AppComponent,
    private percentage: PercentageService,
  ) {}

  computeUnrealizedPercentage(): number | undefined {
    if (!this.app.poll()) return;

    const { balance } = this.app.account()!;
    const { NAV } = this.app.poll()?.state!;

    return this.percentage.getPercentageChange(balance, NAV);
  }
}
