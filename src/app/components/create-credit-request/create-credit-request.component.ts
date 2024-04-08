import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {bankAccountNumberValidator, emailValidator, phoneNumberValidator} from "../../utils/validators";

@Component({
  selector: 'app-create-credit-request',
  templateUrl: './create-credit-request.component.html',
  styleUrls: ['./create-credit-request.component.css']
})
export class CreateCreditRequestComponent {
	creditRequestForm = this.fb.group({
		creditType: ['', [Validators.required],],
		creditAmount: ['', [Validators.required]],
		creditPurpose: ['', [Validators.required]],
		permanentEmployment: [false, [Validators.required]],
		employmentPeriod: ['', [Validators.required]],
		maturity: ['', [Validators.required]],
		currencyCode: ['', [Validators.required]],
		phoneNumber: ['', [Validators.required, phoneNumberValidator()]],
		accountNumber: ['', [Validators.required, bankAccountNumberValidator()]],
	});

	constructor(private fb: FormBuilder) {}

	onSubmit() {
		if (this.creditRequestForm.valid) {
			console.log(this.creditRequestForm.value);
		}
	}
}
