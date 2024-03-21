export interface DropdownOption {
  label: string;
  value: string;
}
export const DropdownOptions = {
  // Dropdown options for currency
  domesticCurrencyCode: [
    { label: 'RSD', value: 'RSD' },
  ],
  foreignCurrencyCode: [
    { label: 'USD', value: 'USD' },
    { label: 'EUR', value: 'EUR' },
    { label: 'GBP', value: 'GBP' },
    { label: 'CHF', value: 'CHF' },
    { label: 'CAD', value: 'CAD' },
    { label: 'AUD', value: 'AUD' },
    { label: 'JPY', value: 'JPY' },
    { label: 'CNY', value: 'CNY' },
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
  ],
  bankProfileType: [
    { label: 'Fizičko lice', value: 'PRIVATE' },
    { label: 'Pravno lice', value: 'CORPORATE' },
  ],
  gender: [
    { label: 'Muški', value: 'MALE' },
    { label: 'Ženski', value: 'FEMALE' },
  ],
};
