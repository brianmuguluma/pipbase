import { Component, computed, effect, signal } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Transaction, TransactionsResponse } from '../interfaces/oanda/oanda';
import { AppComponent } from '../app.component';
import { glossary } from '../glossary';
import { formatRFC3339, subBusinessDays } from 'date-fns';
import { OandaService } from '../services/oanda/oanda.service';
import {
  AsyncPipe,
  CurrencyPipe,
  DatePipe,
  DecimalPipe,
  NgClass,
  TitleCasePipe,
} from '@angular/common';
import { SpinnerComponent } from '../spinner/spinner.component';
import { ToNumberPipe } from '../pipes/to-number/to-number.pipe';
import { NoCasePipe } from '../pipes/no-case/no-case.pipe';
import { ReasonPipe } from '../pipes/enum/reason.pipe';
import { RouterLink } from '@angular/router';
import { DurationPipe } from '../pipes/duration/duration.pipe';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';
import { GuarenteedStopLossOrderModePipe } from '../pipes/enum/guarenteed-stop-loss-order-mode.pipe';
import { TooltipComponent } from '../tooltip/tooltip.component';
import { FooterComponent } from '../footer/footer.component';
import { AccountStatsComponent } from '../account-stats/account-stats.component';
import { AccountActivityComponent } from '../account-activity/account-activity.component';
import { AccountDetailsComponent } from '../account-details/account-details.component';
import { EnvironmentComponent } from '../environment/environment.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: true,
  imports: [
    SpinnerComponent,
    CurrencyPipe,
    ToNumberPipe,
    DecimalPipe,
    DatePipe,
    AsyncPipe,
    NoCasePipe,
    TitleCasePipe,
    ReasonPipe,
    RouterLink,
    DurationPipe,
    NgClass,
    BreadcrumbsComponent,
    SpinnerComponent,
    GuarenteedStopLossOrderModePipe,
    TooltipComponent,
    FooterComponent,
    AccountStatsComponent,
    AccountActivityComponent,
    AccountDetailsComponent,
    EnvironmentComponent,
  ],
})
export class AccountPage {
  constructor(
    public app: AppComponent,
    public auth: AuthService,
  ) {}
}
