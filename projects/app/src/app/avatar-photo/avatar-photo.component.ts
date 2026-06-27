import { Component, input } from '@angular/core';

import { AuthService } from '../services/auth/auth.service';
import { UserRecord } from '../interfaces/user';
import { IonImg } from '@ionic/angular/standalone';

@Component({
  selector: 'app-avatar-photo',
  templateUrl: './avatar-photo.component.html',
  styleUrls: ['./avatar-photo.component.scss'],
  standalone: true,
  imports: [IonImg],
})
export class AvatarPhotoComponent {
  user = input<UserRecord>();
  constructor(public auth: AuthService) {}
}
