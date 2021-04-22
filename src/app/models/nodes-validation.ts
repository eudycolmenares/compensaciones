export interface NodesValidationModel {
  incidence: string;
  incidenceDesc: string;
  state: string;
  stateDesc: string;
  ciPpal: string;
  principalCi: string;
  techniqueUbi: string;
  cause: string;
  causeDesc: string;
  anomaliaClass: string;
  anomaliaClassDesc: string;
  problem: string;
  problemDesc: string;
  classificationCod: string;
  problDescCod: string;
  resolution: string;
  resolutionDesc: string;
  priority: number;
  nodeAdic: string;
  CreationDate: Date;
  dateResolution: Date;
  timeCreation: string;
  timeResolution: string;
  incidenceDuration: number;
  dateInNode: Date;
  dateEndNode: Date;
  timeInNode: string;
  timeEndNode: string;
  nodeDuration: number;
  durationFormat?: string;
  Department: string;
  municipality: string;
  responsibleAreaCode: string;
  sds: string;
  createdBy: string;
  descriptionCreatedBy: string;
  teamAddress: string;
  responsibleIng: string;
  descriptionIngResponsible: string;
  externalTicket: string;
  excluded: number;
  mExcluded: string;
  online: number;
  compensatesTv: string;
  compensatesInt: string;
  compensatesTel: string;
  log: string;
  revision: string;
  srTv: number;
  srInternet: number;
  srVoz: number;
  originType: string;
  userObservation: string;
  customDateInNode?: string;
  customDateEndNode?: string;
}

interface GeneralResponse {
  code: string;
  descriptionCode: string;
  messageCode: string;
}
export interface ResponseModel {
  generalResponse: GeneralResponse;
}

export interface NodesValidationApiModel {
  tblMaximum: NodesValidationModel[];
  generalResponse: GeneralResponse;
}

export interface RequestModel {
  tblMaximum: NodesValidationModel;
}
