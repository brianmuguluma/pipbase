import { Component, computed, input } from '@angular/core';
import { AppComponent } from '../app.component';
import { CalculatedPositionState, Position } from '../interfaces/oanda';
import { RouterLink } from '@angular/router';
import { SlashPipe } from '../pipes/slash/slash.pipe';
import { CurrencyPipe, PercentPipe } from '@angular/common';
import { addIcons } from 'ionicons';
import { ellipse } from 'ionicons/icons';
import { IonItem, IonLabel, IonText, IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-position-item',
  templateUrl: './position-item.component.html',
  styleUrls: ['./position-item.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    SlashPipe,
    CurrencyPipe,
    PercentPipe,
    IonItem,
    IonLabel,
    IonText,
    IonIcon,
  ],
})
export class PositionItemComponent {
  position = input<Position | CalculatedPositionState>();
  displayName = computed(() => this.getDisplayName());
  isOpen = computed(
    () =>
      this.app
        .poll()
        ?.state?.positions?.filter(
          (position) => position?.instrument === this.position()?.instrument,
        ).length,
  );
  constructor(public app: AppComponent) {
    addIcons({ ellipse });
  }

  getDisplayName() {
    return this.app
      .instruments()
      ?.filter(
        (instrument) => instrument.name === this.position()?.instrument,
      )?.[0]?.displayName;
  }
}
