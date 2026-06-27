import { Component, input } from '@angular/core';
import { addIcons } from 'ionicons';
import { informationCircleOutline } from 'ionicons/icons';
import {
  IonButton,
  IonIcon,
  IonPopover,
  IonContent,
  IonText,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
  standalone: true,
  imports: [IonButton, IonIcon, IonPopover, IonContent, IonText],
})
export class TooltipComponent {
  id = crypto.randomUUID();
  tip = input.required<string>();
  constructor() {
    addIcons({ informationCircleOutline });
  }
}
