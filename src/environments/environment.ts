// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  endpoints: {
    // Settings
    Settings: {
      url: '',
      endpoints: {
        readall: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSCompensaciones/SettingsService/readAll',
        create: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSCompensaciones/SettingsService/create',
        update: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSCompensaciones/SettingsService/update',
        delete: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSCompensaciones/SettingsService/delete/',
      },
    },
    // Symptom - Bus
    Symptom: {
      url: '',
      endpoints: {
        readall: 'HTTP://100.126.21.189:7777/SymptomService/V1.0/Rest/ReadAll',
        create: 'HTTP://100.126.21.189:7777/SymptomService/V1.0/Rest/Create',
        update: 'HTTP://100.126.21.189:7777/SymptomService/V1.0/Rest/Update',
        delete: 'HTTP://100.126.21.189:7777/SymptomService/V1.0/Rest/Delete',
      },
    },
    // Origin - Bus
    Origin: {
      url: '',
      endpoints: {
        readall: 'HTTP://100.126.21.189:7777/OriginTypeService/V1.0/Rest/ReadAll',
        create: 'HTTP://100.126.21.189:7777/OriginTypeService/V1.0/Rest/Create',
        update: 'HTTP://100.126.21.189:7777/OriginTypeService/V1.0/Rest/Update',
        delete: 'HTTP://100.126.21.189:7777/OriginTypeService/V1.0/Rest/Delete',
      },
    },
    // Stratum
    Stratum: {
      url: '',
      endpoints: {
        readall: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSCompensaciones/SocialStratumService/readAll',
        create: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSCompensaciones/SocialStratumService/create',
        update: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSCompensaciones/SocialStratumService/update',
        delete: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSCompensaciones/SocialStratumService/delete/',
      },
    },
    // Cause - Bus
    Cause: {
      url: '',
      endpoints: {
        readall: 'HTTP://100.126.21.189:7777/CausesService/V1.0/Rest/ReadAll',
        readid: 'HTTP://100.126.21.189:7777/CausesService/V1.0/Rest/ReadById',
        create: 'HTTP://100.126.21.189:7777/CausesService/V1.0/Rest/Create',
        update: 'HTTP://100.126.21.189:7777/CausesService/V1.0/Rest/Update',
        delete: 'HTTP://100.126.21.189:7777/CausesService/V1.0/Rest/Delete',
      },
    },
    // System status - Bus
    SystemStatus: {
      url: '',
      endpoints: {
        readall: 'HTTP://100.126.21.189:7777/SystemStatusService/V1.0/Rest/ReadAll',
        readid: 'HTTP://100.126.21.189:7777/SystemStatusService/V1.0/Rest/ReadById',
        create: 'HTTP://100.126.21.189:7777/SystemStatusService/V1.0/Rest/Create',
        update: 'HTTP://100.126.21.189:7777/SystemStatusService/V1.0/Rest/Update',
        delete: 'HTTP://100.126.21.189:7777/SystemStatusService/V1.0/Rest/Delete',
      },
    },
    // Priorities - Bus
    Priority: {
      url: '',
      endpoints: {
        readall: 'HTTP://100.126.21.189:7777/PriorityService/V1.0/Rest/ReadAll',
        readid: 'HTTP://100.126.21.189:7777/PriorityService/V1.0/Rest/ReadId',
        create: 'HTTP://100.126.21.189:7777/PriorityService/V1.0/Rest/Create',
        update: 'HTTP://100.126.21.189:7777/PriorityService/V1.0/Rest/Update',
        delete: 'HTTP://100.126.21.189:7777/PriorityService/V1.0/Rest/Delete',
      },
    },
    // Bulk load
    BulkLoad: {
      url: '',
      endpoints: {
        create: 'http://100.126.19.74:7669/CompensacionesBatch-web/webresources/CompensacionesBatch/sendFile',
      },
    },
    // Faults
    Faults: {
      url: '',
      endpoints: {
        readall: 'http://100.126.19.74:7669/WSCompensacionesBatchRR-web/webresources/WSCompensacionesBatchRR/LoadService/read/all',
        readid: 'http://100.126.19.74:7669/WSCompensacionesBatchRR-web/webresources/WSCompensacionesBatchRR/LoadService/read/id/',
        load: 'http://100.126.19.74:7669/WSCompensacionesBatchRR-web/webresources/WSCompensacionesBatchRR/LoadService/load',
      },
    },
    // Maintenance Orders Causes - Bus
    OrderCause: {
      url: '',
      endpoints: {
        readall: 'HTTP://100.126.21.189:7777/MaintenanceOrderCauseService/V1.0/Rest/ReadAll',
        create: 'HTTP://100.126.21.189:7777/MaintenanceOrderCauseService/V1.0/Rest/Create',
        update: 'HTTP://100.126.21.189:7777/MaintenanceOrderCauseService/V1.0/Rest/Update',
        delete: 'HTTP://100.126.21.189:7777/MaintenanceOrderCauseService/V1.0/Rest/Delete',
      },
    },
    // Maintenance Orders Symptoms - Bus
    OrderSymptoms: {
      url: '',
      endpoints: {
        readall: 'HTTP://100.126.21.189:7777/MaintenanceOrderDiagnosticService/V1.0/Rest/ReadAll',
        create: 'HTTP://100.126.21.189:7777/MaintenanceOrderDiagnosticService/V1.0/Rest/Create',
        update: 'HTTP://100.126.21.189:7777/MaintenanceOrderDiagnosticService/V1.0/Rest/Update',
        delete: 'HTTP://100.126.21.189:7777/MaintenanceOrderDiagnosticService/V1.0/Rest/Delete',
      },
    },
    // RR - parameterization - billing periods - Bus
    BillingPeriods: {
      url: '',
      endpoints: {
        readAll: 'HTTP://100.126.21.189:7777/BillingPeriodsService/V1.0/Rest/ReadAll',
        create: 'HTTP://100.126.21.189:7777/BillingPeriodsService/V1.0/Rest/Create',
        update: 'HTTP://100.126.21.189:7777/BillingPeriodsService/V1.0/Rest/Update',
        delete: 'HTTP://100.126.21.189:7777/BillingPeriodsService/V1.0/Rest/Delete',
      },
    },
    // Validation Accounts
    ValidationAccounts: {
      url: '',
      endpoints: {
        readall: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSCompensaciones/CrcCompensationService/list',
        create:  'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSCompensaciones/CrcCompensationService/create',
        update: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSCompensaciones/CrcCompensationService/update',
        delete: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSCompensaciones/CrcCompensationService/delete',
      },
    },
    // Validation Nodes: 'MaximoService/readAll',
    // failure validation - TBL_NODO_TEL_INT_48H - By_nodo_4296_Tel_Int_48h
    ValidationIntTelNode48H: {
      url: '',
      endpoints: {
        readall: 'http://100.126.19.74:7669/WSCompensacionesBatchRR-web/webresources/WSValidacionFallasRR/IntTelNode48HService/read/all',
        create: 'http://100.126.19.74:7669/WSCompensacionesBatchRR-web/webresources/WSValidacionFallasRR/IntTelNode48HService/create',
        update: 'http://100.126.19.74:7669/WSCompensacionesBatchRR-web/webresources/WSValidacionFallasRR/IntTelNode48HService/update',
        delete: 'http://100.126.19.74:7669/WSCompensacionesBatchRR-web/webresources/WSValidacionFallasRR/IntTelNode48HService/delete/',
      },
    },
    // failure validation - TBL_NODO_TV_16H - By_nodo_acuer11_2006_TV16H
    ValidationTvNode16H: {
      url: '',
      endpoints: {
        readall: 'http://100.126.19.74:7669/WSCompensacionesBatchRR-web/webresources/WSValidacionFallasRR/TvNode16HService/read/all',
        create: 'http://100.126.19.74:7669/WSCompensacionesBatchRR-web/webresources/WSValidacionFallasRR/TvNode16HService/create',
        update: 'http://100.126.19.74:7669/WSCompensacionesBatchRR-web/webresources/WSValidacionFallasRR/TvNode16HService/update',
        delete: 'http://100.126.19.74:7669/WSCompensacionesBatchRR-web/webresources/WSValidacionFallasRR/TvNode16HService/delete/',
      },
    },
    // failure validation - TBL_ARREGLO_TV_16H - Compens_arreglo_TV16H
    ValidationTvSetting16H: {
      url: '',
      endpoints: {
        readall: 'http://100.126.19.74:7669/WSCompensacionesBatchRR-web/webresources/WSValidacionFallasRR/TvSetting16HService/read/all',
        create: 'http://100.126.19.74:7669/WSCompensacionesBatchRR-web/webresources/WSValidacionFallasRR/TvSetting16HService/create',
        update: 'http://100.126.19.74:7669/WSCompensacionesBatchRR-web/webresources/WSValidacionFallasRR/TvSetting16HService/update',
        delete: 'http://100.126.19.74:7669/WSCompensacionesBatchRR-web/webresources/WSValidacionFallasRR/TvSetting16HService/delete/',
      },
    },
    // failure validation - TBL_ARREGLO_TEL_INT_48H - Compens_arreglos_telef_48H
    ValidationTelepSettlemCompensas: {
      url: '',
      endpoints: {
        readall: 'http://100.126.19.74:7669/WSCompensacionesBatchRR-web/webresources/WSCompensacionesBatchRR/TelepSettlemCompensaService/readAll',
        create: 'http://100.126.19.74:7669/WSCompensacionesBatchRR-web/webresources/WSCompensacionesBatchRR/TelepSettlemCompensaService/create',
        update: 'http://100.126.19.74:7669/WSCompensacionesBatchRR-web/webresources/WSCompensacionesBatchRR/TelepSettlemCompensaService/update',
        delete: 'http://100.126.19.74:7669/WSCompensacionesBatchRR-web/webresources/WSCompensacionesBatchRR/TelepSettlemCompensaService/delete/',
      },
    },
    // failure validation - TBL_COMPES_TEL_INT_48H - Compes_telef_48H
    ValidationTelepCompensa: {
      url: '',
      endpoints: {
        readall: 'http://100.126.19.74:7669/WSCompensacionesBatchRR-web/webresources/WSCompensacionesBatchRR/TelepCompensaService/readAll',
        create: 'http://100.126.19.74:7669/WSCompensacionesBatchRR-web/webresources/WSCompensacionesBatchRR/TelepCompensaService/create',
        update: 'http://100.126.19.74:7669/WSCompensacionesBatchRR-web/webresources/WSCompensacionesBatchRR/TelepCompensaService/update',
        delete: 'http://100.126.19.74:7669/WSCompensacionesBatchRR-web/webresources/WSCompensacionesBatchRR/TelepCompensaService/delete/',
      },
    },
    // failure validation - TBL_COMPES_TV_16H - Compes_TV_16H
    ValidationTelevCompensa: {
      url: '',
      endpoints: {
        readall: 'http://100.126.19.74:7669/WSCompensacionesBatchRR-web/webresources/WSCompensacionesBatchRR/TelevCompensaService/readAll',
        create: 'http://100.126.19.74:7669/WSCompensacionesBatchRR-web/webresources/WSCompensacionesBatchRR/TelevCompensaService/create',
        update: 'http://100.126.19.74:7669/WSCompensacionesBatchRR-web/webresources/WSCompensacionesBatchRR/TelevCompensaService/update',
        delete: 'http://100.126.19.74:7669/WSCompensacionesBatchRR-web/webresources/WSCompensacionesBatchRR/TelevCompensaService/delete/',
      },
    },
    // RR - validation - node
    NodesValidation: {
      url: '',
      endpoints: {
        readAll: 'HTTP://100.126.21.189:7777/MaximoService/V1.0/Rest/ReadAll',
        readAllApproved: 'HTTP://100.126.21.189:7777/MaximoService/V1.0/Rest/ReadAllApproved',
        readAllRejectedForQuality: 'HTTP://100.126.21.189:7777/MaximoService/V1.0/Rest/ReadAllQualityReject',
        update: 'HTTP://100.126.21.189:7777/MaximoService/V1.0/Rest/Update',
      },
    },
    // RR - validation - node (new causes)
    NewCauses: {
      url: '',
      endpoints: {
        run: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSCompensaciones/NewCausesService/run',
        readAll: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSCompensaciones/NewCausesService/readAll',
      },
    },
    // RR - validation - node (new symptoms)
    NewSymptoms: {
      url: '',
      endpoints: {
        run:  'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSCompensaciones/NewSymptomService/run',
        readAll:  'HTTP://100.126.19.74:7669/WSCompensaciones-web/webresources/WSCompensaciones/NewSymptomService/readAll',
      },
    },
    // failure validation - TBL_COMPES_IMPROCEDENCIA - Improcedencia_falla_masiva
    ValidationMassImproperFailure: {
      url: '',
      endpoints: {
        readall: 'http://100.126.19.74:7669/WSCompensacionesBatchRR-web/webresources/WSCompensacionesBatchRR/MassImproperFailureService/readAll',
        create: 'http://100.126.19.74:7669/WSCompensacionesBatchRR-web/webresources/WSCompensacionesBatchRR/MassImproperFailureService/create',
        update: 'http://100.126.19.74:7669/WSCompensacionesBatchRR-web/webresources/WSCompensacionesBatchRR/MassImproperFailureService/update',
        delete: 'http://100.126.19.74:7669/WSCompensacionesBatchRR-web/webresources/WSCompensacionesBatchRR/MassImproperFailureService/delete/',
      },
    },
    // detalle compensación (ITEM FACTURACIÓN RR / CUENTAS COMPENSADAS RR)
    CompensationDetail: {
      url: '',
      endpoints: {
        readall: 'http://100.126.19.74:7669/WSCompensacionesBatchRR-web/webresources/WSFacturacionRR/CompensationDetailService/read/all',
        create: 'http://100.126.19.74:7669/WSCompensacionesBatchRR-web/webresources/WSFacturacionRR/CompensationDetailService/create',
        update: 'http://100.126.19.74:7669/WSCompensacionesBatchRR-web/webresources/WSFacturacionRR/CompensationDetailService/update',
        delete: 'http://100.126.19.74:7669/WSCompensacionesBatchRR-web/webresources/WSFacturacionRR/CompensationDetailService/delete/',
      },
    },
    // total compensación (ITEM FACTURACIÓN RR / CUENTAS COMPENSADAS RR)
    TotalCompensation: {
      url: '',
      endpoints: {
        readall: 'http://100.126.19.74:7669/WSCompensacionesBatchRR-web/webresources/WSCompensacionesBatchRR/TotalCompensationService/readAll',
        create: 'http://100.126.19.74:7669/WSCompensacionesBatchRR-web/webresources/WSCompensacionesBatchRR/TotalCompensationService/create',
        update: 'http://100.126.19.74:7669/WSCompensacionesBatchRR-web/webresources/WSCompensacionesBatchRR/TotalCompensationService/update',
        delete: 'http://100.126.19.74:7669/WSCompensacionesBatchRR-web/webresources/WSCompensacionesBatchRR/TotalCompensationService/delete/',
      },
    },
    // nota compensación (ITEM FACTURACIÓN RR / CUENTAS COMPENSADAS RR)
    CompensationNote: {
      url: '',
      endpoints: {
        readall: 'http://100.126.19.74:7669/WSCompensacionesBatchRR-web/webresources/WSCompensacionesBatchRR/CompensationNoteService/readAll',
        create: 'http://100.126.19.74:7669/WSCompensacionesBatchRR-web/webresources/WSCompensacionesBatchRR/CompensationNoteService/create',
        update: 'http://100.126.19.74:7669/WSCompensacionesBatchRR-web/webresources/WSCompensacionesBatchRR/CompensationNoteService/update',
        delete: 'http://100.126.19.74:7669/WSCompensacionesBatchRR-web/webresources/WSCompensacionesBatchRR/CompensationNoteService/delete/',
      },
    },
    // Nodes Rents RR
    NodeRent: {
      url: '',
      endpoints: {
        readall: 'http://100.126.19.74:7669/WSCompensacionesBatchRR-web/webresources/WSRentasRR/NodeRentService/read/all',
      },
    },
    // Accounts Rents RR
    AccountRent: {
      url: '',
      endpoints: {
        readall: 'http://100.126.19.74:7669/WSCompensacionesBatchRR-web/webresources/WSRentasRR/AccountRentService/read/all',
      },
    },
    // Users
    User: {
      url: '',
      endpoints: {
        login: 'http://100.126.0.150:11051/WsPortalUsuariosRest-web/ws/WsPortalUsuariosRest/autentica',
      },
    },
    // Supervision Process
    SupervisionProcess: {
      endpoints: {
        nodesRules: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSNodesRules/NodesRulesService/run',
        businessRule: 'http://100.126.19.74:7669/WSCompensacionesBatchRR-web/webresources/WSBusinessRulesRR/BusinessRulesService/run',
        billingFiles: 'http://100.126.19.74:7669/WSCompensacionesBatchRR-web/webresources/WSBillingRR/BillingService/run',
        consolidateNodes: 'http://100.126.19.74:7669/WSCompensacionesBatchRR-web/webresources/WSConsolidationRR/ConsolidationAccountNodesService/run',
      },
    },
    // Notifications Mails
    NotificationsEmail: {
      url: '',
      endpoints: {
        sendMail: 'http://172.24.232.150:8010/Notification/V2.0/Rest/PutMessage',
      },
    },
    // Billing - Supervision Process
    BillingSupervision: {
      url: '',
      endpoints: {
        compensationValue: 'HTTP://100.126.21.189:7777/CompensationValueService/V1.0/Rest/ReadAll', // Bus
        readAll: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSBilling/SupervisionProcessService/readAll',
        update: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSBilling/SupervisionProcessService/update',
      },
    },
    // Observacion Nodos
    Observation: {
      url: '',
      endpoints: {
        readall: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSCompensaciones/ObservationToValidateService/readAll',
        create: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSCompensaciones/ObservationToValidateService/create',
        update: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSCompensaciones/ObservationToValidateService/update',
        delete: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSCompensaciones/ObservationToValidateService/delete/',
      },
    },
    // Fullstack Confirmation
    FullstackConfirmation: {
      url: '',
      endpoints: {
        readall: '',
        create: '',
        update: '',
        delete: '',
      },
    },
    // Parametros Generales
    ParametersGenerals: {
      url: '',
      endpoints: {
        readall: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSCompensaciones/ParameterService/readAll',
      },
    },
    // Parametros Servicios
    Parameters: {
      url: '',
      endpoints: {
        readall: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSCompensaciones/WebServiceParameterService/readAll',
        create: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSCompensaciones/WebServiceParameterService/create',
        update: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSCompensaciones/WebServiceParameterService/update',
        delete: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSCompensaciones/WebServiceParameterService/delete/',
      },
    },
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
