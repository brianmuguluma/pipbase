import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'interval',
})
export class IntervalPipe implements PipeTransform {
  transform(interval?: string): string {
    switch (interval) {
      case 'S5':
        return '5 second candlesticks, minute alignment';
      case 'S10':
        return '10 second candlesticks, minute alignment';
      case 'S15':
        return '15 second candlesticks, minute alignment';
      case 'S30':
        return '30 second candlesticks, minute alignment';
      case 'M1':
        return '1 minute candlesticks, minute alignment';
      case 'M2':
        return '2 minute candlesticks, minute alignment';
      case 'M4':
        return '4 minute candlesticks, minute alignment';
      case 'M5':
        return '5 minute candlesticks, minute alignment';
      case 'M10':
        return '10 minute candlesticks, minute alignment';
      case 'M15':
        return '15 minute candlesticks, minute alignment';
      case 'M30':
        return '30 minute candlesticks, minute alignment';
      case 'H1':
        return '1 hour candlesticks, hour alignment';
      case 'H2':
        return '2 hour candlesticks, day alignment';
      default:
        return interval ? interval : '';
    }
  }
}
