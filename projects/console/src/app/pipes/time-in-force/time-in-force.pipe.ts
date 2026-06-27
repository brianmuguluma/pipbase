import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeInForce',
  standalone: true,
})
export class TimeInForcePipe implements PipeTransform {
  transform(timeInForce: string | undefined): string | undefined {
    switch (timeInForce) {
      case 'GTC':
        return 'The Order is “Good unTil Cancelled”';
      case 'GTD':
        return 'The Order is “Good unTil Date” and will be cancelled at the provided time.';
      case 'GFD':
        return 'The Order is “Good For Day” and will be cancelled at 5pm New York time.';
      case 'FOK':
        return 'The Order must be immediately “Filled Or Killed”.';
      case 'IOC':
        return 'The Order must be “Immediately partially filled Or Cancelled”';
      default:
        return timeInForce;
    }
  }
}
