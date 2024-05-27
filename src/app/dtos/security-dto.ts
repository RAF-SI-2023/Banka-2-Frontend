export interface SecurityDto {
	id: number;
	email: string;
	ownedByBank: boolean;
	accountNumber: string;
	securitiesSymbol: string;
	quantity: number;
	quantityOfPubliclyAvailable: number;
	reservedQuantity: number;
	averageBuyingPrice: number;
}
// "id": 1,
// "email": "milosvasiljevic007@gmail.com",
// "ownedByBank": false,
// "accountNumber": "3334444999999999",
// "securitiesSymbol": "AAPL",
// "quantity": 20,
// "quantityOfPubliclyAvailable": 10,
// "reservedQuantity": 0
