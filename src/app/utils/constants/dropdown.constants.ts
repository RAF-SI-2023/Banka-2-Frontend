export interface DropdownOption {
	label: string;
	value: string;
}
export const DropdownOptions = {
	// Dropdown options for currency
	domesticCurrencyCode: [{ label: 'RSD', value: 'RSD' }],
	foreignCurrencyCode: [
		{ label: 'USD', value: 'USD' },
		{ label: 'EUR', value: 'EUR' },
		{ label: 'GBP', value: 'GBP' },
		{ label: 'CHF', value: 'CHF' },
		{ label: 'CAD', value: 'CAD' },
		{ label: 'AUD', value: 'AUD' },
		{ label: 'JPY', value: 'JPY' },
	],
	currencyCodes: [
		{ label: 'RSD', value: 'RSD' },
		{ label: 'USD', value: 'USD' },
		{ label: 'EUR', value: 'EUR' },
		{ label: 'GBP', value: 'GBP' },
		{ label: 'CHF', value: 'CHF' },
		{ label: 'CAD', value: 'CAD' },
		{ label: 'AUD', value: 'AUD' },
		{ label: 'JPY', value: 'JPY' },
	],
	// Dropdown options for account type
	currencyAccountType: [
		{ label: 'Personal', value: 'PERSONAL' },
		{ label: 'Savings', value: 'SAVINGS' },
		{ label: 'Retirement', value: 'RETIREMENT' },
		{ label: 'Student', value: 'STUDENT' },
	],
	accountType: [
		{ label: 'Dinarski', value: 'DINARSKI' },
		{ label: 'Devizni', value: 'DEVIZNI' },
		{ label: 'Poslovni', value: 'POSLOVNI' },
	],
	bankProfileType: [
		{ label: 'Fizičko lice', value: 'PRIVATE' },
		{ label: 'Pravno lice', value: 'CORPORATE' },
	],
	gender: [
		{ label: 'Muški', value: 'MALE' },
		{ label: 'Ženski', value: 'FEMALE' },
	],
	creditType: [
		{ label: 'Gotovinski', value: 'GOTOVINSKI' },
		{ label: 'Stambeni', value: 'STAMBENI' },
		{ label: 'Auto', value: 'AUTO' },
		{ label: 'Refinansirajuci', value: 'REFINANSIRAJUCI' },
	],
	transactionType: [
		{ label: 'Interne', value: 'INTERNE' },
		{ label: 'Eksterne', value: 'EKSTERNE' },
	],
	cardSettingsType: [
		{ label: 'Pravljenje', value: 'PRAVLJENJE' },
		{ label: 'Promena statusa', value: 'PROMENA STATUSA' },
		{ label: 'Promena limita', value: 'PROMENA LIMITA' },
	],
	cardTypeOptions: [
		{ label: 'Debitna', value: 'CREDIT' },
		{ label: 'Kreditna', value: 'DEBIT' },
	],
};
