import { Component, computed, signal } from '@angular/core';
import { AppComponent } from '../app.component';
import { CurrencyPipe, PercentPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AbsolutePipe } from '../pipes/absolute/absolute.pipe';
import { addMonths, differenceInBusinessDays } from 'date-fns';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
  standalone: true,
  imports: [CurrencyPipe, PercentPipe, FormsModule, AbsolutePipe],
})
export class CalculatorComponent {
  months = signal(1);
  differenceInBusinessDays = computed(() =>
    this.computeDifferenceInBusinessDays(),
  );
  change = computed(() => this.computeChange());
  value = computed(() => this.computeValue());
  earnings = computed(() => this.computeEarnings());
  principal = signal<number>(100);
  constructor(public app: AppComponent) {}

  computeDifferenceInBusinessDays() {
    return Math.abs(differenceInBusinessDays(new Date(), this.addMonths()));
  }

  computeEarnings() {
    return this.value()! - this.principal()!;
  }

  computeValue() {
    return this.principal()
      ? Math.abs(
          this.principal()! *
            (1 + this.app.interest()) ** this.differenceInBusinessDays(),
        )
      : 0;
  }

  computeChange() {
    const start = this.principal();
    const end = start + this.earnings();
    return this.getPercentageChange(start, end);
  }

  getPercentageChange(start: number | string, end: number | string): number {
    return (Number(end) - Number(start)) / Number(start);
  }

  updateMonths(event: any) {
    this.months.set(event.value as number);
  }

  addMonths() {
    return addMonths(new Date(), this.months());
  }
}
