export interface CauseModel {
    id?: string;
    code: string;
    state: string;
    Origin: {
      id: string;
    };
    OriginType: {
      id: string;
    };
    description: string;
    causes: string;
    user: string;
    television: string;
    internet: string;
    telephone: string;
    Disruption: {
      id?: string;
      description?: string;
    };
    Problem: {
      id?: string;
      description?: string;
    };
    createDate?: string;
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
  Causes:{
    Cause: CauseModel[];
  }
}
