export interface stratumModel {
  idSocialStatus?: string;
  statusSocial: string;
  description: string;
  creationDate?: string
}

interface generalResponse {
  code: string;
  descriptionCode: string;
  messageCode: string;
}

export interface strataApiModel {
  generalResponse: generalResponse;
  socialStatus: stratumModel[];
}

export interface requestModel {
  SocialStatus: stratumModel;
}

export interface responseModel {
  generalResponse: generalResponse;
}
