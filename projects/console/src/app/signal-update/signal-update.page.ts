import { Component, OnInit, input, signal } from '@angular/core';
import { Instrument } from '../interfaces/oanda';
import { AppComponent } from '../app.component';

import { AblyService } from '../services/ably/ably.service';
import {
  FormControl,
  FormControlState,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Signal } from '../interfaces/signal';
import {
  Firestore,
  doc,
  serverTimestamp,
  updateDoc,
} from '@angular/fire/firestore';

const formControlState: FormControlState<number | null> = {
  value: null,
  disabled: false,
};

@Component({
  selector: 'app-signal-update',
  templateUrl: './signal-update.page.html',
  styleUrls: ['./signal-update.page.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
})
export class SignalUpdatePage implements OnInit {
  data = input<Signal>();
  form = signal(
    new FormGroup({
      notes: new FormControl<string>(''),
    }),
  );
  constructor(private firestore: Firestore) {}

  ngOnInit() {
    this.form().controls.notes.setValue(this.data()?.notes!);
  }

  async updateSignal() {
    await updateDoc(doc(this.firestore, `signals/${this.data()?.id}`), {
      notes: this.form().value.notes,
      updatedAt: serverTimestamp(),
    });
    this.dismiss();
  }

  async dismiss() {
    // await this.modalController.dismiss();
  }
}
