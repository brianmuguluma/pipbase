import { Component, computed, effect, signal } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';
import { DatePipe, NgClass, TitleCasePipe } from '@angular/common';
import { SpinnerComponent } from '../spinner/spinner.component';
import { Instance, Instances } from '../interfaces/vultr/vultr';
import { AppComponent } from '../app.component';
import { VultrService } from '../services/vultr/vultr.service';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { InstanceComponent } from '../instance/instance.component';
import { BotComponent } from '../bot/bot.component';

@Component({
  selector: 'app-server',
  templateUrl: './server.page.html',
  styleUrls: ['./server.page.scss'],
  standalone: true,
  imports: [
    BreadcrumbsComponent,
    NgClass,
    TitleCasePipe,
    DatePipe,
    SpinnerComponent,
    PageNotFoundComponent,
    HeaderComponent,
    FooterComponent,
    InstanceComponent,
    BotComponent,
  ],
})
export class ServerPage {
  botPopover = signal(crypto.randomUUID());
  instances = signal<Instances | undefined>(undefined);
  instance = computed<Instance | undefined>(() => this.computeInstance());
  constructor(
    public app: AppComponent,
    public auth: AuthService,
    private vultr: VultrService,
  ) {
    effect(() => {
      if (auth.profile()) this.getInstance();
    });
  }

  async getInstance() {
    try {
      const parameters = { label: this.auth.profile()?.uid };
      const { data } = await this.vultr.listInstances({ parameters });
      this.instances.set(data as Instances);
    } catch (error) {
      console.error(error);
    }
  }

  computeInstance() {
    return this.instances()?.instances[0];
  }
}
