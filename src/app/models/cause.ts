export interface CauseModel {
  id?: string;
  code: string;
  state: string;
  OriginType: {
    id: number;
    name?: string;
    description?: string;
    compensate?: number;
    state?: string;
    user?: string;
  };
  user?: string;
  createDate?: Date;
  failureCode: string;
  problemCode: string;
  CloneOriginType?: string;
}

interface GeneralResponse {
  code: string;
  descriptionCode: string;
  messageCode: string;
}

export interface RequestModel {
  Cause: CauseModel;
}

export interface ResponseModel {
  GeneralResponse: GeneralResponse;
}

export interface CausesApiModel {
  GeneralResponse: GeneralResponse;
  Causes: {
    Cause: CauseModel[];
  };
}
