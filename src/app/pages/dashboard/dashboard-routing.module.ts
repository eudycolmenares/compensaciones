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
        path: 'bulk-load',
        loadChildren: () => import('../parameterization/bulk-load/bulk-load.module').then(m => m.BulkLoadModule),
      },
      {
        path: 'task',
        loadChildren: () => import('../parameterization/task/task.module').then(m => m.TaskModule),
      },
      {
        path: 'load-faults',
        loadChildren: () => import('../parameterizationRR/load-faults/load-faults.module').then(m => m.LoadFaultsModule),
      },
      {
        path: 'orders-symptoms',
        loadChildren: () => import('../parameterizationRR/maintenance-orders-symptoms/maintenance-orders-symptoms.module').then(m => m.MaintenanceOrdersSymptomsModule),
      },
      {
        path: 'maintenance-orders-causes',
        loadChildren: () => import('../parameterizationRR/maintenance-orders-causes/maintenance-orders-causes.module').then(m => m.MaintenanceOrdersCausesModule),
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})

export class DashboardRoutingModule { }
