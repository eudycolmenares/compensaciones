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
    updateDate?: Date;
  };
  description?: string;
  causes?: string;
  user?: string;
  createDate?: Date;
  disruptionId?: string;
  disruptionDescription?: string;
  problemId?: string;
  problemDescription?: string;
  date?: Date;
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
