export interface originModel {
  id?: string;
  name: string;
  description: string;
  state: string;
  // compensate: string;
  user?: string;
  updateDate?: string
}

interface generalResponse {
  code: string;
  descriptionCode: string;
  messageCode: string;
}

export interface requestModel {
  OriginType: originModel;
}

export interface responseModel {
  GeneralResponse: generalResponse;
}

export interface originsApiModel {
  GeneralResponse: generalResponse;
  OriginTypes: {
    OriginType: originModel[];
  }
}
