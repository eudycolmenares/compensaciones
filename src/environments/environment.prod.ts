export const environment = {
  production: true,
  endpoints: {
    // Settings
    Settings: {
      url: '',
      endpoints: {
        readall: '',
        create: '',
        update: '',
        delete: '',
      },
    },
    // Symptom
    Symptom: {
      url: '',
      endpoints: {
        readall: '',
        create: '',
        update: '',
        delete: '',
      },
    },
    // Origin
    Origin: {
      url: '',
      endpoints: {
        readall: '',
        create: '',
        update: '',
        delete: '',
      },
    },
    // Stratum
    Stratum: {
      url: '',
      endpoints: {
        readall: '',
        create: '',
        update: '',
        delete: '',
      },
    },
    // Cause
    Cause: {
      url: '',
      endpoints: {
        readall: '',
        readid: '',
        create: '',
        update: '',
        delete: '',
      },
    },
    // System status
    SystemStatus: {
      url: '',
      endpoints: {
        readall: '',
        readid: '',
        create: '',
        update: '',
        delete: '',
      },
    },
    // Priorities
    Priority: {
      url: '',
      endpoints: {
        readall: '',
        readid: '',
        create: '',
        update: '',
        delete: '',
      },
    },
    // Bulk load
    BulkLoad: {
      url: '',
      endpoints: {
        create: '',
      },
    },
    // Faults
    Faults: {
      url: '',
      endpoints: {
        readall: '',
        readid: '',
        load: '',
      },
    },
    // Maintenance Orders Causes
    OrderCause: {
      url: '',
      endpoints: {
        readall: '',
        create: '',
        update: '',
        delete: '',
      },
    },
    // Maintenance Orders Symptoms
    OrderSymptoms: {
      url: '',
      endpoints: {
        readall: '',
        create: '',
        update: '',
        delete: '',
      },
    },
    // RR - parameterization - billing periods
    BillingPeriods: {
      url: '',
      endpoints: {
        readAll: '',
        create: '',
        update: '',
        delete: '',
      },
    },
    // Validation Accounts
    ValidationAccounts: {
      url: '',
      endpoints: {
        readall: '',
      },
    },
    // Validation Nodes: 'MaximoService/readAll',
    // failure validation - TBL_NODO_TEL_INT_48H - By_nodo_4296_Tel_Int_48h
    ValidationIntTelNode48H: {
      url: '',
      endpoints: {
        readall: '',
        create: '',
        update: '',
        delete: '',
      },
    },
    // failure validation - TBL_NODO_TV_16H - By_nodo_acuer11_2006_TV16H
    ValidationTvNode16H: {
      url: '',
      endpoints: {
        readall: '',
        create: '',
        update: '',
        delete: '',
      },
    },
    // failure validation - TBL_ARREGLO_TV_16H - Compens_arreglo_TV16H
    ValidationTvSetting16H: {
      url: '',
      endpoints: {
        readall: '',
        create: '',
        update: '',
        delete: '',
      },
    },
    // failure validation - TBL_ARREGLO_TEL_INT_48H - Compens_arreglos_telef_48H
    ValidationTelepSettlemCompensas: {
      url: '',
      endpoints: {
        readall: '',
        create: '',
        update: '',
        delete: '',
      },
    },
    // failure validation - TBL_COMPES_TEL_INT_48H - Compes_telef_48H
    ValidationTelepCompensa: {
      url: '',
      endpoints: {
        readall: '',
        create: '',
        update: '',
        delete: '',
      },
    },
    // failure validation - TBL_COMPES_TV_16H - Compes_TV_16H
    ValidationTelevCompensa: {
      url: '',
      endpoints: {
        readall: '',
        create: '',
        update: '',
        delete: '',
      },
    },
    // RR - validation - node
    NodesValidation: {
      url: '',
      endpoints: {
        readAll: '',
        readAllApproved: '',
        readAllRejectedForQuality: '',
        update: '',
      },
    },
    // RR - validation - node (new causes)
    NewCauses: {
      url: '',
      endpoints: {
        run: '',
        readAll: '',
      },
    },
    // RR - validation - node (new symptoms)
    NewSymptoms: {
      url: '',
      endpoints: {
        run:  '',
        readAll:  '',
      },
    },
    // failure validation - TBL_COMPES_IMPROCEDENCIA - Improcedencia_falla_masiva
    ValidationMassImproperFailure: {
      url: '',
      endpoints: {
        readall: '',
        create: '',
        update: '',
        delete: '',
      },
    },
    // detalle compensación (ITEM FACTURACIÓN RR / CUENTAS COMPENSADAS RR)
    CompensationDetail: {
      url: '',
      endpoints: {
        readall: '',
        create: '',
        update: '',
        delete: '',
      },
    },
    // total compensación (ITEM FACTURACIÓN RR / CUENTAS COMPENSADAS RR)
    TotalCompensation: {
      url: '',
      endpoints: {
        readall: '',
        create: '',
        update: '',
        delete: '',
      },
    },
    // nota compensación (ITEM FACTURACIÓN RR / CUENTAS COMPENSADAS RR)
    CompensationNote: {
      url: '',
      endpoints: {
        readall: '',
        create: '',
        update: '',
        delete: '',
      },
    },
    // Nodes Rents RR
    NodeRent: {
      url: '',
      endpoints: {
        readall: '',
      },
    },
    // Accounts Rents RR
    AccountRent: {
      url: '',
      endpoints: {
        readall: '',
      },
    },
    // Users
    User: {
      url: '',
      endpoints: {
        login: '',
      },
    },
    // Supervision Process
    SupervisionProcess: {
      endpoints: {
        nodesRules: '',
        businessRule: '',
        billingFiles: '',
        consolidateNodes: '',
      },
    },
    // Notifications Mails
    NotificationsEmail: {
      url: '',
      endpoints: {
        sendMail: '',
      },
    },
    // Billing - Supervision Process
    BillingSupervision: {
      url: '',
      endpoints: {
        compensationValue: '',
        readAll: '',
        update: '',
      },
    },
    // Observacion Nodos
    Observation: {
      url: '',
      endpoints: {
        readall: '',
        create: '',
        update: '',
        delete: '',
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
