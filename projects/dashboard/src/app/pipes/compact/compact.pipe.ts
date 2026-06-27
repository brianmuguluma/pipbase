import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'compact',
  standalone: true,
})
export class CompactPipe implements PipeTransform {
  transform(
    value: number | string | undefined,
    options: Intl.NumberFormatOptions,
  ): string {
    const formatter = Intl.NumberFormat('en', options);
    return formatter.format(Number(value));
  }
}
