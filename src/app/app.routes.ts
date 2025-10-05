import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch:'full',
  },
   {
    path: 'login',
    loadComponent: () =>
      import('./componets/login/login.component').then(m => m.LoginComponent),
  },
   {
    path: 'home',
    loadComponent: () =>
      import('./componets/home/home.component').then(m => m.HomeComponent),
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./componets/home/components/dashboard/dashboard.component').then(m => m.DashboardComponent),
      },
      {
        path: 'new-purchase',
        loadComponent: () =>
          import('./componets/home/components/add-purchase/add-purchase.component').then(m => m.AddPurchaseComponent),
      }
    ]
  },
];

