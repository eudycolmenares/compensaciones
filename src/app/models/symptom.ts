export interface symptomModel {
  symptomCode: string;
  symptomId?: number
  description: string;
  state: number;
  originId: number;
  origin: string;
  internet?: string;
  telephone?: string;
  television?: string;
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
