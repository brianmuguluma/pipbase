import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OandaError } from '../interfaces/oanda/oanda';
import { NoCasePipe } from '../pipes/no-case/no-case.pipe';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
  standalone: true,
  imports: [RouterLink, NoCasePipe],
})
export class PageNotFoundComponent {
  error = input<OandaError>();
  status = input<number>();
  constructor() {}
}
