export interface CreditDto {
	creditName: string;
	creditNumber: number;
	creditAmount: number;
	paymentPeriodMonths: number;
	nominalInterestRate: number;
	effectiveInterestRate: number;
	creditCreationDate: number;
	creditExpirationDate: number;
	installmentAmount: number;
	nextInstallmentDate: number;
	remainingAmount: number;
	currencyCode: string;
	accountNumber?: number;
}
