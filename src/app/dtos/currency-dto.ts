import {CurrencyInflationDto} from "./currency-inflation-dto";

export interface CurrencyDto {
	currencyName: string;
	currencyCode: string;
	currencySymbol: string;
	currencyPolity: string;
	inflationList: CurrencyInflationDto[];
}
