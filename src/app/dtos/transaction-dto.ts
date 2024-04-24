export interface TransactionDto {
	id: string;
	amount: number;
	createdAt: number; // DateTime
	status: 'PENDING' | 'CONFIRMED' | 'DECLINED';
	type: 'INTERNAL' | 'EXTERNAL';

	// private String id;
	// private Long amount;
	// private LocalDateTime createdAt;
	// private TransactionStatus status;
	// private TransactionType type;
}
