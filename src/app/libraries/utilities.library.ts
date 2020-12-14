export const RoutesData = {
  'settings': {
    url: ['dashboard', 'settings'],
    breadcrumb: ['Parametrización', 'Ajustes']
  },
  'causes': {
    url: ['dashboard', 'causes'],
    breadcrumb: ['Parametrización', 'Causas']
  },
  'task': {
    url: ['dashboard', 'task'],
    breadcrumb: ['Parametrización', 'Configuración Task']
  }
}

export enum StrataSettings {
  Uno = '1',
  Dos = '2',
  Tres = '3',
  Cuatro = '4',
  Cinco = '5',
  Seis = '6',
  NG = 'NG',
  NR = 'NR'
}

export enum ServicesSettings {
  telefonia = 'Telefonía',
  television = 'Televisión',
  internet = 'Internet'
}

export enum SelectStatus {
  '- Seleccione -' = '',
  'Activo' = '1',
  'Inactivo' = '0'
}
