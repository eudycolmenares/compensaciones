export interface PriorityModel {
    priorityId: number;
    priorityCode: number
    priorityDescription: string;
    state: number;
    nodecompensates: number;
    accountscompensates: number;
    createDate?: string;
  }
  
  interface generalResponse {
    code: string;
    descriptionCode: string;
    messageCode: string;
  }
  
  export interface requestModel {
    priority: PriorityModel;
  }
  
  export interface responseModel {
    generalResponse: generalResponse;
  }
  
  export interface prioritiesApiModel {
    generalResponse: generalResponse;
    priority: PriorityModel[];
  }
  