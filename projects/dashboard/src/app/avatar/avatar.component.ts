import { NgClass, SlicePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { UserRecord } from '../interfaces/user/user';
import { Photo } from '@capacitor/camera';
import { AvatarInitialComponent } from '../avatar-initial/avatar-initial.component';
import { AvatarIconComponent } from '../avatar-icon/avatar-icon.component';
import { AvatarPhotoComponent } from '../avatar-photo/avatar-photo.component';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  standalone: true,
  imports: [
    NgClass,
    SlicePipe,
    AvatarInitialComponent,
    AvatarIconComponent,
    AvatarPhotoComponent,
  ],
})
export class AvatarComponent {
  user = input<UserRecord>();
  photo = input<Photo>();
  size = input<string>();
  constructor(public auth: AuthService) {}
}
