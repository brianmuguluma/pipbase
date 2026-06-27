import { Pipe, PipeTransform } from '@angular/core';
import { noCase } from 'change-case';

@Pipe({
  name: 'noCase',
  standalone: true,
})
export class NoCasePipe implements PipeTransform {
  transform(input: string | undefined): string | undefined {
    return input ? noCase(input!) : input;
  }
}
