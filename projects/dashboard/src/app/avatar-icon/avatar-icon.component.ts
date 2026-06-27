import { Component, input } from '@angular/core';
import { UserRecord } from '../interfaces/user/user';

@Component({
  selector: 'app-avatar-icon',
  templateUrl: './avatar-icon.component.html',
  styleUrls: ['./avatar-icon.component.scss'],
  standalone: true,
})
export class AvatarIconComponent {
  user = input<UserRecord>();
  constructor() {}
}
