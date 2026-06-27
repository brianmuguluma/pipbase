import { Pipe, PipeTransform } from '@angular/core';
import { pascalCase } from 'change-case';

@Pipe({
  name: 'reason',
  standalone: true,
})
export class ReasonPipe implements PipeTransform {
  async transform(reason: string, type: string) {
    const regex = type.match('REJECT');
    if (regex !== null) {
      type = type.slice(0, regex.index);
    }
    const types = await import('src/app/interfaces/oanda/oanda');
    return (types as any)[`${pascalCase(type)}Reason`]?.[reason];
  }
}
