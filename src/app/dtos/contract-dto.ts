export interface ContractDto {
	id: number;
	bankConfirmation: boolean;
	sellerConfirmation: boolean;
	comment: string;
	dateTimeCreated: number;
	dateTimeRealized: number;
	contractNumber: string;
	description: string;
	ticker: string; // i.e. AAPL  might be listingName or smtn
	volume: number;
	totalPrice: number; // U dinarima iz nekog razloga
	contractStatus: string;
	buyersPIB: number;
	sellersPIB: number;
	buyersEmail: string;
	sellersEmail: string;
	contractType: string;
}

export enum ContractStatus {
	APPROVED = 'APPROVED',
	REJECTED = 'REJECTED',
	WAITING = 'WAITING',
}
