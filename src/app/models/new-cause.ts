export interface NewCauseModel {
  id?: string;
  causeCode: string;
  failureCode: string;
  problemCode: string;
  state: number;
}

interface GeneralResponse {
  code: string;
  descriptionCode: string;
  messageCode: string;
}

export interface RequestModel {
  NewCause: NewCauseModel;
}

export interface ResponseModel {
  GeneralResponse: GeneralResponse;
}

export interface NewCausesApiModel {
  GeneralResponse: GeneralResponse;
  NewCauses: {
    NewCause: NewCauseModel[];
  };
}
