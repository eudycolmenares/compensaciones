export interface FullstackConfirmationModel {
  id?: string;
  charge_service: string;
  cust_num: string;
  customer_id: string;
  co_code: string;
  co_id: string;
  valid_from: string;
  amount: string;
  execute_date: string;
  state: string;
  observation: string;
}

interface GeneralResponse {
  code: string;
  descriptionCode: string;
  messageCode: string;
}

export interface RequestModel {
  FullstackConfirmation: FullstackConfirmationModel;
}

export interface ResponseModel {
  GeneralResponse: GeneralResponse;
}

export interface FullstackConfirmationsApiModel {
  GeneralResponse: GeneralResponse;
  FullstackConfirmations: {
    FullstackConfirmation: FullstackConfirmationModel[];
  };
}
