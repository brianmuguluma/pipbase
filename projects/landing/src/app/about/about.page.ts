import { Component } from '@angular/core';
import { DecimalPipe, NgOptimizedImage, PercentPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { AppComponent } from '../app.component';
import { Meta } from '@angular/platform-browser';
import { MissionComponent } from '../mission/mission.component';
import { ValuesComponent } from '../values/values.component';
import { StatementComponent } from '../statement/statement.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    HeaderComponent,
    FooterComponent,
    DecimalPipe,
    PercentPipe,
    MissionComponent,
    ValuesComponent,
    StatementComponent,
    NgOptimizedImage,
  ],
})
export class AboutPage {
  constructor(
    public app: AppComponent,
    private meta: Meta,
  ) {
    meta.addTags([{ name: 'description', content: 'About us' }]);
  }
}
