import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  @Input() opened: boolean;
  @Output() swToggle = new EventEmitter<boolean>();
  items: MenuItem[];

  constructor() { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Parametrización',
        icon:'pi pi-fw pi-file',
        // expanded: true,
        items: [
          {
            label: 'Ajustes',
            icon:'pi pi-fw pi-trash',
            routerLink: ['/dashboard/settings']
          },
          {
            label: 'Estrato',
            icon:'pi pi-fw pi-external-link',
            routerLink: ['/dashboard/stratum']
          },
          {
            label: 'Causas',
            icon:'pi pi-fw pi-external-link',
            // routerLink: ['/dashboard/causes']
          },
          {
            label: 'Estado Sistema',
            icon:'pi pi-fw pi-external-link',
            // routerLink: ['/dashboard/system-status']
          },
          {
            label: 'Síntoma',
            icon:'pi pi-fw pi-external-link',
            // routerLink: ['/dashboard/symptom']
          },
          {
            label: 'Prioridades',
            icon:'pi pi-fw pi-external-link',
            // routerLink: ['/dashboard/priorities']
          },
          {
            label: 'Tipo Origen',
            icon:'pi pi-fw pi-external-link',
            // routerLink: ['/dashboard/origintype']
          },
          {
            label: 'Cargue Masivo',
            icon:'pi pi-fw pi-external-link',
            // routerLink: ['/dashboard/bulk-load']
          }
        ]
      },
      {
        label: 'Parametrización RR',
        icon:'pi pi-fw pi-pencil',
        items: [
          {
            label: 'Cargar Fallas',
            icon:'pi pi-fw pi-align-left',
            // routerLink: ['/dashboard/load-faults']
          },
          {
            label: 'Causas Ordenes Mantenimiento',
            icon:'pi pi-fw pi-align-left',
            // routerLink: ['/dashboard/maintenance-orders-causes']
          },
          {
            label: 'Síntomas Ordenes Mantenimiento',
            icon:'pi pi-fw pi-align-left',
            // routerLink: ['/dashboard/orders-symptoms']
          },
          {
            label: 'Validación Fallas RR',
            icon:'pi pi-fw pi-align-left',
            // routerLink: ['/dashboard/rr-failure-validation']
          }
        ]
      },
      {
        label: 'Validación',
        icon:'pi pi-fw pi-pencil',
        items: [
          {
            label: 'Nodo',
            icon:'pi pi-fw pi-align-left',
            // routerLink: ['/dashboard/nodes-validation']
          },
          {
            label: 'Cuentas',
            icon:'pi pi-fw pi-align-left',
            // routerLink: ['/dashboard/validation-accounts']
          }
        ]
      },
      {
        label: 'Rentas RR',
        icon:'pi pi-fw pi-pencil',
        items: [
          {
            label: 'Descargue Nodos-Cuentas',
            icon:'pi pi-fw pi-align-left',
            // routerLink: ['/dashboard/rents-download']
          },
          {
            label: 'Cargue Rentas RR',
            icon:'pi pi-fw pi-align-left',
            // routerLink: ['/dashboard/rents-load']
          }
        ]
      },
      {
        label: 'Item Facturación RR',
        icon:'pi pi-fw pi-pencil',
        items: [
          {
            label: 'Cuentas Compensadas RR',
            icon:'pi pi-fw pi-align-left',
            // routerLink: ['/dashboard/item-rr-billing']
          }
        ]
      },
      {
        label: 'Supervición',
        icon:'pi pi-fw pi-pencil',
        items: [
          {
            label: 'Proceso RR',
            icon:'pi pi-fw pi-align-left',
            // routerLink: ['/dashboard/process-rr']
          }
        ]
      }
    ]
  }

  toggleSidebar() {
    this.opened = !this.opened;
    this.swToggle.emit(this.opened);
  }

}
