export interface BulkLoadRequestModel {
  userName: string;
  fileName: string;
  file: string;
  uploadType: string;
}

export interface BulkLoadResponseModel {
  state: string;
  user: string;
  fileName: string;
  creationDate: string;
  uploadFile: string;
  uploadError?: string;
  uploadType: string;
}

export interface BulkLoadErrorModel {
  lineError: string;
  dataError: string;
  commentError: string;
}

export interface GeneralResponse {
  code: string;
  descriptionCode: string;
  messageCode: string;
}

export interface BulkLoadApiModel {
  GeneralResponse: GeneralResponse;
  compProcessLoad: BulkLoadResponseModel[];
}

export interface RequestModel {
  compProcessLoad: BulkLoadRequestModel;
}

// export interface ResponseModel {
//   GeneralResponse: GeneralResponse;
// }
