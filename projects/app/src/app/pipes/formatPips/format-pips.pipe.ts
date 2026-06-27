import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatPips',
  standalone: true,
})
export class FormatPipsPipe implements PipeTransform {
  transform(
    pips: number | string | undefined,
    pipLocation: number | undefined,
  ): number {
    return Number(pips) * 10 ** Math.abs(pipLocation!);
  }
}
