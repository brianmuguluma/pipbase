import { Component, signal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AblyService } from '../services/ably/ably.service';
import { ToastService } from '../services/toast/toast.service';

@Component({
  selector: 'app-instances-reinstall',
  standalone: true,
  imports: [],
  templateUrl: './instances-reinstall.component.html',
  styleUrl: './instances-reinstall.component.scss',
})
export class InstancesReinstallComponent {
  form = signal(
    new FormGroup({
      notes: new FormControl<string>(''),
    }),
  );
  constructor(
    private ably: AblyService,
    private toast: ToastService,
  ) {}

  async sendSignal() {
    const { notes } = this.form()?.value;

    const signal: any = { command: 'REINSTALL', notes };

    await this.ably.sendSignal(signal);
    this.toast.success('Your signal has been sent.');
  }
}
