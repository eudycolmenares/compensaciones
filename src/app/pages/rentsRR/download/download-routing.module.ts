import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DownloadComponent } from './download.component';

const ROUTES: Routes = [
  {
    path: '',
    component: DownloadComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})

export class DownloadRoutingModule { }
