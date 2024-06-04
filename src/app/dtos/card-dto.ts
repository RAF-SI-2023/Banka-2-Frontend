export interface CardDto {
	identificationCardNumber: number;
	cardType: string;
	nameOfCard: string;
	creationDate: number;
	expirationDate: number;
	accountNumber: string;
	cvvCode: string;
	limitCard: number;
	status: boolean;
	block: boolean;
}
