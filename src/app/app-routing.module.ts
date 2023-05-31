import { AdminDashboardComponent } from './secure/admin-dashboard/admin-dashboard.component';
import { TemperatureComponent } from './secure/temperature/temperature.component';
import { HumidityComponent } from './secure/humidity/humidity.component';
import { UserAdministrationComponent } from './secure/user-administration/user-administration.component';
import { DashboardComponent } from './secure/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from './_guards/auth.guard';
import { RouterModule, Routes } from '@angular/router';

import { SecureComponent } from './secure/secure.component';
import { PublicComponent } from './public/public.component';
import { LoginComponent } from './public/login/login.component';
import { LogoutComponent } from './public/logout/logout.component';

const routes: Routes = [
  {
    path: '',
    component: SecureComponent,
    canMatch: [AuthGuard],
    data: {
      authGuardNeedsLoggedIn: true,
      authGuardPermissionLevel: 0,
      authGuardRedirect: '',
    },
    children: [
      {
        path: '', // Admin Dashboard
        component: AdminDashboardComponent,
        canActivate: [AuthGuard],
        title: 'Dashboard',
        data: {
          authGuardNeedsLoggedIn: true,
          authGuardPermissionLevel: 1,
          authGuardRedirect: '',
        },
      },
      {
        path: '', // Normal Dashboard
        component: DashboardComponent,
        canActivate: [AuthGuard],
        title: 'Dashboard',
        data: {
          authGuardNeedsLoggedIn: true,
          authGuardPermissionLevel: 0,
          authGuardRedirect: '',
        },
      },
      {
        path: 'admin',
        component: UserAdministrationComponent,
        canActivate: [AuthGuard],
        title: 'User Administration',
        data: {
          authGuardNeedsLoggedIn: true,
          authGuardPermissionLevel: 1,
          authGuardRedirect: '',
        },
      },
      {
        path: 'humidity',
        component: HumidityComponent,
        canActivate: [AuthGuard],
        title: 'Most Humid Stations',
        data: {
          authGuardNeedsLoggedIn: true,
          authGuardPermissionLevel: 0,
          authGuardRedirect: '',
        },
      },
      {
        path: 'temperature',
        component: TemperatureComponent,
        canActivate: [AuthGuard],
        title: 'Minimum Temperature',
        data: {
          authGuardNeedsLoggedIn: true,
          authGuardPermissionLevel: 0,
          authGuardRedirect: '',
        },
      },
    ]
  },
  {
    path: '',
    component: PublicComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
        title: 'Login'
      },
      {
        path: 'logout',
        component: LogoutComponent,
        title: 'Logout',
      },
    ]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }