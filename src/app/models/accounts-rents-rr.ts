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
  AccountRent: string[]
}

export interface accountRentModel {
  id?: string;
  account: string;
  date?: Date;
}

export interface requestAccountRentModel {
  AccountRent: accountRentModel;
}
