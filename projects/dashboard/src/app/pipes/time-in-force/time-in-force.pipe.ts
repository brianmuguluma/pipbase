import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeInForce',
})
export class TimeInForcePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
}
