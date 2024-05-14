export interface CreditRequestDto {
	id: number;
	creditType: string; // Obavezan
	creditAmount: number; // Obavezan
	creditPurpose: string;
	monthlySalary: number;
	permanentEmployment: boolean;
	employmentPeriod: string;
	currency: string;
	mobileNumber: string;
	accountNumber: string; // Obavezan
	branch: string;
	note: string;
	educationLevel: string;
	maritalStatus: string;
	housingStatus: string;
	ownCar: boolean;
	paymentPeriodMonths: number; // Obavezan
}
