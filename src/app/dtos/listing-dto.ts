export interface ListingDto {
  symbol: string;
  description: string;
  exchange: string;
  lastRefresh: number;
  price: number;
  high: number;
  low: number;
  change: number;
  volume: number;
}
