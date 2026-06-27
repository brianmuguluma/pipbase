import { Pipe, PipeTransform } from '@angular/core';
import { endOfMonth } from 'date-fns';

@Pipe({
  name: 'endOfMonth',
  standalone: true,
})
export class EndOfMonthPipe implements PipeTransform {
  transform(date: string): string {
    return endOfMonth(new Date(date)).toDateString();
  }
}
