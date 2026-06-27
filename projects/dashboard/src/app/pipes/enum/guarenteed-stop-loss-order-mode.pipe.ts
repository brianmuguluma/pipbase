import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'guarenteedStopLossOrderMode',
  standalone: true,
})
export class GuarenteedStopLossOrderModePipe implements PipeTransform {
  transform(
    guarenteedStopLossOrderMode: string | undefined,
  ): string | undefined {
    switch (guarenteedStopLossOrderMode) {
      case 'DISABLED':
        return 'The Account is not permitted to create guaranteed Stop Loss Orders.';
      case 'ALLOWED':
        return 'The Account is able, but not required to have guaranteed Stop Loss Orders for open Trades.';
      case 'REQUIRED':
        return 'The Account is required to have guaranteed Stop Loss Orders for all open Trades.';
      default:
        return guarenteedStopLossOrderMode;
    }
  }
}
