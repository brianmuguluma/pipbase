import { Component, input } from '@angular/core';
import { AppComponent } from '../app.component';

import { RouterModule } from '@angular/router';
import { NoCasePipe } from '../pipes/no-case/no-case.pipe';
import { TitleCasePipe } from '@angular/common';
import { FormatRelativePipe } from '../pipes/formatDistance/formatDistance.pipe';
import { SlashPipe } from '../pipes/slash/slash.pipe';
import { IonItem, IonLabel, IonText, IonNote } from '@ionic/angular/standalone';

@Component({
  selector: 'app-transaction-item',
  templateUrl: './transaction-item.component.html',
  styleUrls: ['./transaction-item.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    NoCasePipe,
    TitleCasePipe,
    FormatRelativePipe,
    SlashPipe,
    IonItem,
    IonLabel,
    IonText,
    IonNote,
  ],
})
export class TransactionItemComponent {
  transaction = input.required<any>();
  constructor(private app: AppComponent) {}
}
