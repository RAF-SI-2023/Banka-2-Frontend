import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const emailValidator = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const pattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    const isValid = pattern.test(value);

    return isValid ? null : { invalidEmail: true };
  };
}
