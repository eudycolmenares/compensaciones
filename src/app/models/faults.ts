export interface loadModel {
  idLoad: number;
  createDate: string;
  fileName: string;
  loadFile: string;
  loadType: string;
  state: string;
  user: string;
  loadError?: string;
}

interface generalResponse {
  code: string;
  descriptionCode: string;
  messageCode: string;
}

export interface faultsApiModel {
  GeneralResponse: generalResponse;
  Loads: {
    Load: loadModel[];
  }
}
