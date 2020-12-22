export const environment = {
  production: true,
  URL_API:
    'http://100.126.19.74:7669' +
    '/WSCompensaciones-web/webresources/WSCompensaciones/',
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
    cause_delete_id: 'CausesService/delete/',
    cause_update: 'CausesService/update',
    cause_read_id: 'CausesService/read/id/',
    causes_read: 'CausesService/read/all',
    // System status
    system_status_create: 'SystemStatusService/create',
    system_status_delete_id: 'SystemStatusService/delete/',
    system_status_update: 'SystemStatusService/update',
    system_status_read_id: 'SystemStatusService/read/id/',
    system_status_read: 'SystemStatusService/read/all',
    // Priorities
    priority_create: 'PriorityService/create',
    priority_delete_id: 'PriorityService/delete/',
    priority_update: 'PriorityService/update',
    priority_read_id: 'PriorityService/read/id/',
    priorities_read: 'PriorityService/readAll',
  },
};
