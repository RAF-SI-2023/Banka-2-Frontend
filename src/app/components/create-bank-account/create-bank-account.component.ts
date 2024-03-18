import { Component } from '@angular/core';
import { DropdownOptions, DropdownOption } from "../../utils/constants";
@Component({
  selector: 'app-create-bank-account',
  templateUrl: './create-bank-account.component.html',
  styleUrls: ['./create-bank-account.component.css']
})
export class CreateBankAccountComponent {
  accountTypeOptions: DropdownOption[] = DropdownOptions.accountType;
  currencyOptions: DropdownOption[] = DropdownOptions.currencyCode;
  domesticCurrencyAccountTypeOptions: DropdownOption[] = DropdownOptions.domesticCurrencyAccountType;
}
