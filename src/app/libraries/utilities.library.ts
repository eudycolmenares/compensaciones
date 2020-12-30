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
  }
}

// export enum StrataSettings {
//   Uno = '1',
//   Dos = '2',
//   Tres = '3',
//   Cuatro = '4',
//   Cinco = '5',
//   Seis = '6',
//   NG = 'NG',
//   NR = 'NR'
// }

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