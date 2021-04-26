// IP Domains
const domain_compensaciones = 'http://100.126.19.74:7669';
const domain_usuarios = 'http://100.126.0.150:11051';
const domain_notifications = 'http://172.24.232.150:8010';

const API_COMPENSACIONES_WEB = domain_compensaciones + '/WSCompensaciones-web/webresources/';
const API_COMPENSACIONES_BATCHRR = domain_compensaciones + '/WSCompensacionesBatchRR-web/webresources/';
const API_COMPENSACIONES_BATCH_WEB = domain_compensaciones + '/CompensacionesBatch-web/webresources/';
const API_PORTAL_USUARIOS = domain_usuarios + '/WsPortalUsuariosRest-web/ws/';
const API_NOTIFICATIONS = domain_notifications + '/Notification/V2.0/Rest/';

export const environment = {
  production: true,
  endpoints: {
    // Settings
    Settings: {
      url: API_COMPENSACIONES_WEB + 'WSCompensaciones/SettingsService/',
      endpoints: {
        readall: 'read/all',
        create: 'create',
        update: 'update',
        delete: 'delete',
      },
    },
    // Symptom
    Symptom: {
      url: API_COMPENSACIONES_WEB + 'WSCompensaciones/SymptomService/',
      endpoints: {
        readall: 'readAll',
        create: 'create',
        update: 'update',
        delete: 'delete',
      },
    },
    // Origin
    Origin: {
      url: API_COMPENSACIONES_WEB + 'WSCompensaciones/OriginTypeService/',
      endpoints: {
        readall: 'read/all',
        create: 'create',
        update: 'update',
        delete: 'delete',
      },
    },
    // Stratum
    Stratum: {
      url: API_COMPENSACIONES_WEB + 'WSCompensaciones/SocialStratumService/',
      endpoints: {
        readall: 'readAll',
        create: 'create',
        update: 'update',
        delete: 'delete',
      },
    },
    // Cause
    Cause: {
      url: API_COMPENSACIONES_WEB + 'WSCompensaciones/CausesService/',
      endpoints: {
        readall: 'read/all',
        readid: 'read/id',
        create: 'create',
        update: 'update',
        delete: 'delete',
      },
    },
    // System status
    SystemStatus: {
      url: API_COMPENSACIONES_WEB + 'WSCompensaciones/SystemStatusService/',
      endpoints: {
        readall: 'read/all',
        readid: 'read/id',
        create: 'create',
        update: 'update',
        delete: 'delete',
      },
    },
    // Priorities
    Priority: {
      url: API_COMPENSACIONES_WEB + 'WSCompensaciones/PriorityService/',
      endpoints: {
        readall: 'readAll',
        readid: 'read/id',
        create: 'create',
        update: 'update',
        delete: 'delete',
      },
    },
    // Bulk load
    BulkLoad: {
      url: API_COMPENSACIONES_BATCH_WEB + 'CompensacionesBatch/',
      endpoints: {
        readall: 'findTypeProcess',
        create: 'sendFile',
      },
    },
    // Faults
    Faults: {
      url: API_COMPENSACIONES_BATCHRR + 'WSCompensacionesBatchRR/LoadService/',
      endpoints: {
        readall: 'read/all',
        readid: 'read/id',
        load: 'load',
      },
    },
    // Maintenance Orders Causes
    OrderCause: {
      url: API_COMPENSACIONES_WEB + 'WSCompensaciones/MaintenanceOrderCauseService/',
      endpoints: {
        readall: 'list',
        create: 'create',
        update: 'update',
        delete: 'delete',
      },
    },
    // Maintenance Orders Symptoms
    OrderSymptoms: {
      url: API_COMPENSACIONES_WEB + 'WSCompensaciones/MaintenanceOrderDiagnosticService/',
      endpoints: {
        readall: 'list',
        create: 'create',
        update: 'update',
        delete: 'delete',
      },
    },
    // RR - parameterization - billing periods // acomodar
    BillingPeriods: {
      url: API_COMPENSACIONES_WEB + 'WSBilling/BillingPeriodsService/',
      endpoints: {
        readAll: 'read/all',
        create: 'create',
        update: 'update',
        delete: 'delete',
      },
    },
    // Validation Accounts
    ValidationAccounts: {
      url: API_COMPENSACIONES_WEB + 'WSCompensaciones/CrcCompensationService/',
      endpoints: {
        readall: 'list',
      },
    },
    // Validation Nodes
    // validationNodes_read: 'MaximoService/readAll',
    // failure validation - TBL_NODO_TEL_INT_48H - By_nodo_4296_Tel_Int_48h
    ValidationIntTelNode48H: {
      url: API_COMPENSACIONES_BATCHRR + 'WSValidacionFallasRR/IntTelNode48HService/',
      endpoints: {
        readall: 'read/all',
        create: 'create',
        update: 'update',
        delete: 'delete',
      },
    },
    // failure validation - TBL_NODO_TV_16H - By_nodo_acuer11_2006_TV16H
    ValidationTvNode16H: {
      url: API_COMPENSACIONES_BATCHRR + 'WSValidacionFallasRR/TvNode16HService/',
      endpoints: {
        readall: 'read/all',
        create: 'create',
        update: 'update',
        delete: 'delete',
      },
    },
    // failure validation - TBL_ARREGLO_TV_16H - Compens_arreglo_TV16H
    ValidationTvSetting16H: {
      url: API_COMPENSACIONES_BATCHRR + 'WSValidacionFallasRR/TvSetting16HService/',
      endpoints: {
        readall: 'read/all',
        create: 'create',
        update: 'update',
        delete: 'delete',
      },
    },
    // failure validation - TBL_ARREGLO_TEL_INT_48H - Compens_arreglos_telef_48H
    ValidationTelepSettlemCompensas: {
      url: API_COMPENSACIONES_BATCHRR + 'WSCompensacionesBatchRR/TelepSettlemCompensaService/',
      endpoints: {
        readall: 'readAll',
        create: 'create',
        update: 'update',
        delete: 'delete',
      },
    },
    // failure validation - TBL_COMPES_TEL_INT_48H - Compes_telef_48H
    ValidationTelepCompensa: {
      url: API_COMPENSACIONES_BATCHRR + 'WSCompensacionesBatchRR/TelepCompensaService/',
      endpoints: {
        readall: 'readAll',
        create: 'create',
        update: 'update',
        delete: 'delete',
      },
    },
    // failure validation - TBL_COMPES_TV_16H - Compes_TV_16H
    ValidationTelevCompensa: {
      url: API_COMPENSACIONES_BATCHRR + 'WSCompensacionesBatchRR/TelevCompensaService/',
      endpoints: {
        readall: 'readAll',
        create: 'create',
        update: 'update',
        delete: 'delete',
      },
    },
    // RR - validation - node // acomodar
    NodesValidation: {
      url: API_COMPENSACIONES_WEB + 'WSCompensaciones/MaximoService/',
      endpoints: {
        readAll: + 'readAll',
        readAllApproved: 'readAllApproved',
        readAllRejectedForQuality: 'readAllQualityReject',
        update: 'update',
      },
    },
    // failure validation - TBL_COMPES_IMPROCEDENCIA - Improcedencia_falla_masiva
    ValidationMassImproperFailure: {
      url: API_COMPENSACIONES_BATCHRR + 'WSCompensacionesBatchRR/MassImproperFailureService/',
      endpoints: {
        readall: 'readAll',
        create: 'create',
        update: 'update',
        delete: 'delete',
      },
    },
    // detalle compensación (ITEM FACTURACIÓN RR / CUENTAS COMPENSADAS RR)
    CompensationDetail: {
      url: API_COMPENSACIONES_BATCHRR + 'WSFacturacionRR/CompensationDetailService/',
      endpoints: {
        readall: 'read/all',
        create: 'create',
        update: 'update',
        delete: 'delete',
      },
    },
    // total compensación (ITEM FACTURACIÓN RR / CUENTAS COMPENSADAS RR)
    TotalCompensation: {
      url: API_COMPENSACIONES_BATCHRR + 'WSCompensacionesBatchRR/TotalCompensationService/',
      endpoints: {
        readall: 'readAll',
        create: 'create',
        update: 'update',
        delete: 'delete',
      },
    },
    // nota compensación (ITEM FACTURACIÓN RR / CUENTAS COMPENSADAS RR)
    CompensationNote: {
      url: API_COMPENSACIONES_BATCHRR + 'WSCompensacionesBatchRR/CompensationNoteService/',
      endpoints: {
        readall: 'readAll',
        create: 'create',
        update: 'update',
        delete: 'delete',
      },
    },
    // Nodes Rents RR
    NodeRent: {
      url: API_COMPENSACIONES_BATCHRR + 'WSRentasRR/NodeRentService/',
      endpoints: {
        readall: 'read/all',
        create: 'create',
        update: 'update',
        delete: 'delete',
      },
    },
    // Accounts Rents RR
    AccountRent: {
      url: API_COMPENSACIONES_BATCHRR + 'WSRentasRR/AccountRentService/',
      endpoints: {
        readall: 'read/all',
        create: 'create',
        update: 'update',
        delete: 'delete',
      },
    },
    // Users
    User: {
      url: API_PORTAL_USUARIOS + 'WsPortalUsuariosRest/',
      endpoints: {
        login: 'autentica'
      },
    },
    // Supervision Process
    SupervisionProcess: {
      endpoints: {
        nodesRules: API_COMPENSACIONES_WEB + 'WSNodesRules/NodesRulesService/run',
        businessRule: API_COMPENSACIONES_BATCHRR + 'WSBusinessRulesRR/BusinessRulesService/run',
        billingFiles: API_COMPENSACIONES_BATCHRR + 'WSBillingRR/BillingService/run',
        consolidateNodes: API_COMPENSACIONES_BATCHRR + 'WSConsolidationRR/ConsolidationAccountNodesService/run'
      },
    },
    // Notifications Mails
    NotificationsEmail: {
      url: API_NOTIFICATIONS,
      endpoints: {
        sendMail: 'PutMessage'
      },
    },
    // Billing - Supervision Process // acomodar
    BillingSupervision: {
      url: API_COMPENSACIONES_WEB + 'WSBilling/',
      endpoints: {
        compensationValue: 'CompensationValueService/read/all',
        readAll: 'SupervisionProcessService/read/all',
        update: 'SupervisionProcessService/update'
      },
    },
    // WSCompensaciones-web/webresources/WSCompensaciones/ObservationToValidateService/read/all
    // Observacion Nodos
    Observation: {
      url: API_COMPENSACIONES_WEB + 'WSCompensaciones/ObservationToValidateService/',
      endpoints: {
        readall: 'read/all',
        create: 'create',
        update: 'update',
        delete: 'delete',
      },
    },
  },
};
