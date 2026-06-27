import { Component, computed, signal } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AppComponent } from '../app.component';
import { AblyService } from '../services/ably/ably.service';
import { ToastService } from '../services/toast/toast.service';
import { formatRFC3339 } from 'date-fns';
import { orderBy } from 'lodash-es';
import { Instrument, OrderType, TimeInForce } from '../interfaces/oanda';
import { NoCasePipe } from '../pipes/no-case/no-case.pipe';
import { TimeInForcePipe } from '../pipes/time-in-force/time-in-force.pipe';
import { OrderSignal } from '../interfaces/signal';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.page.html',
  styleUrls: ['./order-create.page.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, NoCasePipe, TitleCasePipe, TimeInForcePipe],
})
export class OrderCreatePage {
  instrument = signal<Instrument | undefined>(undefined);
  instruments = computed(() => this.computeInstruments());
  orderTypes = signal<OrderType[]>([
    'MARKET',
    'MARKET_IF_TOUCHED',
    'LIMIT',
    'STOP',
  ]);
  min = signal(new Date().toISOString());
  orderType = signal<OrderType>('MARKET');
  forces = signal<TimeInForce[]>(['GFD', 'GTC', 'GTD']);
  timeInForce = signal<TimeInForce | undefined>(undefined);
  form = signal(
    new FormGroup({
      side: new FormControl('', Validators.required),
      percentage: new FormControl(1, Validators.required),
      price: new FormControl(''),
      datetime: new FormControl(''),
      takeProfit: new FormControl(''),
      stopLoss: new FormControl(''),
      trailingStopLoss: new FormControl(''),
      notes: new FormControl(''),
    }),
  );
  isPriceRequired = computed(() => this.computeIfPriceIsRequired());
  isExpirationRequired = computed(() => this.computeIfExpirationIsRequired());
  isPublishing = signal(false);
  constructor(
    public app: AppComponent,
    private ably: AblyService,
    private toast: ToastService,
  ) {}

  computeIfPriceIsRequired() {
    return (
      this.orderType() === 'MARKET_IF_TOUCHED' ||
      this.orderType() === 'LIMIT' ||
      this.orderType() === 'STOP'
    );
  }

  computeIfExpirationIsRequired() {
    return (
      this.orderType() === 'MARKET_IF_TOUCHED' ||
      this.orderType() === 'LIMIT' ||
      this.orderType() === 'STOP'
    );
  }

  computeInstruments() {
    this.app.instruments();
    return orderBy(this.app.instruments(), (i) => i.displayName);
  }

  selectType(event: any) {
    if (event.value === undefined) return;
    this.orderType.set(event.value);
  }

  selectInstrument(event: any) {
    if (event.value === undefined) return;
    this.instrument.set(this.filterInstruments(event.value));
  }

  selectTimeInForce(event: any) {
    this.timeInForce.set(event.value);
  }

  filterInstruments(instrument: string) {
    return this.app.instruments()?.filter((i) => i.name === instrument)[0];
  }

  async sendSignal() {
    if (!this.instrument() || this.form().invalid) return;

    this.isPublishing.set(true);

    const {
      percentage,
      side,
      stopLoss,
      takeProfit,
      trailingStopLoss,
      price,
      datetime,
      notes,
    } = this.form()?.value;

    if (this.orderType() !== 'MARKET' && !price) return;

    const signal: OrderSignal = {
      command: 'CREATE_ORDER',
      notes,
      side,
      percentage: percentage! / 100,
      instrument: this.instrument()?.name,
      type: this.orderType(),
    };

    if (stopLoss) signal.stopLossOnFill = { price: stopLoss };
    if (takeProfit) signal.takeProfitOnFill = { price: takeProfit };
    if (trailingStopLoss)
      signal.trailingStopLossOnFill = { distance: trailingStopLoss };

    if (this.isPriceRequired()) signal.price = price;

    if (this.orderType() !== 'MARKET') {
      signal.timeInForce = this.timeInForce()!;
      if (this.timeInForce() === 'GTD')
        signal.gtdTime = formatRFC3339(new Date(datetime!));
    }

    await this.ably.sendSignal(signal);
    this.toast.present('Your signal has been sent.');
  }
}
