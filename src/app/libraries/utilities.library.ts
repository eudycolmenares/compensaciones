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
    breadcrumb: ['Parametrización', 'Estado Sistema'],
  },
  'symptom': {
    url: ['dashboard', 'symptom'],
    breadcrumb: ['Parametrización', 'Síntoma']
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
  'billing-periods': {
    url: ['dashboard', 'billing-periods'],
    breadcrumb: ['Parametrización', 'Periodos de facturación']
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
    breadcrumb: ['Parametrización RR', 'Síntomas para Órdenes Mantenimiento']
  },
  'maintenance-orders-causes': {
    url: ['dashboard', 'maintenance-orders-causes'],
    breadcrumb: ['Parametrización RR', 'Causas para Órdenes Mantenimiento']
  },
  'rr-failure-validation': {
    url: ['dashboard', 'rr-failure-validation'],
    breadcrumb: ['Parametrización RR', 'Validación Fallas RR']
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
  user = 'data_user',
  lastUser = 'last_user'
}

export const languagePrimeNG = {
  "startsWith": "Comienza con",
  "contains": "Contiene",
  "notContains": "No contiene",
  "endsWith": "Termina con",
  "equals": "Igual",
  "notEquals": "No es igual",
  "noFilter": "Sin filtro",
  "lt": "Menos que",
  "lte": "Menos que o igual a",
  "gt": "Mayor que",
  "gte": "Mayor que o igual",
  "is": "Es",
  "isNot": "No es",
  "before": "Antes",
  "after": "Después",
  "clear": "Limpiar",
  "apply": "Aplicar",
  "matchAll": "Coincidir todo",
  "matchAny": "Coincidir cualquiera",
  "addRule": "Agregar regla",
  "removeRule": "Eliminar regla",
  "accept": "Sí",
  "reject": "No",
  "choose": "Seleccionar",
  "upload": "Subir",
  "cancel": "Cancelar",
  "dayNames": ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
  "dayNamesShort": ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sab"],
  "dayNamesMin": ["Do","Lu","Ma","Mi","Ju","Vi","Sa"],
  "monthNames": ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Deciembre"],
  "monthNamesShort": ["Ene", "Feb", "Mar", "Abr", "May", "Jun","Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
  "today": "Hoy",
  "weekHeader": "Wk"
}

export const timeExpirationMinutes = 15;

export const bodyMailService = {
  "headerRequest" : {
    "transactionId" : "transactionId431",
    "system" : "system432",
    "user" : "user433",
    "password" : "password434",
    "requestDate" : "2018-03-06T11:29:01.410",
    "ipApplication" : "ipApplication435",
    "traceabilityId" : "traceabilityId436"
  },
  "message" : `{
    \"pushType\": \"SINGLE\",
    \"typeCostumer\": \"9F1AA44D-B90F-E811-80ED-FA163E10DFBE\",
    \"messageBox\": [
      {
        \"messageChannel\": \"SMTP\",
        \"messageBox\": [
          {
            \"customerId\": \"9F1AA44D-B90F-E811-80ED-FA163E10DFBE\",
            \"customerBox\": \"$$MAIL$$\"
          }
        ]
      }
    ],
    \"profileId\": [\"SMTP_FS_TCRM1\",\"SMS_FS_TCRM1\"],
    \"communicationType\": [\"REGULATORIO\"],
    \"communicationOrigin\": \"TCRM\",
    \"deliveryReceipts\": \"NO\",
    \"contentType\": \"MESSAGE\",
    \"messageContent\": \"$$CONTENT$$\"
  }]}`
};

export const superProcessParams = {
  email: {
    exps: [
      {
        exp: '$$MAIL$$',
        description: 'Correo a reemplazar',
        content: 'eudy.colmenares@novatec.com.co'
      },
      {
        exp: '$$CONTENT$$',
        description: 'Contenido del Mensaje',
        content: '¡Etapa del Proceso de Supervisión ejecutada satisfactoriamente!'
      }
    ]
  },
  confirByStages: {
    1: {
      header: '¿Estás seguro de que deseas ejecutar las Reglas para Nodos?',
      msg: `Al completarse este proceso recibirá un correo de confirmación, deberá dirigirse al módulo de Validación de Nodos para validar los datos,
        y luego volver a Supervisión y en la etapa 2 confirmar la validación de Nodos.`
    },
    2: {
      header: '¿Estás seguro que ha realizado la validación de Nodos?',
      msg: `Al completarse este proceso recibirá un correo de confirmación,
        y deberá dirigirse al paso 3, que es ejecutar las Reglas de Negocio RR.`
    },
    3: {
      header: '¿Estás seguro de que deseas ejecutar las Reglas de Negocio RR?',
      msg: `Al completarse este proceso recibirá un correo de confirmación,
        y generará automáticamente los Nodos y Cuentas.`
    },
    5: {
      header: '¿Estás seguro que ha realizado el cargue Información de Rentas?',
      msg: `Al completarse este proceso recibirá un correo de confirmación,
        y generará automáticamente los archivos de facturación.`
    },
  }
}
