import { Pipe, PipeTransform } from '@angular/core';
import { formatRelative } from 'date-fns';

@Pipe({
  name: 'formatRelative',
  standalone: true,
})
export class FormatRelativePipe implements PipeTransform {
  transform(timestamp: string | number | undefined): string {
    return formatRelative(new Date(timestamp!), new Date());
  }
}
