export interface responseAccountsModel {
  GeneralResponse: generalResponse;
  AccountsRents: AccountRent;
}

interface generalResponse {
  code: string;
  descriptionCode: string;
  messageCode: string;
}

interface AccountRent {
  AccountRent: accountRentModel[]
}

export interface accountRentModel {
  id?: number;
  account: string;
  date?: Date;
}

export interface requestAccountRentModel {
  AccountRent: accountRentModel;
}
