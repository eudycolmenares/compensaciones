export interface MaintenanceOrderCauseModel {
  id?: number;
  useActually: string;
  cause: string;
  diagnosticDescription: string;
  maintenance: string;
  affectedService: string;
  compensation: string;
  internet: number;
  phone: number;
  television: number;
  state: number;
}

interface GeneralResponse {
  code: string;
  descriptionCode: string;
  messageCode: string;
}
export interface ResponseModel {
  response: GeneralResponse;
}

export interface MaintenanceOrdersCausesApiModel {
  list: MaintenanceOrderCauseModel[];
  response: GeneralResponse;
}

export interface RequestModel {
  maintenanceOrderCause: MaintenanceOrderCauseModel;
}
