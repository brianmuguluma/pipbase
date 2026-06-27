import { Pipe, PipeTransform } from '@angular/core';
import { startOfMonth } from 'date-fns';

@Pipe({
  name: 'startOfMonth',
  standalone: true,
})
export class StartOfMonthPipe implements PipeTransform {
  transform(date: string): string {
    return startOfMonth(new Date(date)).toDateString();
  }
}
