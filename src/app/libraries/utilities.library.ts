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
  },
  'email': {
    url: ['dashboard', 'email'],
    breadcrumb: ['Parametrización', 'Email de Supervisión']
  },
  'observation': {
    url: ['dashboard', 'observation'],
    breadcrumb: ['Validación', 'Observación']
  },
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

export enum SelectCompensateText {
  '- Seleccione -' = '',
  'Aplica' = '1',
  'No Aplica' = '0'
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

export const paramsLogin = {
  idApp: 'AT',
}

export const compensateAccounts = {
  totalMaxValue : 1000000,
}

export const timeExpirationMinutes = 15;

export const useAppTimeExpirationMinutes = 5;

export const maxTimeExpectRequestSeconds = 300000;

export const timeRefreshMinutes = 0.16;

export const statusInProgress = ['INICIADO', 'PROCESO'];

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
      msg: `Al completarse este proceso el área encargada recibirá un correo de confirmación para realizar la validación de nodos de la etapa 2.`
    },
    2: {
      header: '¿Estás seguro que ha realizado la validación de Nodos?',
      msg: `Al completarse este proceso el área encargada recibirá un correo de confirmación para realizar la ejecución de reglas de negocio RR en la etapa 3.`
    },
    3: {
      header: '¿Estás seguro de que deseas ejecutar las Reglas de Negocio RR?',
      msg: `Al completarse este proceso el área encargada recibirá un correo de confirmación para realizar la validación de fallas RR en la etapa 4.`
    },
    4: {
      header: '¿Estás seguro que ha realizado la validación de fallas RR?',
      msg: `Al completarse este proceso el área encargada recibirá un correo de confirmación para generar los nodos y cuentas en la etapa 5.`
    },
    5: {
      header: '¿Estás seguro que desea generar los nodos y cuentas?',
      msg: `Al completarse este proceso el área encargada recibirá un correo de confirmación para realizar la carga información rentas en la etapa 6.`
    },
    6: {
      header: '¿Estás seguro que ha realizado el cargue información de rentas?',
      msg: `Al completarse este proceso el área encargada recibirá un correo de confirmación para generar los archivos facturación en la etapa 7.`
    },
    7: {
      header: '¿Estás seguro que desea generar los archivos de facturación?',
      msg: `Al completarse este proceso el área encargada recibirá un correo de confirmación para descargar los archivos de facturación.`
    },
  },
  msgsByStages: {
    1: {
      success: 'El proceso ejecución de reglas para nodos se ha ejecutado, tendrá una duración de pocos minutos. ¡Tener en cuenta que al ejecutar las Reglas para Nodos nuevamente cambiara los procesos restantes a "No completado"!',
      failed: '¡El proceso ejecución reglas para nodos no se ha completado!'
    },
    2: {
      success: '¡El proceso Validación de Nodos ha sido completado!',
      failed: '¡Aún no ha confirmado la validación de Nodos!',
      disabled: '¡Esta opcíon se encuentra inhabilitada, debe haber ejecutado las Reglas de Nodos para poder continuar!'
    },
    3: {
      success: '¡El proceso ejecución de Reglas de Negocio RR ha sido completado',
      failed: '¡Aún no ha ejecutado las Reglas de Negocio RR!',
      disabled: '¡Esta opcíon se encuentra inhabilitada, debe haber confirmado la Validación de Nodos para poder continuar!'
    },
    4: {
      success: '¡El proceso de validación de fallas RR ha sido completado, puede proceder generar Nodos y Cuentas!',
      failed: '¡Aún no ha ejecutado la validación de fallas RR!',
      disabled: '¡Esta opcíon se encuentra inhabilitada, debe haber aejecutado las Reglas de Negocio RR para poder continuar!'
    },
    5: {
      success: '¡El proceso generación de Nodos y Cuentas ha sido ejecutado, al completarse puede proceder al cargue de información!',
      failed: '¡Aún no ha generado los nodos y cuentas!',
      disabled: '¡Esta opcíon se encuentra inhabilitada, debe haber validado las fallas RR para poder continuar!'
    },
    6: {
      success: '¡El proceso confirmación de carga de información de rentas ha sido completado, puede proceder al paso 7!',
      failed: '¡Aún no ha confirmado la carga de información de rentas!',
      disabled: '¡Esta opcíon se encuentra inhabilitada, debe haber generado los Nodos y Cuentas para poder continuar!'
    },
    7: {
      success: '¡La generación archivos de facturación se ha ejecutado, tendrá una duración de pocos minutos!',
      failed: '¡Aún no ha generado los archivos de facturación!',
      disabled: '¡Esta opcíon se encuentra inhabilitada, debe haber cargado la información de Rentas para poder continuar!'
    }
  },
  empty: '¡No hay  procesos disponibles, intente más tarde!',
  emptyEmail: '¡No hay correo almacenado para este proceso, no se enviara notificación!',
  errorLoadedProcesses: 'No se encontraron archivos cargados ó no se encuentra finalizado(s).',
};

export const messagesToast = {
  error_title: 'Error',
  error_red: 'Se ha presentado un problema red de código: ',
  time_default: 5000,
  close_sesion: 'La sesión ha sido cerrada.',
  timeout_sesion: 'Sesión cerrada por inactividad.',
  timeout_request: '¡Se agotó el tiempo de espera para la petición!'
};

export const arrayTypesRents = ['ACCOUNT_RENT', 'NODES_RENT'];

export const loadRentsParams = {
  arrayTypes: ['ACCOUNT_RENT', 'NODES_RENT'],
  extFile: '.txt',
  optionList: [
    { valueOption: 'NODOS_PLANTILLA', nameOption: 'Nodos', path: 'assets/documents/RENTAS_NODOS_PLANTILLA.txt'},
    { valueOption: 'CUENTAS_PLANTILLA', nameOption: 'Cuentas', path: 'assets/documents/RENTAS_CUENTAS_PLANTILLA.txt'},
  ],
}

export const bulkLoadParams = {
  filesAllowed: ['xlsx'],
  optionList: [
    { valueOption: 'CAUSAS', nameOption: 'Causas', path: 'assets/documents/CAUSAS.xlsx'},
    { valueOption: 'SINTOMAS', nameOption: 'Síntomas', path: 'assets/documents/SINTOMAS.xlsx'},
  ],
  confirmLoad: {
    header: '¿Estás seguro que deseas enviar el archivo?',
    msg: 'Toda la información de Cargue Masivo que contiene el archivo quedará registrada en la base de datos.'
  },
  msgs: {
    processedFiles: 'En la sección archivos procesados, se puede visualizar la información enviada al servidor y el estado del mismo, además de poder refrescar las mismas en el botón actualizar.',
    previousInformation: 'A continuación, se muestra información previa del archivo seleccionado para su carga, como a su vez las pestanas que posee y la información en las mismas.'
  }
};

export const loadFaultsParams = {
  optionsList: [
    {
      valueOption: 'RESIDENTIAL_BASE',
      nameFile: 'Base_Residencial',
      nameOption: 'Residencial',
      path: 'assets/documents/Template-BaseResidencial-FallasRR.xlsx'
    },
    {
      valueOption: 'BUILDINGS_BASE',
      nameFile: 'Base_Edificios',
      nameOption: 'Edificios',
      path: 'assets/documents/Template-BaseEdificios-FallasRR.xlsx'
    },
    {
      valueOption: 'SME_BASE',
      nameFile: 'Base_Pymes',
      nameOption: 'Pymes',
      path: 'assets/documents/Template-BasePymes-FallasRR.xlsx'
    },
    {
      valueOption: 'RESIDENTIAL_SETTING',
      nameFile: 'Ajuste_Residencial',
      nameOption: 'Ajuste Residencial',
      path: 'assets/documents/Template-AjusteResidencial-FallasRR.xlsx'
    },
    {
      valueOption: 'SME_SETTING',
      nameFile: 'Ajuste_Pymes',
      nameOption: 'Ajuste Pymes',
      path: 'assets/documents/Template-AjustesPymes-FallasRR.xlsx'
    },
    {
      valueOption: 'MAINTENANCE_ORDER',
      nameFile: 'Ordenes_Mantenimiento',
      nameOption: 'Órdenes Mantenimiento',
      path: 'assets/documents/Template-OrdenesMantenimiento-FallasRR.xlsx'
    },
  ],
  msgs: {
    confirmService: 'Toda la información de Carga de Fallas que contiene el archivo quedará registrada en la base de datos.',
    processedFiles: 'En la sección archivos procesados, se puede visualizar la información enviada al servidor y el estado del mismo, además de poder refrescar las mismas en el botón actualizar.',
    previousInformation: 'A continuación, se muestra información previa del archivo seleccionado para su carga, como a su vez las pestanas que posee y la información en las mismas.'
  }
}

export let wsWithOutLoader = [
  'http://100.126.19.74:7669/WSCompensacionesBatchRR-web/webresources/WSCompensacionesBatchRR/LoadService/read/all',
  'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSBilling/SupervisionProcessService/read/all'
];

export  const exportExcelParams = {
  excelType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
  excelExt: '.xlsx',
  case: {
    'SINTOMAS': 'sintomas_',
    'CAUSAS': 'causas_',
    //nodes
    'NODOS CANDIDATOS': 'nodos_candidatos_',
    'DATA INVALIDA': 'nodos_data_invalida_',
    'CAUSAS NUEVAS': 'causas_nuevas_',
    'SINTOMAS NUEVOS': 'sintomas_nuevos_',
  },
  msgSuccess: 'Archivo descargado correctamente'
}
