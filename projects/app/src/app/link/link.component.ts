import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AppComponent } from '../app.component';
import { addIcons } from 'ionicons';
import { link } from 'ionicons/icons';
import { IonChip, IonIcon, IonLabel } from '@ionic/angular/standalone';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
  standalone: true,
  imports: [RouterLink, IonChip, IonIcon, IonLabel],
})
export class LinkComponent {
  label = input.required<string>();
  route = input<string[]>();

  constructor(public app: AppComponent) {
    addIcons({ link });
  }
}
