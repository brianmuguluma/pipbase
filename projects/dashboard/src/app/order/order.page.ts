import {
  Component,
  Input,
  computed,
  effect,
  input,
  signal,
} from '@angular/core';
import { DatePipe, DecimalPipe, NgClass, TitleCasePipe } from '@angular/common';
import { AppComponent } from '../app.component';
import { RouterLink } from '@angular/router';
import { OandaService } from '../services/oanda/oanda.service';
import { OandaError, Order } from '../interfaces/oanda/oanda';
import { glossary } from '../glossary';
import { SpinnerComponent } from '../spinner/spinner.component';
import { NoCasePipe } from '../pipes/no-case/no-case.pipe';
import { SlashPipe } from '../pipes/slash/slash.pipe';
import { TooltipComponent } from '../tooltip/tooltip.component';
import { TimeInForcePipe } from '../pipes/enum/time-in-force.pipe';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';
import { OrderBadgeComponent } from '../order-badge/order-badge.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { HeaderComponent } from '../header/header.component';
import { TitleService } from '../services/title/title.service';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
  standalone: true,
  imports: [
    NgClass,
    SpinnerComponent,
    NoCasePipe,
    TitleCasePipe,
    SlashPipe,
    DecimalPipe,
    DatePipe,
    TooltipComponent,
    TimeInForcePipe,
    BreadcrumbsComponent,
    RouterLink,
    OrderBadgeComponent,
    TimeInForcePipe,
    PageNotFoundComponent,
    HeaderComponent,
    FooterComponent,
  ],
})
export class OrderPage {
  id = input<string>();
  instrument = computed(() => this.getInstrument());
  order = signal<Order | undefined>(undefined);
  glossary = signal(glossary);
  error = signal<OandaError | undefined>(undefined);
  status = signal<number | undefined>(undefined);
  constructor(
    public app: AppComponent,
    private oanda: OandaService,
    private title: TitleService,
  ) {
    effect(() => {
      if (app.isReady()) this.getOrder();
    });
  }

  async getOrder() {
    if (!this.app.account()?.id) return;

    const { data, status } = await this.oanda.getOrder(this.id()!);

    this.status.set(status);

    if (status !== 200) this.error.set(data);

    if (status === 200) {
      this.title.setTitle(`Order ${this.id()}`);
      this.order.set(data.order);
    }
  }

  getInstrument() {
    return this.app
      .instruments()
      ?.filter((instrument) => instrument.name === this.order()?.instrument)[0];
  }
}
