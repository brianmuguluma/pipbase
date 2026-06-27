import { Component, input, signal } from '@angular/core';
import { Breadcrumb } from '../interfaces/breadcrumb/breadcrumb';

import { QueryParamsHandling, RouterLink } from '@angular/router';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
  standalone: true,
  imports: [RouterLink],
})
export class BreadcrumbsComponent {
  breadcrumbs = input<Breadcrumb[]>();
  queryParamsHandling = signal<QueryParamsHandling>('merge');
  constructor() {}
}
