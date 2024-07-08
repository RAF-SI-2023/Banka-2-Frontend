export interface MarginTransactionResponseDto {
	id: number;
	orderId: number;
	userId: number;
	createdAt: number;
	marginsAccountId: number;
	accountNumber: string;
	description: string;
	currencyCode: string;
	type: string;
	loanValue: number;
	initialMargin: number;
	maintenanceMargin: number;
}

// private Long id;
// private Long orderId;
// private Long userId;
// private Long createdAt;
// private Long marginsAccountId;
// private String accountNumber;
// private String description;
// private String currencyCode;
// private TransactionDirection type;
// private Double loanValue;
// private Double initialMargin;
// private Double maintenanceMargin;
