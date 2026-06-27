import { Routes } from '@angular/router';
import {
  canActivate,
  hasCustomClaim,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';

const app = 'Pipbase';

const admin = () => hasCustomClaim('admin');
const redirectLoggedInToHome = () => redirectLoggedInTo(['/']);
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
    ...canActivate(admin),
    ...canActivate(redirectLoggedInToHome),
    ...canActivate(redirectUnauthorizedToLogin),
    title: `Console — ${app}`,
  },
  {
    path: 'users',
    loadComponent: () => import('./users/users.page').then((m) => m.UsersPage),
    ...canActivate(admin),
    ...canActivate(redirectUnauthorizedToLogin),
    title: `Users — ${app}`,
  },
  {
    path: 'users/:uid',
    loadComponent: () => import('./user/user.page').then((m) => m.UserPage),
    ...canActivate(admin),
    ...canActivate(redirectUnauthorizedToLogin),
    title: `User — ${app}`,
  },
  {
    path: 'instances',
    loadComponent: () =>
      import('./instances/instances.page').then((m) => m.InstancesPage),
    ...canActivate(admin),
    ...canActivate(redirectUnauthorizedToLogin),
    title: `Instances — ${app}`,
  },
  {
    path: 'instances/:id',
    loadComponent: () =>
      import('./instance/instance.page').then((m) => m.InstancePage),
    ...canActivate(admin),
    ...canActivate(redirectUnauthorizedToLogin),
    title: `Instance — ${app}`,
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then((m) => m.LoginPage),
    ...canActivate(redirectLoggedInToHome),
    title: `Login — ${app}`,
  },
  {
    path: 'signals',
    loadComponent: () =>
      import('./signals/signals.page').then((m) => m.SignalsPage),
    ...canActivate(admin),
    ...canActivate(redirectUnauthorizedToLogin),
    title: `Signals — ${app}`,
  },
  {
    path: 'signals/:id',
    loadComponent: () =>
      import('./signal/signal.page').then((m) => m.SignalPage),
    ...canActivate(admin),
    ...canActivate(redirectUnauthorizedToLogin),
    title: `Signal — ${app}`,
  },
  {
    path: 'order-create',
    loadComponent: () =>
      import('./order-create/order-create.page').then((m) => m.OrderCreatePage),
  },
  {
    path: 'order-update',
    loadComponent: () =>
      import('./order-update/order-update.page').then((m) => m.OrderUpdatePage),
  },
  {
    path: 'position-close-partial',
    loadComponent: () =>
      import('./position-close-partial/position-close-partial.page').then(
        (m) => m.PositionClosePartialPage,
      ),
  },
  {
    path: 'signal-update',
    loadComponent: () =>
      import('./signal-update/signal-update.page').then(
        (m) => m.SignalUpdatePage,
      ),
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
