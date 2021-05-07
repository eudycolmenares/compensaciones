import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GuestGuard } from './shared/guards/guest.guard';

const ROUTES: Routes = [
  {
  	path: 'login',
    canActivate: [GuestGuard],
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule),
	},
	{
  	path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
	},
	{
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES, {useHash: true})],
  exports: [RouterModule],
})

export class AppRoutingModule {
}
