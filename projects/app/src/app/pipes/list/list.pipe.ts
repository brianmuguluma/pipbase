import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'list',
})
export class ListPipe implements PipeTransform {
  transform(list: string[]): string {
    const intl: any = Intl;

    return new intl.ListFormat('en', {
      style: 'short',
      type: 'conjunction',
    }).format(list);
  }
}
