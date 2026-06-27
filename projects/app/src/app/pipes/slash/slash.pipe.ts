import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'slash',
  standalone: true,
})
export class SlashPipe implements PipeTransform {
  transform(value: string | undefined): string | undefined {
    return value ? value.split('_').join('/').split('-').join('/') : value;
  }
}
