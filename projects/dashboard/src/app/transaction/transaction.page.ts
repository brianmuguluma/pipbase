import { Component, computed, effect, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppComponent } from '../app.component';
import { glossary } from '../glossary';
import { OandaError, Transaction } from '../interfaces/oanda/oanda';
import { OandaService } from '../services/oanda/oanda.service';
import {
  AsyncPipe,
  CurrencyPipe,
  DatePipe,
  DecimalPipe,
  NgClass,
  TitleCasePipe,
} from '@angular/common';
import { SlashPipe } from '../pipes/slash/slash.pipe';
import { SpinnerComponent } from '../spinner/spinner.component';
import { NoCasePipe } from '../pipes/no-case/no-case.pipe';
import { ReasonPipe } from '../pipes/enum/reason.pipe';
import { RejectReasonPipe } from '../pipes/enum/reject-reason.pipe';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';
import { TimeInForcePipe } from '../pipes/enum/time-in-force.pipe';
import { TooltipComponent } from '../tooltip/tooltip.component';
import { ToNumberPipe } from '../pipes/to-number/to-number.pipe';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { HeaderComponent } from '../header/header.component';
import { TitleService } from '../services/title/title.service';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.page.html',
  styleUrls: ['./transaction.page.scss'],
  standalone: true,
  imports: [
    RouterLink,
    SpinnerComponent,
    SlashPipe,
    NoCasePipe,
    TitleCasePipe,
    ReasonPipe,
    AsyncPipe,
    RejectReasonPipe,
    DecimalPipe,
    CurrencyPipe,
    DatePipe,
    BreadcrumbsComponent,
    NgClass,
    TimeInForcePipe,
    TooltipComponent,
    ToNumberPipe,
    PageNotFoundComponent,
    HeaderComponent,
    FooterComponent,
  ],
})
export class TransactionPage {
  id = input<string>();
  transaction = signal<Transaction | any | undefined>(undefined);
  glossary = signal(glossary);
  instrument = computed(() => this.getInstrument());
  error = signal<OandaError | undefined>(undefined);
  status = signal<number | undefined>(undefined);
  constructor(
    public app: AppComponent,
    private oanda: OandaService,
    private title: TitleService,
  ) {
    effect(() => {
      if (app.isReady()) this.getTransaction();
    });
  }

  async getTransaction() {
    if (!this.app.account()?.id) return;

    const { data, status } = await this.oanda.getTransaction(this.id()!);

    this.status.set(status);

    if (status !== 200) this.error.set(data);

    if (status === 200) {
      this.title.setTitle(`Transaction ${this.id()}`);
      const transaction = data.transaction;
      this.transaction.set(transaction);
    }
  }

  getInstrument() {
    return this.app
      .instruments()
      ?.filter(
        (instrument) => instrument.name === this.transaction()?.instrument,
      )[0];
  }
}
