import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Routes = [
//   {
//     path: '',
//     component: AppComponent, // or redirectTo
//   },
  {
    path: 'login',
    loadComponent: () =>
      import('./componets/login/login.component').then(m => m.LoginComponent),
  },
];

