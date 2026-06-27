import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'absolute',
  standalone: true,
})
export class AbsolutePipe implements PipeTransform {
  transform(value: number | string | undefined): number {
    return Math.abs(Number(value));
  }
}
