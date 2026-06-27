import { Injectable, computed } from '@angular/core';
import {
  ActionSheetController,
  AlertController,
  AlertInput,
  ModalController,
} from '@ionic/angular/standalone';
import { OrderCreatePage } from 'src/app/order-create/order-create.page';
import { AblyService } from '../ably/ably.service';
import { orderBy } from 'lodash-es';
import { AppComponent } from 'src/app/app.component';
import { OrderUpdatePage } from 'src/app/order-update/order-update.page';
// import { PositionClosePartialPage } from 'src/app/position-close-partial/position-close-partial.page';

@Injectable({
  providedIn: 'root',
})
export class SignalService {
  instruments = computed(() => this.computeInstruments());
  constructor(
    public app: AppComponent,
    private modalController: ModalController,
    private alertController: AlertController,
    private actionSheetController: ActionSheetController,
    private ably: AblyService,
  ) {}

  async getSignals() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Signals',
      buttons: [
        {
          text: 'Buffer',
          handler: () => this.createOrder(),
        },
        {
          text: 'New Order',
          handler: () => this.createOrder(),
        },
        {
          text: 'Update Dependants',
          handler: () => this.updateOrder(),
        },
        {
          text: 'Cancel Orders',
          handler: () => this.cancelInstrumentFuturePositions(),
        },
        {
          text: 'Take Partial Profits',
          handler: () => this.takePartialProfit(),
        },
        {
          text: 'Close Positions',
          handler: () => this.closePosition(),
        },
        {
          text: 'Update & Restart Instances',
          handler: () => this.reinstallInstances(),
        },
        {
          text: 'Cancel',
          role: 'cancel',
        },
      ],
    });

    await actionSheet.present();
  }

  async createOrder() {
    const modal = await this.modalController.create({
      component: OrderCreatePage,
    });

    await modal.present();
  }

  async updateOrder() {
    const modal = await this.modalController.create({
      component: OrderUpdatePage,
    });

    await modal.present();
  }

  async takePartialProfit() {
    // const modal = await this.modalController.create({
    //   component: PositionClosePartialPage,
    // });
    // await modal.present();
  }

  async cancelInstrumentFuturePositions() {
    const command = 'CANCEL_FUTURE_ORDERS';

    const alert = await this.alertController.create({
      header: 'Cancel Orders',
      subHeader: 'Select an instrument (optional)',
      message:
        'If no instrument is selected, all pending orders will be cancelled.',
      inputs: this.getInstruments(),
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Cancel Orders',
          role: 'destructive',
          handler: (instrument) =>
            this.ably.sendSignal({ command, instrument }),
        },
      ],
    });

    await alert.present();
  }

  async reinstallInstances() {
    const command = 'REINSTALL';

    const alert = await this.alertController.create({
      header: 'Restart Instances',
      subHeader: 'Are you sure you want to restart all instances?',
      message: 'This will only effect running instances',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Restart',
          role: 'destructive',
          handler: () => this.ably.sendSignal({ command }),
        },
      ],
    });

    await alert.present();
  }

  async closePosition() {
    const command = 'CLOSE_POSITION';

    const alert = await this.alertController.create({
      header: 'Close Position',
      subHeader: 'Select an instrument to close.',
      message: 'This will close all units for the selected instrument.',
      inputs: this.getInstruments(),
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Close',
          role: 'destructive',
          handler: (instrument) => {
            if (instrument) this.ably.sendSignal({ command, instrument });
          },
        },
      ],
    });

    await alert.present();
  }

  getInstruments() {
    return this.instruments().map((instrument) => {
      const { displayName, name } = instrument;
      return {
        label: displayName,
        type: 'radio',
        value: name,
      } as AlertInput;
    });
  }

  computeInstruments() {
    return orderBy(this.app.instruments(), ['displayName']);
  }
}
