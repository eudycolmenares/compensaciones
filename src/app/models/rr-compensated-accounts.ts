interface GeneralResponse {
  code: string;
  descriptionCode: string;
  messageCode: string;
}

export interface ResponseModel {
  GeneralResponse: GeneralResponse;
}

/////////////////////////////////////////////////

export interface CompensationDetailModel {
  id?: string;
  account: string;
  categoryDescription: string;
  serviceName: string;
  serviceDescription: string;
  productName: string;
  trfPqrWarning: string;
  ticketNumber: string;
  date: string;
  lastRentDate: string;
  compensationCode: string;
  averangeDefValue: string;
  compesationValue: string;
}

export interface CompensationDetailsApiModel {
  GeneralResponse: GeneralResponse;
  CompensationsDetails: {
    CompensationDetail: CompensationDetailModel[];
  };
}

export interface CompensationDetailRequestModel {
  CompensationDetail: CompensationDetailModel;
}

/////////////////////////////////////////////////

export interface TotalCompensationModel {
  idTotalCompensation?: string;
  account: string;
  compensationValue: string;
  compensationcode: string;
  date: string;
}

export interface TotalCompensationApiModel {
  GeneralResponse: GeneralResponse;
  TblTotalCompensation: {
    TblTotalCompensation: TotalCompensationModel[];
  };
}

export interface TotalCompensationRequestModel {
  TblTotalCompensation: TotalCompensationModel;
}

/////////////////////////////////////////////////

export interface CompensationNoteModel {
  idNotaCompensacion?: string;
  account: string;
  note: string;
}

export interface CompensationNotesApiModel {
  GeneralResponse: GeneralResponse;
  TblCompensationNote: {
    TblCompensationNote: CompensationDetailModel[];
  };
}

export interface CompensationNoteRequestModel {
  TblCompensationNote: CompensationNoteModel;
}
