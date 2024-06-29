import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-interbank-offer-dialog',
  templateUrl: './new-interbank-offer-dialog.component.html',
  styleUrls: ['./new-interbank-offer-dialog.component.css'],
})
export class NewInterbankOfferDialogComponent {
  form: FormGroup;
  maxAmount: number; // Store the maximum allowed amount

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { ticker: string, amount: number }
  ) {
    this.maxAmount = data.amount; // Set the maximum amount from data

    this.form = this.fb.group({
      ticker: [{ value: data.ticker, disabled: true }, Validators.required],
      amount: ['', [Validators.required, this.amountValidator()]], // Add custom validator
      price: ['', Validators.required],
    });
  }

  amountValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const amountEntered = parseFloat(control.value);
      if (isNaN(amountEntered) || amountEntered > this.maxAmount) {
        return { 'invalidAmount': true };
      }
      return null;
    };
  }

  createOrder(): void {
    if (this.form.valid) {
      // Handle form submission here, e.g., send data to backend
      // You can access form values using this.form.value
      console.log('Form submitted:', this.form.value);

      // Close the dialog if needed
    }
  }

}
