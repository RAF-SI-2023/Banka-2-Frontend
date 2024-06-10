export interface MarginTransactionDto {
	orderId: number;
	userId: number;
	marginsAccountId: number;
	description: string;
	currencyCode: string;
	type: string;
	initialMargin: number;
	maintenanceMargin: number;
}
