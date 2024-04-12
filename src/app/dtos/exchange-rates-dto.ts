export interface ExchangeRatesDto {
	id: number;
	timeLastUpdated: number;
	timeNextUpdate: number;
	fromCurrency: string;
	toCurrency: string;
	exchangeRate: number;
}
