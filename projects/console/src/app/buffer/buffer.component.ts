import { Component, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AblyService } from '../services/ably/ably.service';
import { ToastService } from '../services/toast/toast.service';

@Component({
  selector: 'app-buffer',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './buffer.component.html',
  styleUrl: './buffer.component.scss',
})
export class BufferComponent {
  form = signal(
    new FormGroup({
      isEnabled: new FormControl<boolean | undefined>(
        undefined,
        Validators.required,
      ),
      notes: new FormControl<string>(''),
    }),
  );
  constructor(
    private ably: AblyService,
    private toast: ToastService,
  ) {}

  async sendSignal() {
    const { isEnabled, notes } = this.form()?.value;

    const command = isEnabled ? 'ENABLE_BUFFER' : 'DISABLE_BUFFER';
    const signal: any = { command, notes };

    await this.ably.sendSignal(signal);
    this.toast.success('Your signal has been sent.');
  }
}
