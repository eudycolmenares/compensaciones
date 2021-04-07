export interface symptomModel {
  symptomCode: string;
  symptomId?: number
  description: string;
  state: number | string;
  originId: number;
  origin: string;
  createDate?: string;
  user?: string;
}

interface generalResponse {
  code: string;
  descriptionCode: string;
  messageCode: string;
}

export interface requestModel {
  symptom: symptomModel;
}

export interface responseModel {
  generalResponse: generalResponse;
}

export interface symptomsApiModel {
  generalResponse: generalResponse;
  symptom: symptomModel[];
}
