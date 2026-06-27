import { Component, OnInit, signal } from '@angular/core';
import { IonNote, IonText } from '@ionic/angular/standalone';
import { AppComponent } from '../app.component';
import { AppInfo } from '@capacitor/app';
import { AppService } from '../services/app/app.service';

@Component({
  selector: 'app-version',
  templateUrl: './version.component.html',
  styleUrls: ['./version.component.scss'],
  standalone: true,
  imports: [IonNote],
})
export class VersionComponent implements OnInit {
  info = signal<AppInfo | undefined>(undefined);
  constructor(
    public app: AppComponent,
    private appService: AppService,
  ) {}

  async ngOnInit() {
    this.info.set(await this.appService.getInfo());
  }
}
