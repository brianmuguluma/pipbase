import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toNumber',
  standalone: true,
})
export class ToNumberPipe implements PipeTransform {
  transform(value: string | undefined): number {
    return Number(value);
  }
}
