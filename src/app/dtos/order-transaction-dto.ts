export interface OrderTransactionDto {
	id: number;
	accountNumber: string;
	date: number;
	orderId: number;
	description: string;
	currency: string;
	payAmount: number;
	payoffAmount: number;
	reservedFunds: number;
	usedOfReservedFunds: number;
}
