import { Pipe, PipeTransform } from '@angular/core';
import { sentenceCase } from 'change-case';

@Pipe({
  name: 'sentenceCase',
})
export class SentenceCasePipe implements PipeTransform {
  transform(input: string): string {
    if (input) {
      return sentenceCase(input);
    }
  }
}
