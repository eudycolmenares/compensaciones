import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

const ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'ajustes' },
      {
        path: 'ajustes',
        loadChildren: () => import('../parametrizacion/ajustes/ajustes.module').then(m => m.AjustesModule),
      },
      {
        path: 'causas',
        loadChildren: () => import('../parametrizacion/causas/causas-routing.module').then(m => m.CausasRoutingModule),
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})

export class DashboardRoutingModule { }
