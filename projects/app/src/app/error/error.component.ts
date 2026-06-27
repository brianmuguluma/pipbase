import { Component, input } from '@angular/core';
import { OandaError } from '../interfaces/oanda';
import { NoCasePipe } from '../pipes/no-case/no-case.pipe';
import { IonText } from '@ionic/angular/standalone';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
  standalone: true,
  imports: [IonText, NoCasePipe],
})
export class ErrorComponent {
  status = input<number>();
  page = input<string>();
  error = input<OandaError>();
  constructor() {}
}
