import { headerRequestBus } from '../shared/models/parameters';

export interface CauseModel {
  id?: string;
  code: string;
  state: string;
  originType: {
    id: number;
    name?: string;
    description?: string;
    compensate?: number;
    state?: string;
    user?: string;
  };
  user?: string;
  createDate?: string;
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
  cause: CauseModel;
  headerRequest?: headerRequestBus;
}

export interface ResponseModel {
  generalResponse: GeneralResponse;
}

export interface CausesApiModel {
  generalResponse: GeneralResponse;
  causes: {
    cause: CauseModel[];
  };
}
