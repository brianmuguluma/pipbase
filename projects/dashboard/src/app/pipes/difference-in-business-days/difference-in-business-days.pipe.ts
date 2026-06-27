import { Pipe, PipeTransform } from '@angular/core';
import { differenceInBusinessDays } from 'date-fns';

@Pipe({
  name: 'differenceInBusinessDays',
  standalone: true,
})
export class DifferenceInBusinessDaysPipe implements PipeTransform {
  transform(dateLeft: string, dateRight: string): number {
    return differenceInBusinessDays(new Date(dateLeft), new Date(dateRight));
  }
}
