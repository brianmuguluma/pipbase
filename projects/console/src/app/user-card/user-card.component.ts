import { Component, input } from '@angular/core';
import { UserRecord } from '../interfaces/user';
import { RouterLink } from '@angular/router';
import { AvatarComponent } from '../avatar/avatar.component';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
  standalone: true,
  imports: [RouterLink, AvatarComponent],
})
export class UserCardComponent {
  user = input<UserRecord | undefined>();
  constructor() {}
}
