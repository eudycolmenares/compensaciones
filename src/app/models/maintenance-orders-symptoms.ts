export interface orderSymptomModel {
  id?: number;
  diagnostic: string;
  diagnosticDescription: string;
  compensation: string;
  maintenance: string;
  state: number;
  internet: number;
  phone: number;
  television: number;
  affectedServices?: string;
  useActually?: string;
}

export interface ordersSymptomsApiModel {
  generalResponse: generalResponse;
  list: orderSymptomModel[];
}

interface generalResponse {
  code: string;
  descriptionCode: string;
  messageCode: string;
}

export interface requestOrderSymptomModel {
  maintenanceOrderDiagnostic: orderSymptomModel;
}

export interface responseOrderSymptomModel {
  response: generalResponse;
}
