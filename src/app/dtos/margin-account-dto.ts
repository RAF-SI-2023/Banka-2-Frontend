export interface MarginAccountDto {
	id: number
	currencyCode: string;
	accountNumber: string;
	type: string;
	balance: number;
	loanValue: number;
	maintenanceMargin: number;
	marginCall: boolean;

}

// "id": 0,
// "currencyCode": "string",
// "accountNumber": "string",
// "type": "STOCK",
// "balance": 0,
// "loanValue": 0,
// "maintenanceMargin": 0,
// "marginCall": true