// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

let Url_WSCompensations = '/WSCompensaciones-web/webresources/WSCompensaciones/';
let Url_WSBilling = '/WSCompensaciones-web/webresources/WSBilling/';
let Url_WSCompensationsBatchRR = '/WSCompensacionesBatchRR-web/webresources/WSBillingRR/';

export const environment = {
  production: false,
  URL_API: '/WSCompensaciones-web/webresources/WSCompensaciones/',
  urlApi_bulkLoad: '/CompensacionesBatch-web/webresources/CompensacionesBatch/',
  URL_API_BATCHRR: '/WSCompensacionesBatchRR-web/webresources/WSCompensacionesBatchRR/',
  urlApi_failureValidation: '/WSCompensacionesBatchRR-web/webresources/WSValidacionFallasRR/',
  urlApi_billingRR: '/WSCompensacionesBatchRR-web/webresources/WSFacturacionRR/',
  urlApi_rentsRR: '/WSCompensacionesBatchRR-web/webresources/WSRentasRR/',
  urlApi_users: '/WsPortalUsuariosRest-web/ws/WsPortalUsuariosRest/',
  urlApi_rules: '/WSCompensaciones-web/webresources/WSNodesRules/',
  urlApi_Businessrules: '/WSCompensacionesBatchRR-web/webresources/WSBusinessRulesRR/',
  urlApi_BillingFiles: '/WSCompensacionesBatchRR-web/webresources/WSBillingRR/',
  urlApi_ConsolidationAccNod: '/WSCompensacionesBatchRR-web/webresources/WSConsolidationRR/',
  urlApi_notifications: '/Notification/V2.0/Rest/',
  endpoints: {
    // Settings
    settings_all: 'SettingsService/read/all',
    settings_create: 'SettingsService/create',
    settings_update: 'SettingsService/update',
    settings_delete: 'SettingsService/delete',
    // Symptom
    symptom_all: 'SymptomService/readAll',
    symptom_create: 'SymptomService/create',
    symptom_update: 'SymptomService/update',
    symptom_delete: 'SymptomService/delete',
    // Origin
    origin_all: 'OriginTypeService/read/all',
    origin_create: 'OriginTypeService/create',
    origin_update: 'OriginTypeService/update',
    origin_delete: 'OriginTypeService/delete',
    // Stratum
    stratum_all: 'SocialStratumService/readAll',
    stratum_create: 'SocialStratumService/create',
    stratum_update: 'SocialStratumService/update',
    stratum_delete: 'SocialStratumService/delete',
    // Causes
    cause_create: 'CausesService/create',
    cause_delete_id: 'CausesService/delete',
    cause_update: 'CausesService/update',
    cause_read_id: 'CausesService/read/id',
    causes_read: 'CausesService/read/all',
    // System status
    system_status_create: 'SystemStatusService/create',
    system_status_delete_id: 'SystemStatusService/delete',
    system_status_update: 'SystemStatusService/update',
    system_status_read_id: 'SystemStatusService/read/id',
    system_status_read: 'SystemStatusService/read/all',
    // Priorities
    priority_create: 'PriorityService/create',
    priority_delete_id: 'PriorityService/delete',
    priority_update: 'PriorityService/update',
    priority_read_id: 'PriorityService/read/id',
    priorities_read: 'PriorityService/readAll',
    // Bulk load
    bulk_load_create: 'sendFile',
    bulk_load_read: 'findTypeProcess',

    // Faults
    faults_load: 'LoadService/load',
    faults_read_id: 'LoadService/read/id',
    faults_read_all: 'LoadService/read/all',
    // ources/WSCompensacionesBatchRR/LoadService/read/id/{ID}

    // Maintenance Orders Causes
    maintenanceOrderCause_create: 'MaintenanceOrderCauseService/create',
    maintenanceOrderCause_delete: 'MaintenanceOrderCauseService/delete',
    maintenanceOrderCause_update: 'MaintenanceOrderCauseService/update',
    maintenanceOrdersCauses_read: 'MaintenanceOrderCauseService/list',
    // Maintenance Orders Symptoms
    orders_symptoms_all: 'MaintenanceOrderDiagnosticService/list',
    order_symptom_create: 'MaintenanceOrderDiagnosticService/create',
    order_symptom_update: 'MaintenanceOrderDiagnosticService/update',
    order_symptom_delete: 'MaintenanceOrderDiagnosticService/delete',
    // Validation Accounts
    validation_accounts_all: 'CrcCompensationService/list',
    // Validation Nodes
    validationNodes_read: 'MaximoService/readAll',
    // failure validation - TBL_NODO_TEL_INT_48H - By_nodo_4296_Tel_Int_48h
    IntTelNodes48H_read: 'IntTelNode48HService/read/all',
    IntTelNode48H_create: 'IntTelNode48HService/create',
    IntTelNode48H_update: 'IntTelNode48HService/update',
    IntTelNode48H_delete_id: 'IntTelNode48HService/delete',
    // failure validation - TBL_NODO_TV_16H - By_nodo_acuer11_2006_TV16H
    TvNodes16H_read: 'TvNode16HService/read/all',
    TvNode16H_create: 'TvNode16HService/create',
    TvNode16H_update: 'TvNode16HService/update',
    TvNode16H_delete_id: 'TvNode16HService/delete',
    // failure validation - TBL_ARREGLO_TV_16H - Compens_arreglo_TV16H
    TvSettings16H_read: 'TvSetting16HService/read/all',
    TvSetting16H_create: 'TvSetting16HService/create',
    TvSetting16H_update: 'TvSetting16HService/update',
    TvSetting16H_delete_id: 'TvSetting16HService/delete',
    // failure validation - TBL_ARREGLO_TEL_INT_48H - Compens_arreglos_telef_48H
    TelepSettlemCompensas_read: 'TelepSettlemCompensaService/readAll',
    TelepSettlemCompensa_create: 'TelepSettlemCompensaService/create',
    TelepSettlemCompensa_update: 'TelepSettlemCompensaService/update',
    TelepSettlemCompensa_delete_id: 'TelepSettlemCompensaService/delete',
    // failure validation - TBL_COMPES_TEL_INT_48H - Compes_telef_48H
    TelepCompensas_read: 'TelepCompensaService/readAll',
    TelepCompensa_create: 'TelepCompensaService/create',
    TelepCompensa_update: 'TelepCompensaService/update',
    TelepCompensa_delete_id: 'TelepCompensaService/delete',
    // failure validation - TBL_COMPES_TV_16H - Compes_TV_16H
    TelevCompensas_read: 'TelevCompensaService/readAll',
    TelevCompensa_create: 'TelevCompensaService/create',
    TelevCompensa_update: 'TelevCompensaService/update',
    TelevCompensa_delete_id: 'TelevCompensaService/delete',
    // failure validation - TBL_COMPES_IMPROCEDENCIA - Improcedencia_falla_masiva
    MassImproperFailures_read: 'MassImproperFailureService/readAll',
    MassImproperFailure_create: 'MassImproperFailureService/create',
    MassImproperFailure_update: 'MassImproperFailureService/update',
    MassImproperFailure_delete_id: 'MassImproperFailureService/delete',
    // nota compensación (ITEM FACTURACIÓN RR / CUENTAS COMPENSADAS RR)
    CompensationNotes_read: '/CompensationNoteService/readAll',
    CompensationNote_create: '/CompensationNoteService/create',
    CompensationNote_update: '/CompensationNoteService/update',
    CompensationNote_delete_id: '/CompensationNoteService/delete',
    // detalle compensación (ITEM FACTURACIÓN RR / CUENTAS COMPENSADAS RR)
    CompensationDetails_read: '/CompensationDetailService/read/all',
    CompensationDetail_create: '/CompensationDetailService/create',
    CompensationDetail_update: '/CompensationDetailService/update',
    CompensationDetail_delete_id: '/CompensationDetailService/delete',
    // total compensación (ITEM FACTURACIÓN RR / CUENTAS COMPENSADAS RR)
    TotalCompensation_read: '/TotalCompensationService/readAll',
    TotalCompensation_create: '/TotalCompensationService/create',
    TotalCompensation_update: '/TotalCompensationService/update',
    TotalCompensation_delete_id: '/TotalCompensationService/delete',
    // Nodes Rents RR
    nodes_rents_all: 'NodeRentService/read/all',
    node_rent_create: 'NodeRentService/create',
    node_rent_update: 'NodeRentService/update',
    node_rent_delete: 'NodeRentService/delete',
    // Accounts Rents RR
    accounts_rents_all: 'AccountRentService/read/all',
    account_rent_create: 'AccountRentService/create',
    account_rent_update: 'AccountRentService/update',
    account_rent_delete: 'AccountRentService/delete',
    // Users
    user_login: 'autentica',
    // Processes Rules
    nodes_rules: 'NodesRulesService/run',
    business_rules: 'BusinessRulesService/run',
    billing_files: 'BillingService/run',
    consolidate_account_nodes: 'ConsolidationAccountNodesService/run',
    // Notifications Mails
    send_mail: 'PutMessage',
    // Supervicion Process
    process_all: 'SupervisionProcessService/read/all',
  },
  // RR - parameterization - billing periods
  BillingPeriods: {
    url: Url_WSBilling,
    endpoints: {
      readAll: 'BillingPeriodsService/read/all',
      create: 'BillingPeriodsService/create',
      update: 'BillingPeriodsService/update',
      delete: 'BillingPeriodsService/delete',
    },
  },
  // Billing - Supervision Process
  BillingSupervision: {
    url: Url_WSBilling,
    endpoints: {
      compensationValue: 'CompensationValueService/read/all',
      readAll: 'SupervisionProcessService/read/all',
      update: 'SupervisionProcessService/update'
    },
  },
  // RR - validation - node
  NodesValidation: {
    url: Url_WSCompensations,
    endpoints: {
      // read all nodes
      readAll: 'MaximoService/readAll',
      // read all nodes approved
      readAllApproved: 'MaximoService/readAllApproved',
      // update
      update: 'MaximoService/update',
    },
  },
  // RR - Billing - RR Compensated Accounts
  compensatedAccounts: {
    url: Url_WSCompensationsBatchRR,
    endpoints: {
      run: 'BillingService/run',
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
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
