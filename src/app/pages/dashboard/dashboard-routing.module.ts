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
        path: 'stratum',
        loadChildren: () => import('../parameterization/stratum/stratum.module').then(m => m.StratumModule),
      },
      {
        path: 'causes',
        loadChildren: () => import('../parameterization/causes/causes.module').then(m => m.CausesModule),
      },
      {
        path: 'system-status',
        loadChildren: () => import('../parameterization/system-status/system-status.module').then(m => m.SystemStatusModule),
      },
      {
        path: 'symptom',
        loadChildren: () => import('../parameterization/symptom/symptom.module').then(m => m.SymptomModule),
      },
      {
        path: 'priorities',
        loadChildren: () => import('../parameterization/priorities/priorities.module').then(m => m.PrioritiesModule),
      },
      {
        path: 'origintype',
        loadChildren: () => import('../parameterization/originType/origin-type.module').then(m => m.OriginTypeModule),
      },
      {
        path: 'task',
        loadChildren: () => import('../parameterization/task/task.module').then(m => m.TaskModule),
      },
      // test
      {
        path: 'load-faults',
        loadChildren: () => import('../faults/load-faults/load-faults.module').then(m => m.LoadFaultsModule),
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})

export class DashboardRoutingModule { }
