import { Pipe, PipeTransform } from '@angular/core';
import { fromUnixTime } from 'date-fns';

@Pipe({
  name: 'toDate',
  standalone: true,
})
export class ToDatePipe implements PipeTransform {
  transform(date: number): Date {
    return fromUnixTime(date);
  }
}
