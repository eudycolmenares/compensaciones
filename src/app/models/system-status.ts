export interface SystemStatusApiModel {
    GeneralResponse: GeneralResponse;
    SystemsStatus: {
        SystemStatus: SystemStatusModel[];
    };
  }
  
  export interface SearchResultModel {
    SystemsStatus: SystemStatusApiModel[];
    total: number;
  }
  
  export interface SystemStatusModel {
      id: string;
      description: string;
      compensate: string;
      state: string;
      user: string;
      createDate: string;
  }
  
  interface GeneralResponse {
    code: string;
    descriptionCode: string;
    messageCode: string;
  }
  
  export interface RequestModel {
    SystemStatus: SystemStatusModel;
  }
  
  export interface ResponseModel {
    generalResponse: GeneralResponse;
  }