export interface MyOfferDto {
	myOfferId: number;
	ticker: string;
	amount: number;
	price: number;
	offerStatus: string;
}

export enum OfferStatus {
	PROCESSING = 'PROCESSING',
	ACCEPTED = 'ACCEPTED',
	DECLINED = 'DECLINED',
	FINISHED_ACCEPTED = 'FINISHED_ACCEPTED',
	FINISHED_DECLINED = 'FINISHED_DECLINED',
}
