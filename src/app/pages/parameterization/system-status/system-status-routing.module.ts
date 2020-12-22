import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SystemStatusComponent } from './system-status.component';

const routes: Routes = [
  {
    path: '',
    component: SystemStatusComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemStatusRoutingModule { }
