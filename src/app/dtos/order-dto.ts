export interface OrderDto {
	id: number;
	orderStatus: string;
	orderActionType: string;
	listingType: string;
	securitiesSymbol: string;
	quantity: number;
	settlementDate: number;
	limitPrice: number;
	stopPrice: number;
	allOrNone: boolean;
	margin: boolean;
}

export enum OrderStatus {
	APPROVED = 'APPROVED',
	DENIED = 'DENIED',
	WAITING_FOR_APPROVAL = 'WAITING_FOR_APPROVAL',
}
