import { Component, OnInit, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ToastOptions } from '@ionic/angular/standalone';
import { AblyService } from '../services/ably/ably.service';
import { HapticsService } from '../services/haptics/haptics.service';
import { ImpactStyle } from '@capacitor/haptics';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { ProjectConfig } from '../interfaces/config';
import { ToastService } from '../services/toast/toast.service';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonToggle,
  IonText,
  IonLabel,
  IonButton,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonToggle,
    IonText,
    IonLabel,
    IonButton,
  ],
})
export class ConfigPage implements OnInit {
  config = signal<ProjectConfig | undefined>(undefined);
  form = signal(
    new FormGroup({
      killSwitch: new FormControl(this.config()?.killSwitch),
      interest: new FormGroup({
        cap: new FormControl(this.config()?.interest.cap),
        rate: new FormControl(this.config()?.interest.rate),
      }),
    }),
  );
  constructor(
    private firestore: Firestore,
    private ably: AblyService,
    private haptics: HapticsService,
    private toast: ToastService,
  ) {}

  ngOnInit() {
    this.getProjectConfig();
  }

  async getProjectConfig() {
    const config = await getDoc(doc(this.firestore, 'config/config'));
    if (config.exists()) this.config.set(config.data() as ProjectConfig);
  }

  async impact() {
    await this.haptics.impact({ style: ImpactStyle.Heavy });
  }

  async updateConfig() {
    const command = 'UPDATE_CONFIG';
    const icon = 'checkmark';
    const message = 'The project config has been updated.';

    const options: ToastOptions = { message, icon };
    const { interest: i, killSwitch } = this.form()?.value;
    const data: ProjectConfig = this.config()!;

    if (i?.cap !== null) data.interest.cap = i?.cap as boolean;
    if (i?.rate !== null) data.interest.rate = i?.rate as number;
    if (killSwitch !== null) data.killSwitch = killSwitch as boolean;

    await setDoc(doc(this.firestore, 'config/config'), data, { merge: true });
    await this.ably.sendSignal({ command, ...data, notes: '' });
    this.toast.present(options);
    this.haptics.notify();
  }
}
