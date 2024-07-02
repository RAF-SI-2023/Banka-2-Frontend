export interface MarginAccountDto {
	userId: number;
	email: string;
	currencyCode: string;
	balance: number;
	accountNumber: string;
	loanValue: number;
	maintenanceMargin: number;
	marginCall: boolean;
}
