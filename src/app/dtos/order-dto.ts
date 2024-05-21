export interface OrderDto {
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
