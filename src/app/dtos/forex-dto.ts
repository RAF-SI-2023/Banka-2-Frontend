import { ListingDto } from './listing-dto';

export interface ForexDto extends ListingDto {
	baseCurrency: string;
	quoteCurrency: string;
}
