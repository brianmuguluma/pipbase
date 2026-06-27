import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  computed,
  signal,
} from '@angular/core';
import { AppComponent } from '../app.component';
import { AuthService } from '../services/auth/auth.service';
import { CurrencyPipe, NgClass, SlicePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AvatarComponent } from '../avatar/avatar.component';
import { BannerComponent } from '../banner/banner.component';
import { AblyService } from '../services/ably/ably.service';
import { AccountSummary } from '../interfaces/oanda/oanda';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [
    NgClass,
    RouterLink,
    CurrencyPipe,
    SlicePipe,
    AvatarComponent,
    BannerComponent,
  ],
})
export class NavbarComponent implements AfterViewInit {
  @ViewChild('header') header: ElementRef | undefined;
  offsetHeight = signal<number | undefined>(undefined);
  displayBanner = computed(() => this.computeBanner());
  constructor(
    public app: AppComponent,
    public auth: AuthService,
    private ably: AblyService,
  ) {}

  ngAfterViewInit() {
    this.observeHeader();
  }

  computeBanner() {
    const auth = this.auth;
    return (
      auth.profile() && auth.idToken() && !auth.idToken()?.claims?.['premium']
    );
  }

  observeHeader() {
    new ResizeObserver((entries) => {
      // console.log(entries);

      for (let entry of entries) {
        this.app.offsetHeight.set(entry.contentRect.height);
      }
    }).observe(this.header?.nativeElement);
  }

  selectAccount(account: AccountSummary) {
    if (!account) return;

    const { id: accountId } = account;
    this.app.updateUserAccountID(accountId);
    const settings: any = { oanda: { credentials: { accountId } } };
    this.ably.sendSignal({ command: 'UPDATE_SETTINGS', ...settings });
  }
}
