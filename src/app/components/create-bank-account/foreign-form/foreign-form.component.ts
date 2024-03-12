import {Component, Input} from '@angular/core';
import {DropdownOption, DropdownOptions} from "../../../utils/constants";
import {FormBuilder, Validators} from "@angular/forms";
import {bankAccountNumberValidator, emailValidator} from "../../../utils/validators";

@Component({
  selector: 'app-foreign-form',
  templateUrl: './foreign-form.component.html',
  styleUrls: ['./foreign-form.component.css']
})
export class ForeignFormComponent {
  @Input() currencyOptions!: DropdownOption[];

  foreignBankAccountForm = this.fb.group({
    accountNumber: ['', [Validators.required, bankAccountNumberValidator()]],
    email: ['', [Validators.required, emailValidator()]],
    currencyCode: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    console.log(this.foreignBankAccountForm.value);
  }
}
