import { NgModule } from '@angular/core';
import { AuthGuard } from './_guards/auth.guard';
import { RouterModule, Routes } from '@angular/router';

import { SecureComponent } from './secure/secure.component';
import { AdminComponent } from './secure/admin/admin.component';
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
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard],
        title: 'AdminConsole',
        data: {
          authGuardNeedsLoggedIn: true,
          authGuardPermissionLevel: 1,
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
