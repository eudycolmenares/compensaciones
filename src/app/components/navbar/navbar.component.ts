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
              {
                label: 'Validación Fallas RR',
                title: 'Validación Fallas RR',
                icon:'pi pi-fw pi-check-square',
                routerLink: ['/dashboard/rr-failure-validation']
              }
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
                label: 'Cargue Rentas RR',
                title: 'Cargue Rentas RR',
                icon:'pi pi-fw pi-upload',
                routerLink: ['/dashboard/rents-load']
              }
            ]
          },
          {
            label: 'Facturación',
            title: 'Facturación',
            items: [
              {
                label: 'Cuentas Compensadas RR',
                title: 'Cuentas Compensadas RR',
                icon:'pi pi-fw pi-dollar',
                routerLink: ['/dashboard/item-rr-billing']
              }
            ]
          },
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
                label: 'Proceso RR',
                title: 'Proceso RR',
                icon:'pi pi-fw pi-chart-line',
                routerLink: ['/dashboard/process-rr']
              }
            ]
          }
        ]
      }
    ]

    // this.items = [
    //   {
    //     label: 'Parametrización',
    //     icon:'pi pi-fw pi-file',
    //     // expanded: true,
    //     items: [
    //       {
    //         label: 'Ajustes',
    //         icon:'pi pi-fw pi-trash',
    //         routerLink: ['/dashboard/settings']
    //       },
    //       {
    //         label: 'Estrato',
    //         icon:'pi pi-fw pi-external-link',
    //         routerLink: ['/dashboard/stratum']
    //       },
    //       {
    //         label: 'Causas',
    //         icon:'pi pi-fw pi-external-link',
    //         routerLink: ['/dashboard/causes']
    //       },
    //       {
    //         label: 'Estado Sistema',
    //         icon:'pi pi-fw pi-external-link',
    //         routerLink: ['/dashboard/system-status']
    //       },
    //       {
    //         label: 'Síntoma',
    //         icon:'pi pi-fw pi-external-link',
    //         routerLink: ['/dashboard/symptom']
    //       },
    //       {
    //         label: 'Prioridades',
    //         icon:'pi pi-fw pi-external-link',
    //         routerLink: ['/dashboard/priorities']
    //       },
    //       {
    //         label: 'Tipo Origen',
    //         icon:'pi pi-fw pi-external-link',
    //         routerLink: ['/dashboard/origintype']
    //       },
    //       {
    //         label: 'Cargue Masivo',
    //         icon:'pi pi-fw pi-external-link',
    //         routerLink: ['/dashboard/bulk-load']
    //       }
    //     ]
    //   },
    //   {
    //     label: 'Parametrización RR',
    //     icon:'pi pi-fw pi-pencil',
    //     items: [
    //       {
    //         label: 'Cargar Fallas',
    //         icon:'pi pi-fw pi-align-left',
    //         routerLink: ['/dashboard/load-faults']
    //       },
    //       {
    //         label: 'Causas Ordenes Mantenimiento',
    //         icon:'pi pi-fw pi-align-left',
    //         routerLink: ['/dashboard/maintenance-orders-causes']
    //       },
    //       {
    //         label: 'Síntomas Ordenes Mantenimiento',
    //         icon:'pi pi-fw pi-align-left',
    //         routerLink: ['/dashboard/orders-symptoms']
    //       },
    //       {
    //         label: 'Validación Fallas RR',
    //         icon:'pi pi-fw pi-align-left',
    //         routerLink: ['/dashboard/rr-failure-validation']
    //       }
    //     ]
    //   },
    //   {
    //     label: 'Validación',
    //     icon:'pi pi-fw pi-pencil',
    //     items: [
    //       {
    //         label: 'Nodos',
    //         icon:'pi pi-fw pi-align-left',
    //         routerLink: ['/dashboard/nodes-validation']
    //       },
    //       {
    //         label: 'Cuentas',
    //         icon:'pi pi-fw pi-align-left',
    //         routerLink: ['/dashboard/validation-accounts']
    //       }
    //     ]
    //   },
    //   {
    //     label: 'Rentas RR',
    //     icon:'pi pi-fw pi-pencil',
    //     items: [
    //       {
    //         label: 'Descargue Nodos-Cuentas',
    //         icon:'pi pi-fw pi-align-left',
    //         routerLink: ['/dashboard/rents-download']
    //       },
    //       {
    //         label: 'Cargue Rentas RR',
    //         icon:'pi pi-fw pi-align-left',
    //         routerLink: ['/dashboard/rents-load']
    //       }
    //     ]
    //   },
    //   {
    //     label: 'Facturación RR',
    //     icon:'pi pi-fw pi-pencil',
    //     items: [
    //       {
    //         label: 'Cuentas Compensadas RR',
    //         icon:'pi pi-fw pi-align-left',
    //         routerLink: ['/dashboard/item-rr-billing']
    //       }
    //     ]
    //   },
    //   {
    //     label: 'Supervisión',
    //     icon:'pi pi-fw pi-pencil',
    //     items: [
    //       {
    //         label: 'Proceso RR',
    //         icon:'pi pi-fw pi-align-left',
    //         routerLink: ['/dashboard/process-rr']
    //       }
    //     ]
    //   }
    // ]
  }

  toggleSidebar() {
    this.opened = !this.opened;
    this.swToggle.emit(this.opened);
  }

}
