export interface responseProcessModel {
  generalResponse: generalResponse;
  tblProcesoSupervision: processModel[];
}

interface generalResponse {
  code: string;
  descriptionCode: string;
  messageCode: string;
}

export interface processModel {
  area: string;
  email: string;
  processCode: string;
  processDescription: string;
  processName: string;
  stateProcess: string;
  supervisionProcessId: number;
  sendEmail: string;
  stateSendEmail: string;
  status?: number;
  stage?: number;
}

export interface respUpdateProcessModel {
  generalResponse: generalResponse
}

export interface reqUpdateProcessModel {
  TblSupervisionProcess: processModel
}

export interface sendMailModel {
  "SendEmail": {
    "email": string;
    "state": string;
  }
}
