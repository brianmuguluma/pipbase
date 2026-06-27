import { Routes } from '@angular/router';
import {
  canActivate,
  hasCustomClaim,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';

const app = 'Pipbase';

const admin = () => hasCustomClaim('admin');
const premium = () => hasCustomClaim('premium');

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
    title: app,
  },
  {
    path: 'exchange',
    loadComponent: () =>
      import('./exchange/exchange.page').then((m) => m.ExchangePage),
    title: 'Exchange',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then((m) => m.LoginPage),
    title: 'Login',
  },
  {
    path: 'instruments',
    loadComponent: () =>
      import('./instruments/instruments.page').then((m) => m.InstrumentsPage),
    title: 'Instruments',
  },
  {
    path: 'trades/:id',
    loadComponent: () => import('./trade/trade.page').then((m) => m.TradePage),
    title: 'Trade',
  },
  {
    path: 'orders/:id',
    loadComponent: () => import('./order/order.page').then((m) => m.OrderPage),
    title: 'Order',
  },
  {
    path: 'transactions/:id',
    loadComponent: () =>
      import('./transaction/transaction.page').then((m) => m.TransactionPage),
    title: 'Transaction',
  },
  {
    path: 'sub-account',
    loadComponent: () =>
      import('./sub-account/sub-account.page').then((m) => m.SubAccountPage),
    title: 'Account',
  },
  {
    path: 'intervals',
    loadComponent: () =>
      import('./intervals/intervals.page').then((m) => m.IntervalsPage),
    title: 'Intervals',
  },
  {
    path: 'server',
    loadComponent: () =>
      import('./server/server.page').then((m) => m.ServerPage),
    title: 'Server',
  },
  {
    path: 'reports',
    loadComponent: () =>
      import('./reports/reports.page').then((m) => m.ReportsPage),
    title: 'Reports',
  },
  {
    path: 'reports/:date',
    loadComponent: () =>
      import('./report/report.page').then((m) => m.ReportPage),
    title: 'Report',
  },
  {
    path: 'features',
    loadComponent: () =>
      import('./features/features.page').then((m) => m.FeaturesPage),
    title: 'Features',
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./settings/settings.page').then((m) => m.SettingsPage),
    title: 'Settings',
  },
  {
    path: 'filter',
    loadComponent: () =>
      import('./filter/filter.page').then((m) => m.FilterPage),
    title: 'Transaction filters',
  },
  {
    path: 'users',
    loadComponent: () => import('./users/users.page').then((m) => m.UsersPage),
    ...canActivate(admin),
  },
  {
    path: 'users/:uid',
    loadComponent: () => import('./user/user.page').then((m) => m.UserPage),
    ...canActivate(admin),
  },
  {
    path: 'instances',
    loadComponent: () =>
      import('./instances/instances.page').then((m) => m.InstancesPage),
    ...canActivate(admin),
  },
  {
    path: 'signals',
    loadComponent: () =>
      import('./signals/signals.page').then((m) => m.SignalsPage),
    ...canActivate(admin),
  },
  {
    path: 'signals/:id',
    loadComponent: () =>
      import('./signal/signal.page').then((m) => m.SignalPage),
    ...canActivate(admin),
  },
  {
    path: 'instances/:id',
    loadComponent: () =>
      import('./instance/instance.page').then((m) => m.InstancePage),
    ...canActivate(admin),
  },
  {
    path: 'order-create',
    loadComponent: () =>
      import('./order-create/order-create.page').then((m) => m.OrderCreatePage),
    ...canActivate(admin),
  },
  {
    path: 'order-update',
    loadComponent: () =>
      import('./order-update/order-update.page').then((m) => m.OrderUpdatePage),
    ...canActivate(admin),
  },
  {
    path: 'position-close',
    loadComponent: () =>
      import('./position-close/position-close.page').then(
        (m) => m.PositionClosePage,
      ),
    ...canActivate(admin),
  },
  {
    path: 'instance-reinstall',
    loadComponent: () =>
      import('./instance-reinstall/instance-reinstall.page').then(
        (m) => m.InstanceReinstallPage,
      ),
    ...canActivate(admin),
  },
  {
    path: 'config',
    loadComponent: () =>
      import('./config/config.page').then((m) => m.ConfigPage),
    ...canActivate(admin),
  },
  {
    path: 'signal-update',
    loadComponent: () =>
      import('./signal-update/signal-update.page').then(
        (m) => m.SignalUpdatePage,
      ),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./profile/profile.page').then((m) => m.ProfilePage),
  },
  {
    path: 'privacy',
    loadComponent: () =>
      import('./privacy/privacy.page').then((m) => m.PrivacyPage),
  },
  {
    path: 'billing',
    loadComponent: () =>
      import('./billing/billing.page').then((m) => m.BillingPage),
  },
  {
    path: 'account',
    loadComponent: () =>
      import('./account/account.page').then((m) => m.AccountPage),
  },
  {
    path: 'metadata',
    loadComponent: () =>
      import('./metadata/metadata.page').then((m) => m.MetadataPage),
  },
  {
    path: 'password',
    loadComponent: () =>
      import('./password/password.page').then((m) => m.PasswordPage),
  },
  {
    path: 'security',
    loadComponent: () =>
      import('./security/security.page').then((m) => m.SecurityPage),
  },
  {
    path: 'oanda',
    loadComponent: () => import('./oanda/oanda.page').then((m) => m.OandaPage),
  },
  {
    path: 'notifications',
    loadComponent: () =>
      import('./notifications/notifications.page').then(
        (m) => m.NotificationsPage,
      ),
  },
];
