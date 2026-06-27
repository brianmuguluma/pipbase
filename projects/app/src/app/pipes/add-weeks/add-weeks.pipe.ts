import { Pipe, PipeTransform } from '@angular/core';
import { addWeeks } from 'date-fns';

@Pipe({
  name: 'addWeeks',
  standalone: true,
})
export class AddWeeksPipe implements PipeTransform {
  transform(date: string | number | Date, amount: number): Date {
    return addWeeks(new Date(date), amount);
  }
}
