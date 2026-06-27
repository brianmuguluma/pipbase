import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { options, peopleOutline, serverOutline, radio } from 'ionicons/icons';
import {
  IonList,
  IonMenuToggle,
  IonItem,
  IonIcon,
  IonLabel,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [RouterLink, IonList, IonMenuToggle, IonItem, IonIcon, IonLabel],
})
export class MenuComponent {
  constructor() {
    addIcons({ options, peopleOutline, serverOutline, radio });
  }
}
