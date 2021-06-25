export interface responseAccountsModel {
	list: accountModel[]
	response: generalResponse;
}

interface generalResponse {
	code: string;
	descriptionCode: string;
	messageCode: string;
 }

export interface accountModel {
	amount: number;
	changeService: string;
	contractCode: string;
	contractId: string;
	customerId: string;
	customerNumber: string;
	highAmount: string;
	id?: number;
	validFrom: string;
}

export interface requestAccountsModel {
	compCrc: accountModel;
}

export interface responseAccount {
	response: generalResponse;
}
