export interface NodesValidationModel {
  id?: number;
  useActually: string;
  cause: string;
  diagnosticDescription: string;
  maintenance: string;
  affectedService: string;
  compensation: string;
  internet: number;
  phone: number;
  television: number;
  state: number;
}

interface GeneralResponse {
  code?: number;
  description?: string;
}
export interface ResponseModel {
  response: GeneralResponse;
}

export interface NodesValidationApiModel {
  list: NodesValidationModel[];
  response: GeneralResponse;
}

export interface RequestModel {
  list: NodesValidationModel;
}
