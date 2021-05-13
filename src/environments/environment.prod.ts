export const environment = {
  production: true,
  endpoints: {
    // Settings
    Settings: {
      url: '',
      endpoints: {
        readall: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSCompensaciones/SettingsService/read/all',
        create: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSCompensaciones/SettingsService/create',
        update: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSCompensaciones/SettingsService/update',
        delete: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSCompensaciones/SettingsService/delete/',
      },
    },
    // Symptom
    Symptom: {
      url: '',
      endpoints: {
        readall: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSCompensaciones/SymptomService/readAll',
        create: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSCompensaciones/SymptomService/create',
        update: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSCompensaciones/SymptomService/update',
        delete: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSCompensaciones/SymptomService/delete/',
      },
    },
    // Origin
    Origin: {
      url: '',
      endpoints: {
        readall: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSCompensaciones/OriginTypeService/read/all',
        create: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSCompensaciones/OriginTypeService/create',
        update: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSCompensaciones/OriginTypeService/update',
        delete: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSCompensaciones/OriginTypeService/delete/',
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
    // Cause
    Cause: {
      url: '',
      endpoints: {
        readall: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSCompensaciones/CausesService/read/all',
        readid: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSCompensaciones/CausesService/read/id/',
        create: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSCompensaciones/CausesService/create',
        update: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSCompensaciones/CausesService/update',
        delete: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSCompensaciones/CausesService/delete/',
      },
    },
    // System status
    SystemStatus: {
      url: '',
      endpoints: {
        readall: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSCompensaciones/SystemStatusService/read/all',
        readid: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSCompensaciones/SystemStatusService/read/id/',
        create: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSCompensaciones/SystemStatusService/create',
        update: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSCompensaciones/SystemStatusService/update',
        delete: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSCompensaciones/SystemStatusService/delete/',
      },
    },
    // Priorities
    Priority: {
      url: '',
      endpoints: {
        readall: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSCompensaciones/PriorityService/readAll',
        readid: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSCompensaciones/PriorityService/read/id/',
        create: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSCompensaciones/PriorityService/create',
        update: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSCompensaciones/PriorityService/update',
        delete: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSCompensaciones/PriorityService/delete/',
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
    // Maintenance Orders Causes
    OrderCause: {
      url: '',
      endpoints: {
        readall: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSCompensaciones/MaintenanceOrderCauseService/list',
        create: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSCompensaciones/MaintenanceOrderCauseService/create',
        update: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSCompensaciones/MaintenanceOrderCauseService/update',
        delete: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSCompensaciones/MaintenanceOrderCauseService/delete/',
      },
    },
    // Maintenance Orders Symptoms
    OrderSymptoms: {
      url: '',
      endpoints: {
        readall: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSCompensaciones/MaintenanceOrderDiagnosticService/list',
        create: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSCompensaciones/MaintenanceOrderDiagnosticService/create',
        update: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSCompensaciones/MaintenanceOrderDiagnosticService/update',
        delete: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSCompensaciones/MaintenanceOrderDiagnosticService/delete/',
      },
    },
    // RR - parameterization - billing periods
    BillingPeriods: {
      url: '',
      endpoints: {
        readAll: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSBilling/BillingPeriodsService/read/all',
        create: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSBilling/BillingPeriodsService/create',
        update: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSBilling/BillingPeriodsService/update',
        delete: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSBilling/BillingPeriodsService/delete/',
      },
    },
    // Validation Accounts
    ValidationAccounts: {
      url: '',
      endpoints: {
        readall: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSCompensaciones/CrcCompensationService/list',
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
        readAll: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSCompensaciones/MaximoService/readAll',
        readAllApproved: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSCompensaciones/MaximoService/readAllApproved',
        readAllRejectedForQuality: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSCompensaciones/MaximoService/readAllQualityReject',
        update: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSCompensaciones/MaximoService/update',
      },
    },
    // RR - validation - node (new causes)
    NewCauses: {
      url: '',
      endpoints: {
        run: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSCompensaciones/NewCausesService/run',
        readAll: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSCompensaciones/NewCausesService/read/all',
      },
    },
    // RR - validation - node (new symptoms)
    NewSymptoms: {
      url: '',
      endpoints: {
        run:  'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSCompensaciones/NewSymptomService/run',
        readAll:  'HTTP://100.126.19.74:7669/WSCompensaciones-web/webresources/WSCompensaciones/NewSymptomService/read/all',
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
        compensationValue: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSBilling/CompensationValueService/read/all',
        readAll: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSBilling/SupervisionProcessService/read/all',
        update: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSBilling/SupervisionProcessService/update',
      },
    },
    // Observacion Nodos
    Observation: {
      url: '',
      endpoints: {
        readall: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSCompensaciones/ObservationToValidateService/read/all',
        create: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSCompensaciones/ObservationToValidateService/create',
        update: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSCompensaciones/ObservationToValidateService/update',
        delete: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSCompensaciones/ObservationToValidateService/delete/',
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
        readall: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSCompensaciones/WebServiceParameterService/read/all',
        create: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSCompensaciones/WebServiceParameterService/create',
        update: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSCompensaciones/WebServiceParameterService/update',
        delete: 'http://100.126.19.74:7669/WSCompensaciones-web/webresources/WSCompensaciones/WebServiceParameterService/delete/',
      },
    },
  },
};
