export interface AccountDto{
	id: number;
	accountNumber: string;
	email: string;
	status: boolean;
	accountType: string;
	availableBalance: number;
	reservedFunds: number;
	employeeId: number;
	creationDate: number;
	expirationDate: number;
	currencyCode: string;
	maintenanceFee: number;
}
