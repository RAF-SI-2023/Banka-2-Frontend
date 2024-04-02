export interface CompanyDto {
	id: number;
	companyName: string;
	faxNumber: string;
	phoneNumber: string;
	pib: number; // Poreski identifikacioni broj
	registryNumber: number; // Registarski broj
	identificationNumber: number; // Matični broj
	activityCode: number; // Šifra delatnosti
	address: string;
}
