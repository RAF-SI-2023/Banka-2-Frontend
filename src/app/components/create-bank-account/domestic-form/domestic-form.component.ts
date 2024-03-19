import { Component, Input } from '@angular/core';
import { DropdownOption } from '../../../utils/constants';
import { FormBuilder, Validators } from '@angular/forms';
import {
  bankAccountNumberValidator,
  emailValidator,
} from '../../../utils/validators';

@Component({
  selector: 'app-domestic-form',
  templateUrl: './domestic-form.component.html',
  styleUrls: ['./domestic-form.component.css'],
})
export class DomesticFormComponent {
  @Input() currencyOptions!: DropdownOption[];
  @Input() domesticCurrencyAccountTypeOptions!: DropdownOption[];

  domesticBankAccountForm = this.fb.group({
    accountNumber: ['', [Validators.required, bankAccountNumberValidator()]],
    email: ['', [Validators.required, emailValidator()]],
    currencyCode: ['', [Validators.required]],
    domesticCurrencyAccountType: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    console.log(this.domesticBankAccountForm.value);
  }
}
