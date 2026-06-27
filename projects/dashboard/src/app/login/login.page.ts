import { Component, effect, signal } from '@angular/core';

import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
})
export class LoginPage {
  isRegistered = signal(true);
  form = signal(
    new FormGroup({
      email: new FormControl('', Validators.required),
      displayName: new FormControl(
        '',
        this.isRegistered() ? null : Validators.required,
      ),
      password: new FormControl('', Validators.required),
    }),
  );
  constructor(
    public auth: AuthService,
    private router: Router,
  ) {
    effect(() => {
      if (auth.profile()) {
        this.router.navigateByUrl('/');
        this.form().reset();
      }
      if (auth.profile() === null) auth.clearPreferences();
    });
  }

  authenticateUser() {
    if (this.isRegistered()) {
      this.signInWithEmailAndPassword();
    } else {
      this.createUserWithEmailAndPassword();
    }
  }

  async signInWithEmailAndPassword() {
    const { email, password } = this.form().value;
    await this.auth.signInWithEmailAndPassword(email!, password!);
  }

  async createUserWithEmailAndPassword() {
    const { displayName, email, password } = this.form().value;

    await this.auth.createUserWithEmailAndPassword(email!, password!);
    await this.auth.updateProfile({ displayName });
  }

  updateAuthType(event: any) {
    this.isRegistered = event.detail.value;
  }
}
