import { Component, EnvironmentInjector, inject } from '@angular/core';

import { AuthService } from '../services/auth/auth.service';
import { AppComponent } from '../app.component';
import { NgClass } from '@angular/common';
import { addIcons } from 'ionicons';
import { home, server, pieChart, listCircle, cog } from 'ionicons/icons';
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  imports: [NgClass, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel],
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);

  constructor(
    public auth: AuthService,
    public app: AppComponent,
  ) {
    addIcons({ home, server, pieChart, listCircle, cog });
  }
}
