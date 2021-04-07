export interface BillingPeriodModel {
  periodId?: number;
  startDate: string | Date;
  endDate: string | Date;
  month?: number;
  year?: number;
  invoiced?: number;
}

interface GeneralResponse {
  code: string;
  descriptionCode: string;
  messageCode: string;
}

export interface ResponseModel {
  generalResponse: GeneralResponse;
}

export interface BillingPeriodsApiModel {
  tblBillingPeriods?: BillingPeriodModel[];
  TblBillingPeriods?: BillingPeriodModel[];
  generalResponse: GeneralResponse;
}

export interface RequestModel {
  tblBillingPeriods?: BillingPeriodModel;
  TblBillingPeriods?: BillingPeriodModel;
}
