import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'regex',
  standalone: true,
})
export class RegexPipe implements PipeTransform {
  transform(pattern: string, word: string): boolean {
    return new RegExp(pattern).test(word);
  }
}
