import { Routes } from '@angular/router';
import {
  canActivate,
  hasCustomClaim,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';

const admin = () => hasCustomClaim('admin');
const premium = () => hasCustomClaim('premium');

const redirectLoggedInToHome = () => redirectLoggedInTo(['/']);
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const app = 'Pipbase';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
    title: `Home — ${app}`,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'reports',
    loadComponent: () =>
      import('./reports/reports.page').then((m) => m.ReportsPage),
    title: `Reports — ${app}`,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'reports/:date',
    loadComponent: () =>
      import('./report/report.page').then((m) => m.ReportPage),
    title: `Report — ${app}`,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'transactions',
    loadComponent: () =>
      import('./transactions/transactions.page').then(
        (m) => m.TransactionsPage,
      ),
    title: `Transactions — ${app}`,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'transactions/:id',
    loadComponent: () =>
      import('./transaction/transaction.page').then((m) => m.TransactionPage),
    title: `Transaction — ${app}`,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'trades',
    loadComponent: () =>
      import('./trades/trades.page').then((m) => m.TradesPage),
    title: `Trades — ${app}`,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'trades/:id',
    loadComponent: () => import('./trade/trade.page').then((m) => m.TradePage),
    title: `Trade — ${app}`,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'orders',
    loadComponent: () =>
      import('./orders/orders.page').then((m) => m.OrdersPage),
    title: `Orders — ${app}`,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'orders/:id',
    loadComponent: () => import('./order/order.page').then((m) => m.OrderPage),
    title: `Order — ${app}`,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'positions',
    loadComponent: () =>
      import('./positions/positions.page').then((m) => m.PositionsPage),
    title: `Positions — ${app}`,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'account',
    loadComponent: () =>
      import('./account/account.page').then((m) => m.AccountPage),
    title: `Account — ${app}`,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./settings/settings.page').then((m) => m.SettingsPage),
    title: `Settings — ${app}`,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'server',
    loadComponent: () =>
      import('./server/server.page').then((m) => m.ServerPage),
    title: `Server — ${app}`,
    ...canActivate(admin),
    ...canActivate(premium),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then((m) => m.LoginPage),
    title: `Login — ${app}`,
    ...canActivate(redirectLoggedInToHome),
  },
  {
    path: 'password',
    loadComponent: () =>
      import('./password/password.page').then((m) => m.PasswordPage),
    title: `Forgot Password — ${app}`,
    ...canActivate(redirectLoggedInToHome),
  },
];

routes.push(
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/',
  },
);
