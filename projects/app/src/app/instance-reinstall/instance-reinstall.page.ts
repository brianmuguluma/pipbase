import { Component, signal } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import { AblyService } from '../services/ably/ably.service';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
  IonFooter,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-instance-reinstall',
  templateUrl: './instance-reinstall.page.html',
  styleUrls: ['./instance-reinstall.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonContent,
    IonFooter,
  ],
})
export class InstanceReinstallPage {
  notes: string = '';
  form = signal(
    new FormGroup({
      notes: new FormControl(''),
    }),
  );
  constructor(
    private modalController: ModalController,
    private ably: AblyService,
  ) {}

  async sendSignal() {
    const signal = { command: 'REINSTALL', notes: this.notes };
    const x = await this.ably.sendSignal(signal);
    this.dismiss();
  }

  async dismiss() {
    this.modalController.dismiss();
  }
}
