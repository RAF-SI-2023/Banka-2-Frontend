import { ListingDto } from './listing-dto';

export interface StockDto extends ListingDto {
	shares: number;
	yield: number;
	maintenanceMargin: number;
	marketCap: number;
	contractSize: number;
}
