import { Pipe, PipeTransform } from '@angular/core';
import { getWeekOfMonth } from 'date-fns';

@Pipe({
  name: 'weekOfMonth',
  standalone: true,
})
export class WeekOfMonthPipe implements PipeTransform {
  transform(date: string | number | Date): number {
    console.log(date);

    return getWeekOfMonth(new Date(date));
  }
}
