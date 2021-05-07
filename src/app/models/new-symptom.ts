export interface NewSymptomModel {
  id?: string;
  code: string;
  description: string;
  state: number;
}

interface GeneralResponse {
  code: string;
  descriptionCode: string;
  messageCode: string;
}

export interface RequestModel {
  NewSymptom: NewSymptomModel;
}

export interface ResponseModel {
  GeneralResponse: GeneralResponse;
}

export interface NewSymptomsApiModel {
  GeneralResponse: GeneralResponse;
  NewSymptoms: {
    NewSymptom: NewSymptomModel[];
  };
}
