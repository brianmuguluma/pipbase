import { Component, input } from '@angular/core';

import { UserRecord } from '../interfaces/user';
import { RouterLink } from '@angular/router';
import { FormatRelativePipe } from '../pipes/format-relative/format-relative.pipe';

import { AvatarComponent } from '../avatar/avatar.component';
import { addIcons } from 'ionicons';
import { checkmarkCircle } from 'ionicons/icons';
import {
  IonItem,
  IonAvatar,
  IonLabel,
  IonText,
  IonNote,
  IonIcon,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    FormatRelativePipe,
    AvatarComponent,
    IonItem,
    IonAvatar,
    IonLabel,
    IonText,
    IonNote,
    IonIcon,
  ],
})
export class UserItemComponent {
  user = input.required<UserRecord>();
  constructor() {
    addIcons({ checkmarkCircle });
  }
}
