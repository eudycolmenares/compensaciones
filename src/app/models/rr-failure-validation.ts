interface GeneralResponse {
  code: string;
  descriptionCode: string;
  messageCode: string;
}

export interface ResponseModel {
  GeneralResponse: GeneralResponse;
}

/////////////////////////////////////////////////

export interface IntTelNode48HModel {
  id?: string;
  issue: string;
  node: string;
  cause: string;
  time: string;
  service: string;
}

export interface IntTelNodes48HApiModel {
  GeneralResponse: GeneralResponse;
  IntTelNodes48H: {
    IntTelNode48H: IntTelNode48HModel[];
  };
}

export interface IntTelNodes48HRequestModel {
  IntTelNode48H: IntTelNode48HModel;
}

/////////////////////////////////////////////////

export interface MassImproperFailureModel {
  idTblImprocedureCompensation?: string;
  account: string;
  incident: string;
  service: string;
  time: string;
}

export interface MassImproperFailuresApiModel {
  GeneralResponse: GeneralResponse;
  TblImprocedureCompensation: {
    TblImprocedureCompensation: MassImproperFailureModel[];
  };
}

/////////////////////////////////////////////////

export interface TelepCompensaModel {
  idTblTelIntCompe48h?: string;
  account: string;
  incident: string;
  service: string;
  time: string;
}

export interface TelepCompensasApiModel {
  GeneralResponse: GeneralResponse;
  TblCompesTelInt48h: {
    TblCompesTelInt48h: TelepCompensaModel[];
  };
}

/////////////////////////////////////////////////

export interface TelepSettlemCompensaModel {
  idTblArrangementTelInt48h?: string;
  account: string;
  call: string;
  time: string;
  service: string;
}

export interface TelepSettlemCompensasApiModel {
  GeneralResponse: GeneralResponse;
  TblArrangementTelInt48h: {
    TblArrangementTelInt48h: TelepSettlemCompensaModel[];
  };
}

/////////////////////////////////////////////////

export interface TelevCompensaModel {
  idTblTvCompe16h?: string;
  account: string;
  incident: string;
  service: string;
  time: string;
}

export interface TelevCompensasApiModel {
  GeneralResponse: GeneralResponse;
  TblCompesTv16h: {
    TblCompesTv16h: TelevCompensaModel[];
  };
}

/////////////////////////////////////////////////

export interface TvNode16HModel {
  id?: string;
  issue: string;
  node: string;
  cause: string;
  time: string;
  service: string;
}

export interface TvNodes16HApiModel {
  GeneralResponse: GeneralResponse;
  TvNodes16H: {
    TvNode16H: TvNode16HModel[];
  };
}

/////////////////////////////////////////////////

export interface TvSetting16HModel {
  id?: string;
  account: string;
  call: string;
  time: string;
  service: string;
}

export interface TvSettings16HApiModel {
  GeneralResponse: GeneralResponse;
  TvSettings16H: {
    TvSetting16H: TvSetting16HModel[];
  };
}

/////////////////////////////////////////////////
