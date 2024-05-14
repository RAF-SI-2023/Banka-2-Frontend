export interface FuturesContractDto {
	id: number;
	name: string;
	code: string;
	contractSize: number;
	contractUnit: string;
	openInterest: number;
	settlementDate: number;
	maintenanceMargin: number;
	type: string;
}
