import { Pipe, PipeTransform } from '@angular/core';
import { TransactionRejectReason } from 'src/app/interfaces/oanda/oanda';

@Pipe({
  name: 'rejectReason',
  standalone: true,
})
export class RejectReasonPipe implements PipeTransform {
  transform(value: string): string {
    return (TransactionRejectReason as any)[value];
  }
}
