import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AppComponent } from 'src/app/app.component';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  constructor(
    private app: AppComponent,
    private title: Title,
  ) {}

  setTitle(newTitle: string) {
    this.title.setTitle(`${newTitle} — ${this.app.project()}`);
  }
}
