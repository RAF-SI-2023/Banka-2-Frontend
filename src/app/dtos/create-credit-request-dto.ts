export interface CreateCreditRequestDto {
	id: number;
	creditType: string;
	creditAmount: number;
	creditPurpose: string;
	monthlySalary: number;
	permanentEmployment: boolean;
	employmentPeriod: string;
	// maturity: string;
	currency: string;
	mobileNumber: string;
	accountNumber: string;
	branch: string;
	note: string;
	educationLevel: string;
	maritalStatus: string;
	housingStatus: string;
	ownCar: boolean;
	paymentPeriodMonths: number;
}
