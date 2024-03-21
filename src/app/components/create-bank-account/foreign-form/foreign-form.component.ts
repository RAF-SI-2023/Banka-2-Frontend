import {Component, inject, Input} from '@angular/core';
import { DropdownOption } from '../../../utils/constants';
import { FormBuilder, Validators } from '@angular/forms';
import {
  bankAccountNumberValidator,
  emailValidator,
} from '../../../utils/validators';
import {BankService} from "../../../services/bank.service";
import {ForeignAccountDto} from "../../../dtos/foreign-account-dto";

@Component({
  selector: 'app-foreign-form',
  templateUrl: './foreign-form.component.html',
  styleUrls: ['./foreign-form.component.css'],
})
export class ForeignFormComponent {
  @Input() currencyOptions!: DropdownOption[];
  bankService = inject(BankService);
  foreignBankAccountForm = this.fb.group({
    accountNumber: ['', [Validators.required, bankAccountNumberValidator()]],
    email: ['', [Validators.required, emailValidator()]],
    defaultCurrencyCode: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    if(this.foreignBankAccountForm.valid){
      const accountDetails = this.foreignBankAccountForm.value as ForeignAccountDto;
      this.bankService.createForeignAccount(accountDetails).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
