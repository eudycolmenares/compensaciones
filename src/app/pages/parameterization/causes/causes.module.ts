import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CausesRoutingModule } from './causes-routing.module';
import { CausesComponent } from './causes.component';
import { DashboardModule } from '../../dashboard/dashboard.module';
import { CauseFormComponent } from './cause-form/cause-form.component';
import { CauseListComponent } from './cause-list/cause-list.component';

@NgModule({
  declarations: [CausesComponent, CauseFormComponent, CauseListComponent],
  imports: [
    CommonModule,
    CausesRoutingModule,
    DashboardModule
  ]
})
export class CausesModule { }
