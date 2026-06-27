import { Component, computed, input } from '@angular/core';
import { AppComponent } from '../app.component';
import { CalculatedPositionState, Position } from '../interfaces/oanda/oanda';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { SlashPipe } from '../pipes/slash/slash.pipe';

@Component({
  selector: 'app-position-item',
  templateUrl: './position-item.component.html',
  styleUrls: ['./position-item.component.scss'],
  standalone: true,
  imports: [RouterLink, CurrencyPipe, SlashPipe],
})
export class PositionItemComponent {
  position = input<Position>();
  calculatedPositionState = input<CalculatedPositionState>();
  instrument = computed(() => this.computeInstrument());
  displayName = computed(() => this.getDisplayName());
  isOpen = computed(() => this.computeIsOpen());
  constructor(public app: AppComponent) {}

  computeInstrument() {
    return this.isOpen()
      ? this.calculatedPositionState()?.instrument
      : this.position()?.instrument;
  }

  computeIsOpen() {
    return this.app
      .poll()
      ?.state?.positions?.filter(
        (p) => p?.instrument === this.position()?.instrument,
      ).length;
  }

  getDisplayName() {
    return this.app
      .instruments()
      ?.filter((i) => i.name === this.instrument())[0].displayName;
  }
}
