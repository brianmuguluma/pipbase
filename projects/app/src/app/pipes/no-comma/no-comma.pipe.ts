import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noComma',
})
export class NoCommaPipe implements PipeTransform {
  transform(value: string): string {
    return value.replace(',', '').replace('.', '');
  }
}
