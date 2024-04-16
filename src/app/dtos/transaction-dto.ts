export interface TransactionDto {
	id: string;
	amount: number;
	createdAt: number; //date time
	type: 'INTERNAL' | 'EXTERNAL';
	status: 'PENDING' | 'CONFIRMED' | 'DECLINED';
	// private String id;
	// private Long amount;
	// private LocalDateTime createdAt;
	// private TransactionStatus status;
	// private TransactionType type;
}
