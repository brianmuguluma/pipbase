import { Component, computed, effect, signal } from '@angular/core';
import { PositionStateFilter } from '../interfaces/oanda/oanda';
import { AppComponent } from '../app.component';
import { CurrencyPipe, NgClass, TitleCasePipe } from '@angular/common';
import { PositionItemComponent } from '../position-item/position-item.component';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';
import { SpinnerComponent } from '../spinner/spinner.component';
import { orderBy } from 'lodash-es';
import { SlashPipe } from '../pipes/slash/slash.pipe';
import {
  ActivatedRoute,
  Params,
  QueryParamsHandling,
  Router,
  RouterLink,
} from '@angular/router';
import { EmptyComponent } from '../empty/empty.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { capitalCase } from 'change-case';
import { TitleService } from '../services/title/title.service';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.page.html',
  styleUrls: ['./positions.page.scss'],
  standalone: true,
  imports: [
    NgClass,
    PositionItemComponent,
    TitleCasePipe,
    BreadcrumbsComponent,
    SpinnerComponent,
    SlashPipe,
    CurrencyPipe,
    EmptyComponent,
    HeaderComponent,
    FooterComponent,
    RouterLink,
  ],
})
export class PositionsPage {
  positions = computed(() => this.computePositions());
  openPositions = computed(() => this.app.poll()?.state?.positions);
  iteratee = signal('instrument');
  iteratees = signal(['instrument', 'pl']);
  order = signal<'asc' | 'desc'>('asc');
  isEmpty = false;
  positionStateFilters = signal<PositionStateFilter[]>(['ALL', 'OPEN']);
  positionStateFilter = signal<PositionStateFilter>('ALL');
  queryParams = signal<Params>({});
  queryParamsHandling = signal<QueryParamsHandling>('merge');
  constructor(
    public app: AppComponent,
    private title: TitleService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    effect(() => {
      const state =
        this.positionStateFilter() && this.positionStateFilter() !== 'ALL'
          ? capitalCase(this.positionStateFilter())
          : '';
      this.title.setTitle(`${state} Positions`);
    });
    route.queryParamMap.subscribe((params) => {
      const state = params.get('state');
      this.positionStateFilter.set(state ? (state as any) : 'ALL');
    });
  }

  computePositions() {
    return orderBy(
      this.app.account()?.positions,
      (position: any) =>
        this.iteratee() === 'pl'
          ? Number(position[this.iteratee()])
          : position[this.iteratee()],
      this.order(),
    );
  }

  updateSortBy(iteratee: any) {
    const { value } = iteratee;
    this.iteratee.set(value);
    this.order.set(value === 'pl' ? 'desc' : 'asc');
  }

  updatePositionStateFilter(state: PositionStateFilter) {
    if (state === this.positionStateFilter()) return;
    const queryParams = {
      state: state === 'ALL' ? null : state,
    };
    this.router.navigate([], {
      queryParams,
      queryParamsHandling: this.queryParamsHandling(),
    });
  }

  selectPositionState(event: any) {
    this.updatePositionStateFilter(event.value);
  }
}
