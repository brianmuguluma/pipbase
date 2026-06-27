import { Component, signal } from '@angular/core';
import { NgClass, TitleCasePipe } from '@angular/common';
import { ProfileComponent } from '../profile/profile.component';
import { BillingComponent } from '../billing/billing.component';
import { ExchangeComponent } from '../exchange/exchange.component';
import { NotificationsComponent } from '../notifications/notifications.component';
import {
  ActivatedRoute,
  Params,
  QueryParamsHandling,
  Router,
  RouterLink,
} from '@angular/router';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [
    NgClass,
    ProfileComponent,
    BillingComponent,
    ExchangeComponent,
    NotificationsComponent,
    RouterLink,
    FooterComponent,
    TitleCasePipe,
  ],
})
export class SettingsPage {
  tab = signal('billing');
  tabs = signal(['profile', 'exchange', 'notifications', 'billing']);
  queryParams = signal<Params>({});
  queryParamsHandling = signal<QueryParamsHandling>('merge');
  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
    route.queryParamMap.subscribe((params) => {
      const tab = params.get('tab');
      this.tab.set(tab ?? 'profile');
    });
  }

  updateTab(tab: string) {
    let queryParams: Params = {};
    if (tab === 'undefined') queryParams['tab'] = null;
    else queryParams['tab'] = tab;
    this.queryParams.set(queryParams);
    this.router.navigate(['/settings'], {
      queryParams,
      queryParamsHandling: this.queryParamsHandling(),
    });
  }
}
