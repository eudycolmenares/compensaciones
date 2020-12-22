import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { SidebarModule } from 'ng-sidebar';
import { NgbDropdownModule } from "@ng-bootstrap/ng-bootstrap";
import { NgbAccordionModule } from "@ng-bootstrap/ng-bootstrap";

import { NgbDatepickerModule } from "@ng-bootstrap/ng-bootstrap";
import { NgbTimepickerModule } from "@ng-bootstrap/ng-bootstrap";
import { NgbPaginationModule  } from '@ng-bootstrap/ng-bootstrap';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { NavbarButtonComponent } from '../../components/navbar-button/navbar-button.component';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    NavbarButtonComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SidebarModule.forRoot(),
    NgbDropdownModule,
    NgbAccordionModule,
    ComponentsModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    NgbTimepickerModule,
    NgbPaginationModule,
  ], 
  exports: [
    ComponentsModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    NgbTimepickerModule,
    NgbPaginationModule,
  ],
  providers: [DecimalPipe]
})

export class DashboardModule { }
