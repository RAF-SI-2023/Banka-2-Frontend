export interface BankTransferTransactionDetailsDto {
	id: number;
	fee: number; // provizija banke
	boughtCurrency: string;
	soldCurrency: string;
	amount: number; // iznos novca
	totalProfit: number; // ukupan profit
	TransferTransactionDetailsId: number;
}
