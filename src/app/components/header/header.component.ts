import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MenuItem } from 'primeng/api';

import { BillingPeriodsService } from '../../services/billingPeriods/billing-periods.service';
import { AuthService } from '../../shared/services/auth.service';
import { ResponseLoginModel as UserModel } from '../../models/users';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  @Input() opened: boolean;
  @Output() swToggle = new EventEmitter<boolean>();
  items: MenuItem[];
  userData: UserModel = null;
  currPeriod: object = null;

  constructor(
    private authSvc: AuthService,
    private periods: BillingPeriodsService,
  ) { }

  ngOnInit(): void {
    this.currentPeriod();
    this.userData = this.authSvc.userData;
    this.items = [
      {
        label: 'Perfil',
        icon: 'pi pi-user',
        command: () => {
          // this.update();
        }
      },
      {
        label: 'Cambiar Contraseña',
        icon: 'pi pi-key',
        command: () => {
          // this.delete();
        }
      },
      {
        separator: true
      },
      {
        label: 'Cerrar Sesión',
        icon: 'pi pi-sign-out',
        command: () => {
          this.closeSession();
        }
      }
    ]
  }

  currentPeriod() {
    const period = this.periods.validationBillingPeriods();
    period.then(resp => {
      (resp.exists == true) ? this.currPeriod = resp.currentPeriod : '';
    }).catch(err => {})
  }

  closeSession() {
    this.authSvc.logout();
  }

  toggleSidebar() {
    this.opened = !this.opened;
    this.swToggle.emit(this.opened);
  }
}
