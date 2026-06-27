import { Component, input } from '@angular/core';
import { UserRecord } from '../interfaces/user';
import { RouterLink } from '@angular/router';
import { AvatarComponent } from '../avatar/avatar.component';

import { UserItemComponent } from '../user-item/user-item.component';
import {
  IonCard,
  IonItem,
  IonAvatar,
  IonLabel,
  IonText,
  IonSkeletonText,
} from '@ionic/angular/standalone';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    AvatarComponent,
    UserItemComponent,
    IonCard,
    IonItem,
    IonAvatar,
    IonLabel,
    IonText,
    IonSkeletonText,
  ],
})
export class UserCardComponent {
  user = input<UserRecord>();
  constructor(public app: AppComponent) {}
}
