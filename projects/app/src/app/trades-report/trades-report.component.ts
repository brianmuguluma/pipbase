import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  computed,
  input,
  signal,
} from '@angular/core';

import { OrderFillTransaction, Trade } from '../interfaces/oanda';
import { CurrencyPipe } from '@angular/common';
import { SpinnerComponent } from '../spinner/spinner.component';
import { AppComponent } from '../app.component';
import { OandaService } from '../services/oanda/oanda.service';
import { Chart, ChartDataset, ChartType } from 'chart.js';
import { format } from 'date-fns';
import { flattenDeep, meanBy, uniq } from 'lodash-es';
import { HttpParams } from '@capacitor/core';
import { IonText, IonCard, IonCardContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-trades-report',
  templateUrl: './trades-report.component.html',
  styleUrls: ['./trades-report.component.scss'],
  standalone: true,
  imports: [SpinnerComponent, CurrencyPipe, IonText, IonCard, IonCardContent],
})
export class TradesReportComponent implements OnInit {
  @ViewChild('canvas') canvas: ElementRef | undefined;
  transactions = input.required<OrderFillTransaction[]>();
  trades = signal<Trade[] | undefined>(undefined);
  chart: Chart | undefined;
  chartType: ChartType = 'bar';
  datasets = signal<any[]>([]);
  minTime = computed(() => this.computeMinTime());
  lowestReturn = computed(() => this.computeLowestReturn());
  highestReturn = computed(() => this.computeHighestReturn());
  averageReturn = computed(() => this.computeAverageReturn());
  constructor(
    public app: AppComponent,
    private oanda: OandaService,
  ) {}

  ngOnInit() {
    this.getTrades();
  }

  async getTrades() {
    const ids = flattenDeep(
      this.transactions()
        .filter((t) => t.tradesClosed)
        .map((t) => t.tradesClosed),
    ).map((t) => t.tradeID);

    const params: HttpParams = {
      state: 'CLOSED',
      ids: ids.join(','),
      count: '500',
    };

    const { data, status } = await this.oanda.getTrades(params);
    if (status === 200) {
      this.trades.set(data.trades);
      this.aggregateDatesByDay();
    }
  }

  aggregateDatesByDay() {
    const dates = uniq(
      this.trades()
        ?.reverse()
        ?.map((trade) => format(new Date(trade?.closeTime), 'yyyy-MM-dd')),
    );

    let count;
    dates?.forEach((date) => {
      count = this.trades()?.filter(
        (trade) => format(new Date(trade?.closeTime), 'yyyy-MM-dd') === date,
      )?.length;

      this.datasets().push({
        date: format(new Date(date), 'do'),
        count,
      });
    });

    this.createChart();
  }

  createChart() {
    this.chart = new Chart(this.canvas?.nativeElement, {
      type: this.chartType,
      options: {
        responsive: true,
        scales: {
          x: {
            // display: false,
            grid: { display: false },
            title: { display: false },
            // ticks: { display: false },
            border: { display: false },
          },
          y: {
            display: false,
            // grid: { display: false },
            // title: { display: false },
            // ticks: { display: false },
            // border: { display: false },
          },
        },
        parsing: {
          xAxisKey: 'date',
          yAxisKey: 'count',
        },
        plugins: {
          legend: { display: false },
          title: {
            display: true,
            text: 'Trades per Day',
          },
        },
      },
      data: {
        labels: this.datasets()?.map((bar) => bar.date),
        datasets: this.getDatasets(),
      },
    });
  }

  getDatasets(): ChartDataset[] {
    const datasets: ChartDataset[] = [];
    const type = this.chartType;
    const borderWidth: number = type === 'line' ? 2 : 0;
    const borderRadius: number = type === 'line' ? 0 : Number.MAX_VALUE;
    const pointRadius = 0;
    const tension = 0.4;
    const primary = '56, 128, 255';
    datasets.push({
      type,
      tension,
      borderRadius,
      borderWidth,
      pointRadius,
      backgroundColor: `rgba(${primary})`,
      data: this.datasets(),
      borderSkipped: false,
    });
    return datasets;
  }

  computeAverageReturn() {
    return meanBy(this.trades(), (trade) => Number(trade.realizedPL));
  }

  computeHighestReturn() {
    if (this.trades()?.length)
      return Math.max(
        ...(this.trades()?.map((trade) =>
          Number(trade.realizedPL),
        ) as number[]),
      );
    return 0;
  }

  computeLowestReturn() {
    if (this.trades()?.length)
      return Math.min(
        ...(this.trades()?.map((trade) =>
          Number(trade.realizedPL),
        ) as number[]),
      );
    return 0;
  }

  computeMinTime() {
    // if (this.trades()?.length) {
    //   const seconds = this.trades()?.map((trade) =>
    //     differenceInSeconds(new Date(trade.closeTime), new Date(trade.openTime))
    //   );
    //   return Math.min(...seconds!);
    // }
    return;
  }
}
