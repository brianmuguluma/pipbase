import { Component, effect, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserRecord } from '../interfaces/user';
import { UsersService } from '../services/users/users.service';
import { AvatarComponent } from '../avatar/avatar.component';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-users-card',
  templateUrl: './users-card.component.html',
  styleUrls: ['./users-card.component.scss'],
  standalone: true,
  imports: [RouterLink, AvatarComponent],
})
export class UsersCardComponent {
  users = signal<UserRecord[] | undefined>(undefined);
  maxResults = signal(10);
  constructor(
    private auth: AuthService,
    private usersService: UsersService,
  ) {
    effect(() => {
      if (this.auth.profile()) this.listUsers();
    });
  }

  async listUsers() {
    const { data } = await this.usersService.listUsers({
      maxResults: this.maxResults(),
    });
    this.users.set((data as any).users);
  }
}
