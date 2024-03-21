import {Component, inject, Input} from '@angular/core';
import { DropdownOption } from '../../../utils/constants';
import { FormBuilder, Validators } from '@angular/forms';
import {
  bankAccountNumberValidator,
  emailValidator,
} from '../../../utils/validators';
import {BankService} from "../../../services/bank.service";
import {DomesticAccountDto} from "../../../dtos/domestic-account-dto";

@Component({
  selector: 'app-domestic-form',
  templateUrl: './domestic-form.component.html',
  styleUrls: ['./domestic-form.component.css'],
})
export class DomesticFormComponent {
  @Input() currencyOptions!: DropdownOption[];
  @Input() domesticCurrencyAccountTypeOptions!: DropdownOption[];
  bankService = inject(BankService)

  domesticBankAccountForm = this.fb.group({
    accountNumber: ['', [Validators.required, bankAccountNumberValidator()]],
    email: ['', [Validators.required, emailValidator()]],
    currencyCode: ['', [Validators.required]],
    domesticCurrencyAccountType: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder) {}

  onSubmit() {
   if(this.domesticBankAccountForm.valid){
     const accountDetails = this.domesticBankAccountForm.value! as DomesticAccountDto;
     this.bankService.createDomesticAccount(accountDetails).subscribe(
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
