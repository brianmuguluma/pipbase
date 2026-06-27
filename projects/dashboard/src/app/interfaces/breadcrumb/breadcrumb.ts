import { Params } from '@angular/router';

export interface Breadcrumb {
  title: string;
  route: string;
  queryParams?: Params;
}
