// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  URL_API: '/WSCompensaciones-web/webresources/WSCompensaciones/',
  urlApi_bulkLoad: '/CompensacionesBatch-web/webresources/CompensacionesBatch/',
  URL_API_BATCHRR:
    '/WSCompensacionesBatchRR-web/webresources/WSCompensacionesBatchRR/',
  urlApi_failureValidation:
    '/WSCompensacionesBatchRR-web/webresources/WSValidacionFallasRR/',
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
    // Maintenance Orders Causes
    maintenanceOrderCause_create: 'maintenanceOrderCause/create',
    maintenanceOrderCause_delete: 'maintenanceOrderCause/delete',
    maintenanceOrderCause_update: 'maintenanceOrderCause/update',
    maintenanceOrdersCauses_read: 'maintenanceOrderCause/list',
    // Maintenance Orders Symptoms
    orders_symptoms_all: 'maintenanceOrderDiagnostic/list',
    order_symptom_create: 'maintenanceOrderDiagnostic/create',
    order_symptom_update: 'maintenanceOrderDiagnostic/update',
    order_symptom_delete: 'maintenanceOrderDiagnostic/delete',
    // Validation Accounts
    validation_accounts_all: 'crcCompensation/list',
    // Validation Nodes
    validationNodes_read: 'MaximoService/readAll',

    // failure validation - TBL_NODO_TEL_INT_48H - By_nodo_4296_Tel_Int_48h
    IntTelNodes48H_read: 'IntTelNode48HService/read/all',
    IntTelNodes48H_create: 'IntTelNode48HService/create',
    // failure validation - TBL_NODO_TV_16H - By_nodo_acuer11_2006_TV16H
    TvNodes16H_read: 'TvNode16HService/read/all',
    // failure validation - TBL_ARREGLO_TV_16H - Compens_arreglo_TV16H
    TvSettings16H_read: 'TvSetting16HService/read/all',
    // failure validation - TBL_ARREGLO_TEL_INT_48H - Compens_arreglos_telef_48H
    TelepSettlemCompensas_read: 'TelepSettlemCompensaService/readAll',
    // failure validation - TBL_COMPES_TEL_INT_48H - Compes_telef_48H
    TelepCompensas_read: 'TelepCompensaService/readAll',
    // failure validation - TBL_COMPES_TV_16H - Compes_TV_16H
    TelevCompensas_read: 'TelevCompensaService/readAll',
    // failure validation - TBL_COMPES_IMPROCEDENCIA - Improcedencia_falla_masiva
    MassImproperFailures_read: 'MassImproperFailureService/readAll',
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
