
export interface ExternalTransactionRequestDto {
	senderAccountNumber: string;
	receiverAccountNumber: string;
    transactionPurpose: string;
    referenceNumber: string;
    transactionCode: string;
	amount: number;
}
