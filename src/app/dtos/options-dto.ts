export interface OptionsDto {
    stockListing: string;
    optionType: string;
    strikePrice: number;
    impliedVolatility: number;
    openInterest: number;
    settlementDate: number;
}
