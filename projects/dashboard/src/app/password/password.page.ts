import { Component, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast/toast.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
})
export class PasswordPage {
  form = signal(
    new FormGroup({
      email: new FormControl('', Validators.required),
    }),
  );

  constructor(
    private auth: AuthService,
    private toast: ToastService,
    private router: Router,
  ) {}

  async sendPasswordResetEmail() {
    const { email } = this.form()?.value;
    await this.auth.sendPasswordResetEmail(email!);
    this.toast.present(`A reset email has been sent to ${email}.`);
    this.router.navigateByUrl('/');
  }
}
