import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { MenuItem } from 'primeng/api';
import { validateLocaleAndSetLanguage } from 'typescript';

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
        label: 'RR',
        title: 'RR',
        items: [
          {
            label: 'Parametrización',
            title: 'Parametrización',
            items: [
              {
                label: 'Ajustes',
                title: 'Ajustes',
                icon:'pi pi-fw pi-cog',
                routerLink: ['/dashboard/settings']
              },
              {
                label: 'Estrato',
                title: 'Estrato',
                icon:'pi pi-fw pi-sitemap',
                routerLink: ['/dashboard/stratum']
              },
              {
                label: 'Causas',
                title: 'Causas',
                icon:'pi pi-fw pi-exclamation-circle',
                routerLink: ['/dashboard/causes']
              },
              {
                label: 'Estado Sistema',
                title: 'Estado Sistema',
                icon:'pi pi-fw pi-shield',
                routerLink: ['/dashboard/system-status']
              },
              {
                label: 'Síntoma',
                title: 'Síntoma',
                icon:'pi pi-fw pi-search',
                routerLink: ['/dashboard/symptom']
              },
              {
                label: 'Prioridades',
                title: 'Prioridades',
                icon:'pi pi-fw pi-clock',
                routerLink: ['/dashboard/priorities']
              },
              {
                label: 'Tipo Origen',
                title: 'Tipo Origen',
                icon:'pi pi-fw pi-link',
                routerLink: ['/dashboard/origintype']
              },
              {
                label: 'Cargue Masivo',
                title: 'Cargue Masivo',
                icon:'pi pi-fw pi-file-excel',
                routerLink: ['/dashboard/bulk-load']
              },
              {
                label: 'Cargar Fallas',
                title: 'Cargar Fallas',
                icon:'pi pi-fw pi-cloud-upload',
                routerLink: ['/dashboard/load-faults']
              },
              {
                label: 'Causas Ordenes Mantenimiento',
                title: 'Causas Ordenes Mantenimiento',
                icon:'pi pi-fw pi-exclamation-circle',
                routerLink: ['/dashboard/maintenance-orders-causes']
              },
              {
                label: 'Síntomas Ordenes Mantenimiento',
                title: 'Síntomas Ordenes Mantenimiento',
                icon:'pi pi-fw pi-search',
                routerLink: ['/dashboard/orders-symptoms']
              },
            ]
          },
          {
            label: 'Rentas',
            title: 'Rentas',
            items: [
              {
                label: 'Descargue Nodos-Cuentas',
                title: 'Descargue Nodos-Cuentas',
                icon:'pi pi-fw pi-download',
                routerLink: ['/dashboard/rents-download']
              },
              {
                label: 'Cargue Rentas',
                title: 'Cargue Rentas',
                icon:'pi pi-fw pi-upload',
                routerLink: ['/dashboard/rents-load']
              }
            ]
          },
          {
            label: 'Validación',
            title: 'Validación',
            items: [
              {
                label: 'Nodos',
                title: 'Nodos',
                icon:'pi pi-fw pi-circle-off',
                routerLink: ['/dashboard/nodes-validation']
              },
              {
                label: 'Validación Fallas',
                title: 'Validación Fallas',
                icon:'pi pi-fw pi-check-square',
                routerLink: ['/dashboard/rr-failure-validation']
              }
            ]
          },
          {
            label: 'Facturación',
            title: 'Facturación',
            items: [
              {
                label: 'Cuentas Compensadas',
                title: 'Cuentas Compensadas',
                icon:'pi pi-fw pi-dollar',
                routerLink: ['/dashboard/item-rr-billing']
              }
            ]
          },
          {
            label: 'Supervisión',
            title: 'Supervisión',
            items: [
              {
                label: 'Procesos',
                title: 'Procesos',
                icon:'pi pi-fw pi-chart-line',
                routerLink: ['/dashboard/process-rr']
              }
            ]
          }
        ]
      },
      {
        label: 'Inspira',
        title: 'Inspira',
        items: [
          {
            label: 'Parametrización',
            title: 'Parametrización',
            items: [
              {
                label: 'Ajustes',
                title: 'Ajustes',
                icon:'pi pi-fw pi-cog',
                routerLink: ['/dashboard/settings']
              },
              {
                label: 'Estrato',
                title: 'Estrato',
                icon:'pi pi-fw pi-sitemap',
                routerLink: ['/dashboard/stratum']
              },
              {
                label: 'Causas',
                title: 'Causas',
                icon:'pi pi-fw pi-exclamation-circle',
                routerLink: ['/dashboard/causes']
              },
              {
                label: 'Estado Sistema',
                title: 'Estado Sistema',
                icon:'pi pi-fw pi-shield',
                routerLink: ['/dashboard/system-status']
              },
              {
                label: 'Síntoma',
                title: 'Síntoma',
                icon:'pi pi-fw pi-search',
                routerLink: ['/dashboard/symptom']
              },
              {
                label: 'Prioridades',
                title: 'Prioridades',
                icon:'pi pi-fw pi-clock',
                routerLink: ['/dashboard/priorities']
              },
              {
                label: 'Tipo Origen',
                title: 'Tipo Origen',
                icon:'pi pi-fw pi-link',
                routerLink: ['/dashboard/origintype']
              },
              {
                label: 'Cargue Masivo',
                title: 'Cargue Masivo',
                icon:'pi pi-fw pi-file-excel',
                routerLink: ['/dashboard/bulk-load']
              }
            ]
          },
          {
            label: 'Validación',
            title: 'Validación',
            items: [
              {
                label: 'Nodos',
                title: 'Nodos',
                icon:'pi pi-fw pi-circle-off',
                routerLink: ['/dashboard/nodes-validation']
              },
              {
                label: 'Cuentas',
                title: 'Cuentas',
                icon:'pi pi-fw pi-book',
                routerLink: ['/dashboard/validation-accounts']
              }
            ]
          },
          {
            label: 'Supervisión',
            title: 'Supervisión',
            items: [
              {
                label: 'Procesos',
                title: 'Procesos',
                icon:'pi pi-fw pi-chart-line',
                routerLink: ['/dashboard/process-rr']
              }
            ]
          }
        ]
      }
    ];
  }

  toggleSidebar() {
    this.opened = !this.opened;
    this.swToggle.emit(this.opened);
  }

}
