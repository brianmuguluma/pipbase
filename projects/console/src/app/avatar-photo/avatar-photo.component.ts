import { Component, input } from '@angular/core';

import { AuthService } from '../services/auth/auth.service';
import { UserRecord } from '../interfaces/user';

@Component({
  selector: 'app-avatar-photo',
  templateUrl: './avatar-photo.component.html',
  styleUrls: ['./avatar-photo.component.scss'],
  standalone: true,
})
export class AvatarPhotoComponent {
  user = input<UserRecord>();
  constructor(public auth: AuthService) {}
}
