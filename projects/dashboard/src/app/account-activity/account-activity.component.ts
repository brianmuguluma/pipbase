import { Component, computed, effect, signal } from '@angular/core';
import { formatRFC3339, subBusinessDays } from 'date-fns';
import { Transaction, TransactionsResponse } from '../interfaces/oanda/oanda';
import { OandaService } from '../services/oanda/oanda.service';
import { RouterLink } from '@angular/router';
import { NoCasePipe } from '../pipes/no-case/no-case.pipe';
import { AsyncPipe, TitleCasePipe } from '@angular/common';
import { ReasonPipe } from '../pipes/enum/reason.pipe';
import { DurationPipe } from '../pipes/duration/duration.pipe';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-account-activity',
  templateUrl: './account-activity.component.html',
  styleUrls: ['./account-activity.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    NoCasePipe,
    TitleCasePipe,
    AsyncPipe,
    ReasonPipe,
    DurationPipe,
  ],
})
export class AccountActivityComponent {
  response = signal<TransactionsResponse | undefined>(undefined);
  transactions = signal<Transaction[] | any>([]);
  pageSize = signal(10);
  fromDate = computed(() => this.computeFromDate());
  constructor(
    public app: AppComponent,
    private oanda: OandaService,
  ) {
    effect(() => {
      if (app.isReady()) this.getTransactions();
    });
  }

  computeFromDate() {
    return formatRFC3339(subBusinessDays(new Date(), 7));
  }

  async getTransactions() {
    const { data, status } = await this.oanda.getTransactions({
      from: this.fromDate(),
      pageSize: this.pageSize().toString(),
    });

    if (status === 200) {
      this.response.set(data);
      await this.getTransactionsIDRange();
    }
  }

  async getTransactionsIDRange() {
    if (!this.response()?.pages?.length) this.transactions.set([]);
    try {
      let transactions: any[] = [];

      const response = await this.oanda.getTransactionsIDRange(
        this.response()?.pages?.[this.response()?.pages?.length! - 1]!,
      );

      if (!response) return;

      const { data, status } = response;

      if (status === 200 && data.transactions?.length) {
        console.log(data.transactions);

        transactions?.push(...[...data?.transactions?.reverse()]);
        this.transactions.set(transactions);
      }
    } catch (error) {
      console.error(error);
    }
  }
}
