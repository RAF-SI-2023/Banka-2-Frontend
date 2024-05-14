export interface InternalTransactionResponseDto {
	id: string;
	senderAccountNumber: string;
	receiverAccountNumber: string;
	amount: number;
	createdAt: number; // DateTime
	status: 'PENDING' | 'CONFIRMED' | 'DECLINED';

	// private String id;
	// private String senderAccountNumber;
	// private String receiverAccountNumber;
	// private Long amount;
	// private LocalDateTime createdAt;
	// private TransactionStatus status;
}
