import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

interface CountryCodeConfig {
  code: string;
  minLength: number;
  maxLength: number;
}

export function phoneNumberValidator(): ValidatorFn {
  const countryCodes: CountryCodeConfig[] = [
    { code: '+381', minLength: 9, maxLength: 16 }, // Serbian country code
    { code: '+44', minLength: 5, maxLength: 15 }, // UK country code
    { code: '+1', minLength: 10, maxLength: 10 },   // US country code
    // Add more country codes as needed
  ];

  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    let isValid = false;
    for (const countryCode of countryCodes) {
      const { code, minLength, maxLength } = countryCode;
      const startsWithCountryCode = value.startsWith(code);
      const hasOnlyDigitsAfterCountryCode = new RegExp(`^${code}[0-9]+$`).test(value);
      const isValidLength = value.length >= minLength && value.length <= maxLength;

      if (startsWithCountryCode && hasOnlyDigitsAfterCountryCode && isValidLength) {
        isValid = true;
        break;
      }
    }

    if (!isValid) {
      return { invalidPhoneNumber: true };
    }

    return null; // Phone number is valid
  };
}
