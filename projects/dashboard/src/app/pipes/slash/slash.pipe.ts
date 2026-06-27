import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'slash',
  standalone: true,
})
export class SlashPipe implements PipeTransform {
  transform(value: string | null | undefined): string | null | undefined {
    return value ? value.split('_').join('/') : value;
  }
}
