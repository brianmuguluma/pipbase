import { Component, computed, effect, signal } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AppComponent } from '../app.component';
import { CapacitorHttp, HttpOptions } from '@capacitor/core';
import { OandaService } from '../services/oanda/oanda.service';
import { addIcons } from 'ionicons';
import { serverOutline } from 'ionicons/icons';
import {
  IonText,
  IonCard,
  IonItem,
  IonIcon,
  IonLabel,
  IonButton,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-credentials',
  templateUrl: './credentials.component.html',
  styleUrls: ['./credentials.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    IonText,
    IonCard,
    IonItem,
    IonIcon,
    IonLabel,
    IonButton,
  ],
})
export class CredentialsComponent {
  form = signal(
    new FormGroup({
      key: new FormControl('', Validators.required),
    }),
  );
  key = computed(() => this.form()?.value?.key);
  constructor(
    public app: AppComponent,
    public auth: AuthService,
    private oanda: OandaService,
  ) {
    addIcons({ serverOutline });
    effect(() => this.updateForm());
  }

  updateForm() {
    if (!this.auth.settings()) return;

    const { apiKey: key } = this.auth.credentials()!;
    this.form().patchValue({ key });
  }

  async updateAPIKey() {
    if (this.key()) {
      if ((await this.validateKey(false)) || (await this.validateKey(true))) {
        this.oanda.setApiKey(this.key()!);
        return;
      }
    }
  }

  async validateKey(isPaperTrading: boolean) {
    const options: HttpOptions = {
      headers: {
        Authorization: `Bearer ${this.key()}`,
      },
      url: `https://api-${
        isPaperTrading ? 'fxpractice' : 'fxtrade'
      }.oanda.com/v3/accounts`,
    };
    const { status } = await CapacitorHttp.get(options);
    if (status !== 200) return;
    return status === 200 ? true : false;
  }
}
