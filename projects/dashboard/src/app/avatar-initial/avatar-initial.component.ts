import { NgClass, SlicePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { UserRecord } from '../interfaces/user/user';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-avatar-initial',
  templateUrl: './avatar-initial.component.html',
  styleUrls: ['./avatar-initial.component.scss'],
  standalone: true,
  imports: [NgClass, SlicePipe],
})
export class AvatarInitialComponent {
  user = input<UserRecord>();
  size = input<string>();
  constructor(public auth: AuthService) {}
}
