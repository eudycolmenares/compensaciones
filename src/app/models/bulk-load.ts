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

export interface GeneralResponse {
  Errors?: { Error: errorResponse[] };
  code: string;
  descriptionCode: string;
  messageCode: string;
}

export interface BulkLoadApiModel {
  GeneralResponse: GeneralResponse;
  compProcessLoad: BulkLoadResponseModel[];
}

export interface errorResponse {
  data: string;
  errorDescription: string;
  lineNumber: string;
}
