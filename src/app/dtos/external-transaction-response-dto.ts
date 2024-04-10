
export interface ExternalTransactionResponseDto {
    id:string;
	senderAccountNumber: string;
	receiverAccountNumber: string;
    transactionPurpose: string;
    referenceNumber: string;
    transactionCode: string;
	amount: number;
    createdAt:number;//date time
    status: "PENDING" | "CONFIRMED" | "DECLINED" ;    
    
    // private String id;
    // private String senderAccountNumber;
    // private String receiverAccountNumber;
    // private String transactionPurpose;
    // private String referenceNumber;
    // private String transactionCode;
    // private Long amount;
    // private LocalDateTime createdAt;
    // private TransactionStatus status;
}
