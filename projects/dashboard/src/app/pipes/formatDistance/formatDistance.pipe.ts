import { Pipe, PipeTransform } from '@angular/core';
import { sentenceCase } from 'change-case';
import { intlFormatDistance } from 'date-fns';

@Pipe({
  name: 'formatDistance',
  standalone: true,
})
export class FormatDistancePipe implements PipeTransform {
  transform(timestamp: string | number | undefined): string {
    return timestamp
      ? sentenceCase(intlFormatDistance(new Date(timestamp), new Date()))
      : '';
  }
}
