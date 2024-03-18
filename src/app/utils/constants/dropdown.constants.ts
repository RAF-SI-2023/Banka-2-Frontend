export interface DropdownOption {
  label: string
  value: string
}
export const DropdownOptions = {
  // Dropdown options for currency
  currencyCode: [
    { label: 'RSD', value: 'RSD' },
    { label: 'USD', value: 'USD' },
  ],
  // Dropdown options for account type
  domesticCurrencyAccountType: [
    { label: 'Personal', value: 'PERSONAL' },
    { label: 'Savings', value: 'SAVINGS' },
    { label: 'Retirement', value: 'RETIREMENT' },
    { label: 'Student', value: 'STUDENT' },
  ],
  accountType: [
    { label: 'Tekući', value: 'TEKUĆI' },
    { label: 'Devizni', value: 'DEVIZNI' },
  ],
  bankProfileType: [
    { label: 'Fizičko lice', value: 'PRIVATE' },
    { label: 'Pravno lice', value: 'CORPORATE' }
  ],
  gender: [
    { label: 'Muški', value: 'MALE' },
    { label: 'Ženski', value: 'FEMALE' }
  ],
}


