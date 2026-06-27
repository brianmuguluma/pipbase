import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'average',
})
export class AveragePipe implements PipeTransform {
  transform(type: number): string {
    switch (type) {
      case 0:
        return 'SMA';
      case 1:
        return 'EMA';
      case 2:
        return 'WMA';
      case 3:
        return 'DEMA';
      case 4:
        return 'TEMA';
      case 5:
        return 'TRIMA';
      case 6:
        return 'KAMA';
      case 7:
        return 'MAMA';
      case 8:
        return 'T3';
    }
    return null;
  }
}
