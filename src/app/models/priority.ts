export interface PriorityModel {
    priorityId?: number;
    priorityCode: number
    priorityDescription: string;
    state: number;
    createDate?: string;
  }
  
  interface GeneralResponse {
    code: string;
    descriptionCode: string;
    messageCode: string;
  }
  
  export interface RequestModel {
    priority: PriorityModel;
  }
  
  export interface ResponseModel {
    generalResponse: GeneralResponse;
  }
  
  export interface PrioritiesApiModel {
    generalResponse: GeneralResponse;
    priority: PriorityModel[];
  }
  