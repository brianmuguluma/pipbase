import { Component, signal } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import { TransactionFilters, transactionFilters } from '../interfaces/oanda';
import { NoCasePipe } from '../pipes/no-case/no-case.pipe';
import { TitleCasePipe } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonText,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
  standalone: true,
  imports: [
    NoCasePipe,
    TitleCasePipe,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonText,
  ],
})
export class FilterPage {
  filters = signal(transactionFilters);
  constructor(private modalController: ModalController) {}

  async dismissWithData(filter: TransactionFilters | null) {
    await this.modalController.dismiss(filter);
  }

  async dismiss() {
    await this.modalController.dismiss();
  }
}
