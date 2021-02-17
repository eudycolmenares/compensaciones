export const RoutesData = {
  'settings': {
    url: ['dashboard', 'settings'],
    breadcrumb: ['Parametrización', 'Ajustes']
  },
  'stratum': {
    url: ['dashboard', 'stratum'],
    breadcrumb: ['Parametrización', 'Estrato']
  },
  'causes': {
    url: ['dashboard', 'causes'],
    breadcrumb: ['Parametrización', 'Causas']
  },
  'system-status': {
    url: ['dashboard', 'system-status'],
    breadcrumb: ['Parametrización', 'Estado sistema'],
  },
  'symptom': {
    url: ['dashboard', 'symptom'],
    breadcrumb: ['Parametrización', 'Sintoma']
  },
  'priorities': {
    url: ['dashboard', 'priorities'],
    breadcrumb: ['Parametrización', 'Prioridades'],
  },
  'origintype': {
    url: ['dashboard', 'origintype'],
    breadcrumb: ['Parametrización', 'Tipo Origen']
  },
  'bulk-load': {
    url: ['dashboard', 'bulk-load'],
    breadcrumb: ['Parametrización', 'Cargue Masivo']
  },
  'task': {
    url: ['dashboard', 'task'],
    breadcrumb: ['Parametrización', 'Configuración Task']
  },
  'load-faults': {
    url: ['dashboard', 'load-faults'],
    breadcrumb: ['Fallas RR', 'Cargar Fallas']
  },
  'orders-symptoms': {
    url: ['dashboard', 'orders-symptoms'],
    breadcrumb: ['Parametrización RR', 'Síntomas para Ordenes Mantenimiento']
  },
  'maintenance-orders-causes': {
    url: ['dashboard', 'maintenance-orders-causes'],
    breadcrumb: ['Parametrización RR', 'Causas para órdenes mantenimiento']
  },
  'rr-failure-validation': {
    url: ['dashboard', 'rr-failure-validation'],
    breadcrumb: ['Parametrización RR', 'Validación fallas RR']
  },
  'nodes-validation': {
    url: ['dashboard', 'nodes-validation'],
    breadcrumb: ['Validación', 'Validación Nodos']
  },
  'validation-accounts': {
    url: ['dashboard', 'validation-accounts'],
    breadcrumb: ['Validación', 'Cuentas']
  },
  'rents-download': {
    url: ['dashboard', 'rents-download'],
    breadcrumb: ['Rentas RR', 'Descargue Nodos - Cuentas']
  },
  'rents-load': {
    url: ['dashboard', 'rents-load'],
    breadcrumb: ['Rentas RR', 'Cargue Rentas RR']
  },
  'item-rr-billing': {
    url: ['dashboard', 'item-rr-billing'],
    breadcrumb: ['Item Facturación RR', 'Cuentas Compensadas RR']
  },
  'process-rr': {
    url: ['dashboard', 'process-rr'],
    breadcrumb: ['Supervisión', 'Proceso RR']
  }
}

export enum ServicesSettings {
  telephone = 'Telefonía',
  television = 'Televisión',
  internet = 'Internet'
}

export enum SelectStatus {
  '- Seleccione -' = '',
  'Activo' = '1',
  'Inactivo' = '0'
}

export enum SelectCompensate {
  '- Seleccione -' = '',
  'Si' = '1',
  'No' = '0'
}

export enum ButtonsTable {
  edit = 'edit',
  disable = 'disable',
  delete = 'delete'
}

export enum ServicesSettingsRR {
  telephone = 'Telefonía',
  television = 'Televisión',
  internet = 'Internet',
  tvDth = 'TvDth',
  vozDth = 'VozDth',
  '@Dth' = '@Dth',
}

export enum RRServicesFailure {
  by_nodo_4296_Tel_Int_48h = 'By_nodo_4296_Tel_Int_48h',
  by_nodo_acuer11_2006_TV16H = 'By_nodo_acuer11_2006_TV16H',
  compens_arreglo_TV16H = 'Compens_arreglo_TV16H',
  compens_arreglos_telef_48H = 'Compens_arreglos_telef_48H',
  compes_telef_48H = 'Compes_telef_48H',
  compes_TV_16H = 'Compes_TV_16H',
  improcedencia_falla_masiva = 'Improcedencia_falla_masiva',
}

export enum itemsStorage {
  menu = 'open_menu',
}
