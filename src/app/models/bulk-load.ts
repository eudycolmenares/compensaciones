export interface BulkLoadModel {
    state?: string;
    userName: string;
    fileName: string;
    creationDate?: string;
    file: string;
    uploadError?: string;
    uploadType: string;
  }
  
  interface GeneralResponse {
    code: string;
    descriptionCode: string;
    messageCode: string;
  }
  
  export interface BulkLoadApiModel {
    GeneralResponse: GeneralResponse;
    compProcessLoad: BulkLoadModel[];
  }
  
  export interface RequestModel {
    compProcessLoad: BulkLoadModel;
  }
  
  export interface ResponseModel {
    GeneralResponse: GeneralResponse;
  }
  