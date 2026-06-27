import { Routes } from '@angular/router';

const app = 'Pipbase';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
    title: app,
  },
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full',
  },
  {
    path: 'about',
    loadComponent: () => import('./about/about.page').then((m) => m.AboutPage),
    title: `About Us — ${app}`,
  },
  {
    path: 'pricing',
    loadComponent: () =>
      import('./pricing/pricing.page').then((m) => m.PricingPage),
    title: `Pricing — ${app}`,
  },
  {
    path: 'support',
    loadComponent: () =>
      import('./support/support.page').then((m) => m.SupportPage),
    title: `Support — ${app}`,
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
