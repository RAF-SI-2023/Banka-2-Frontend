import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function bankAccountNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const pattern = /^\d{3}-\d{4}-\d{9}$/; // Format: 3 digits for bank, 4 digits for branch, 9 digits for account number
    const isValid = pattern.test(value);

    return isValid ? null : { invalidBankAccountNumber: true };
  };
}
