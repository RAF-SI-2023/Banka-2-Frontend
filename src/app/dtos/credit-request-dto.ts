export interface CreditRequestDto {
	id: number;
	creditType: string;
	creditAmount: number;
	creditPurpose: string;
	monthlySalary: number;
	permanentEmployment: boolean;
	employmentPeriod: string;
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
