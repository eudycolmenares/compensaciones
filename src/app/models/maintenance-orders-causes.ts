export interface MOCausesModel {
    currentlyUse: string;
    causeCode: string;
    diagnosticDescription: string;
    maintenance: string;
    affectedServices: string;
    compensation: string;
  }
  
  interface GeneralResponse {
    code: string;
    descriptionCode: string;
    messageCode: string;
  }
  
  export interface MOCausesApiModel {
    GeneralResponse: GeneralResponse;
    MOCauses: MOCausesModel[];
  }
  
  export interface RequestModel {
    MOCauses: MOCausesApiModel;
  }