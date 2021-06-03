export interface responseSettingsModel {
  GeneralResponse: generalResponse;
  WebServiceParameters: WebServiceParameter
}

interface generalResponse {
  code: string;
  descriptionCode: string;
  messageCode: string;
}

interface WebServiceParameter {
  WebServiceParameter: WSparameter[]
}

export interface WSparameter {
  code: string;
  endpoint: string;
  environment: string;
  id: number;
  ip: string;
  name: string;
  path: string;
  port: string;
  protocol: string;
}

export interface ParamsGeneralModel {
  code: string;
  description: string;
  name: string;
  parameterId: number;
  value: string;
}

export interface estructTableModel {
  name: string;
  description: string;
  validation: string;
}
