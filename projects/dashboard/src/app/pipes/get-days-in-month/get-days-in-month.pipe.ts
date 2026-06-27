import { Pipe, PipeTransform } from '@angular/core';
import { getDaysInMonth } from 'date-fns';

@Pipe({
  name: 'getDaysInMonth',
  standalone: true,
})
export class GetDaysInMonthPipe implements PipeTransform {
  transform(date: string): number {
    return getDaysInMonth(new Date(date));
  }
}
