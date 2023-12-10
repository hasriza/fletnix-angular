import { Routes } from '@angular/router';
import { AuthGuard, NotAuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/home/home.component').then((m) => m.HomeComponent),
    title: 'FletNix',
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('./components/auth/auth.component').then((m) => m.AuthComponent),
    title: 'Authenticate',
    canActivate: [NotAuthGuard],
  },
  {
    path: 'content',
    loadChildren: () =>
      import('./modules/content/content.module').then((m) => m.ContentModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'user-info',
    loadComponent: () =>
      import('./components/user-info/user-info.component').then(
        (m) => m.UserInfoComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'not-found',
    loadComponent: () =>
      import('./components/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
    title: 'Page not found!',
  },
  {
    path: '**',
    redirectTo: '/not-found',
  },
];
