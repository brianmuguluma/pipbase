import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pips',
  standalone: true,
})
export class PipsPipe implements PipeTransform {
  transform(a: number | string | undefined, b: number | string | undefined) {
    return Number(a) - Number(b);
  }
}
