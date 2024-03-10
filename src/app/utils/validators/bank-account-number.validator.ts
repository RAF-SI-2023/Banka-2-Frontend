import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function bankAccountNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const pattern = /^[0-9]{6,}$/; // Minimum length of 6 digits
    const isValid = pattern.test(value);

    return isValid ? null : { invalidBankAccountNumber: true };
  };
}
