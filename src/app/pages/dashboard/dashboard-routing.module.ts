import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

const ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'settings' },
      {
        path: 'settings',
        loadChildren: () => import('../parameterization/settings/settings.module').then(m => m.SettingsModule),
      },
      {
        path: 'causes',
        loadChildren: () => import('../parameterization/causes/causes.module').then(m => m.CausesModule),
      },
      {
        path: 'symptom',
        loadChildren: () => import('../parameterization/symptom/symptom.module').then(m => m.SymptomModule),
      },
      {
        path: 'task',
        loadChildren: () => import('../parameterization/task/task.module').then(m => m.TaskModule),
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})

export class DashboardRoutingModule { }
