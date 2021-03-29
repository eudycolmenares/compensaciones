import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { AuthenticatedGuard } from '../../shared/guards/authenticated.guard';

const ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'nodes-validation' }, // seteo nodes-validation
      {
        path: 'settings',
        canActivate: [AuthenticatedGuard],
        loadChildren: () => import('../parameterization/settings/settings.module').then(m => m.SettingsModule),
      },
      {
        path: 'stratum',
        canActivate: [AuthenticatedGuard],
        loadChildren: () => import('../parameterization/stratum/stratum.module').then(m => m.StratumModule),
      },
      {
        path: 'causes',
        canActivate: [AuthenticatedGuard],
        loadChildren: () => import('../parameterization/causes/causes.module').then(m => m.CausesModule),
      },
      {
        path: 'system-status',
        canActivate: [AuthenticatedGuard],
        loadChildren: () => import('../parameterization/system-status/system-status.module').then(m => m.SystemStatusModule),
      },
      {
        path: 'symptom',
        canActivate: [AuthenticatedGuard],
        loadChildren: () => import('../parameterization/symptom/symptom.module').then(m => m.SymptomModule),
      },
      {
        path: 'priorities',
        canActivate: [AuthenticatedGuard],
        loadChildren: () => import('../parameterization/priorities/priorities.module').then(m => m.PrioritiesModule),
      },
      {
        path: 'origintype',
        canActivate: [AuthenticatedGuard],
        loadChildren: () => import('../parameterization/originType/origin-type.module').then(m => m.OriginTypeModule),
      },
      {
        path: 'bulk-load',
        canActivate: [AuthenticatedGuard],
        loadChildren: () => import('../parameterization/bulk-load/bulk-load.module').then(m => m.BulkLoadModule),
      },
      {
        path: 'load-faults',
        canActivate: [AuthenticatedGuard],
        loadChildren: () => import('../parameterizationRR/load-faults/load-faults.module').then(m => m.LoadFaultsModule),
      },
      {
        path: 'orders-symptoms',
        canActivate: [AuthenticatedGuard],
        loadChildren: () => import('../parameterizationRR/maintenance-orders-symptoms/maintenance-orders-symptoms.module').then(m => m.MaintenanceOrdersSymptomsModule),
      },
      {
        path: 'maintenance-orders-causes',
        canActivate: [AuthenticatedGuard],
        loadChildren: () => import('../parameterizationRR/maintenance-orders-causes/maintenance-orders-causes.module').then(m => m.MaintenanceOrdersCausesModule),
      },
      {
        path: 'billing-periods',
        canActivate: [AuthenticatedGuard],
        loadChildren: () => import('../parameterization/billing-periods/billing-periods.module').then(m => m.BillingPeriodsModule),
      },
      {
        path: 'rr-failure-validation',
        canActivate: [AuthenticatedGuard],
        loadChildren: () => import('../parameterizationRR/rr-failure-validation/rr-failure-validation.module').then(m => m.RrFailureValidationModule),
      },
      {
        path: 'nodes-validation',
        canActivate: [AuthenticatedGuard],
        loadChildren: () => import('../validation/nodes/nodes.module').then(m => m.NodesModule),
      },
      {
        path: 'validation-accounts',
        canActivate: [AuthenticatedGuard],
        loadChildren: () => import('../validation/accounts/accounts.module').then(m => m.AccountsModule),
      },
      {
        path: 'rents-download',
        canActivate: [AuthenticatedGuard],
        loadChildren: () => import('../rentsRR/download/download.module').then(m => m.DownloadModule),
      },
      {
        path: 'rents-load',
        canActivate: [AuthenticatedGuard],
        loadChildren: () => import('../rentsRR/load/load.module').then(m => m.LoadModule),
      },
      {
        path: 'item-rr-billing',
        canActivate: [AuthenticatedGuard],
        loadChildren: () => import('../itemRrBilling/rr-compensated-accounts/rr-compensated-accounts.module').then(m => m.RrCompensatedAccountsModule),
      },
      {
        path: 'process-rr',
        canActivate: [AuthenticatedGuard],
        loadChildren: () => import('../supervision/process-rr/process-rr.module').then(m => m.ProcessRRModule),
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})

export class DashboardRoutingModule { }
