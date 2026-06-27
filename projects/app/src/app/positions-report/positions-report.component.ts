import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  computed,
  input,
  signal,
} from '@angular/core';

import { SpinnerComponent } from '../spinner/spinner.component';
import { OrderFillTransaction, Trade } from '../interfaces/oanda';
import { Chart, ChartDataset, ChartType } from 'chart.js';
import { uniq } from 'lodash-es';
import { PositionAccordionComponent } from '../position-accordion/position-accordion.component';
import { SlashPipe } from '../pipes/slash/slash.pipe';
import {
  IonText,
  IonAccordionGroup,
  IonAccordion,
  IonItem,
  IonLabel,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-positions-report',
  templateUrl: './positions-report.component.html',
  styleUrls: ['./positions-report.component.scss'],
  standalone: true,
  imports: [
    SpinnerComponent,
    PositionAccordionComponent,
    SlashPipe,
    IonText,
    IonAccordionGroup,
    IonAccordion,
    IonItem,
    IonLabel,
  ],
})
export class PositionsReportComponent implements AfterViewInit {
  @ViewChild('canvas') canvas: ElementRef | undefined;
  transactions = input.required<OrderFillTransaction[]>();
  tradeInputs = input.required<Trade[]>();
  instruments = computed(() => this.computeInstruments());
  chart: Chart | undefined;
  chartType: ChartType = 'bar';
  datasets = signal<any[]>([]);
  positions = signal<any[]>([]);
  constructor() {}

  ngAfterViewInit() {
    if (!this.transactions().length) return;
    this.aggregateDatesByInstrument();
  }

  aggregateDatesByInstrument() {
    let count;
    this.instruments()?.forEach((instrument) => {
      count = this.transactions().filter(
        (t) => t.instrument === instrument,
      )?.length;

      this.datasets().push(count);
      this.positions()?.push({ instrument: instrument, count });
    });

    // this.createChart();
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
        animations: {
          radius: {
            duration: 400,
            easing: 'linear',
            loop: (context) => context.active,
          },
        },
        plugins: {
          title: {
            display: true,
            text: 'Trades per Position',
          },
          legend: { display: false },
        },
      },
      data: {
        labels: this.instruments()?.map((instrument) =>
          instrument.split('_').join('/'),
        ),
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
    });
    return datasets;
  }

  computeInstruments() {
    return uniq(
      this.tradeInputs()
        .filter((t) => t.instrument)
        .map((t) => t.instrument),
    );
  }
}
