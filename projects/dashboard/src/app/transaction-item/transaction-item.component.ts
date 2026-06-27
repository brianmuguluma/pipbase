import { DatePipe, TitleCasePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SlashPipe } from '../pipes/slash/slash.pipe';
import { NoCasePipe } from '../pipes/no-case/no-case.pipe';

@Component({
  selector: 'app-transaction-item',
  templateUrl: './transaction-item.component.html',
  styleUrls: ['./transaction-item.component.scss'],
  standalone: true,
  imports: [RouterLink, DatePipe, TitleCasePipe, SlashPipe, NoCasePipe],
})
export class TransactionItemComponent {
  transaction = input.required<any>();
  constructor() {}
}
