import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { SidebarModule } from 'ng-sidebar';
import { NgbDropdownModule } from "@ng-bootstrap/ng-bootstrap";
import { NgbAccordionModule } from "@ng-bootstrap/ng-bootstrap";

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { NavbarButtonComponent } from '../../components/navbar-button/navbar-button.component';

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
    ReactiveFormsModule,
  ], exports: [
    ReactiveFormsModule
  ]
})

export class DashboardModule { }
