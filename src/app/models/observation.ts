export interface responseObservationModel {
  GeneralResponse: generalResponse;
  ObservationsToValidate: ObservationToValidate
}

interface generalResponse {
  code: string;
  descriptionCode: string;
  messageCode: string;
}

interface ObservationToValidate {
  ObservationToValidate: ObservationModel[];
}

export interface ObservationModel {
  id?: number;
  state: number
  description: string
}

export interface requestObservationModel {
  ObservationToValidate: ObservationModel;
}
