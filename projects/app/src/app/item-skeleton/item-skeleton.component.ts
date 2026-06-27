import { Component, input } from '@angular/core';
import {
  IonItem,
  IonAvatar,
  IonSkeletonText,
  IonLabel,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-item-skeleton',
  templateUrl: './item-skeleton.component.html',
  styleUrls: ['./item-skeleton.component.scss'],
  standalone: true,
  imports: [IonItem, IonAvatar, IonSkeletonText, IonLabel],
})
export class ItemSkeletonComponent {
  avatar = input<boolean>();
  constructor() {}
}
