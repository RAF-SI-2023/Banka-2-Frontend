export interface OrderDto {
	id: number;
	orderStatus: string;
	orderActionType: string;
	listingType: string;
	securitiesSymbol: string;
	quantity: number;
	settlementDate: number;
	limitPrice: string;
	stopPrice: string;
	allOrNone: boolean;
	margin: boolean;
}

export enum OrderStatus {
	APPROVED = 'APPROVED',
	WAITING_FOR_APPROVAL = 'WAITING_FOR_APPROVAL',
	DENIED = 'DENIED',
}
