export interface ExchangeRequestDto {
	fromAccount: string;
	fromCurrency: string;
	toAccount: string;
	toCurrency: string;
	amount: number;
}
