import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MarginAccountDto } from 'src/app/dtos/margin-account-dto';
import { MarginAccountsService } from 'src/app/services/bank-service/margin-accounts.service';
import { DropdownOption, DropdownOptions } from 'src/app/utils/constants';
import { emailValidator, phoneNumberValidator } from 'src/app/utils/validators';

@Component({
  selector: 'app-add-margin-account-dialog',
  templateUrl: './add-margin-account-dialog.component.html',
  styleUrls: ['./add-margin-account-dialog.component.css']
})
export class AddMarginAccountDialogComponent {
  availablePermissions: string[] = [
		'PERMISSION_1',
		'PERMISSION_2',
		'PERMISSION_3',
		'PERMISSION_4',
	];
	permissions: string[] = [];
  currencyCodes: DropdownOption[] = DropdownOptions.currencyCodes;

	createAccountForm = this.fb.group({
		// id: ['', [Validators.required]],
		userId: ['', [Validators.required]],
		email: ['', [Validators.required, emailValidator()]],
		currencyCode: [0, [Validators.required]],
		// accountNumber: ['', [Validators.required]],
		// type: ['', [Validators.required]],
		balance: [0, [Validators.required]],
		loanValue: [0, [Validators.required]],
		maintenanceMargin: [0, [Validators.required]],
	});

  currencyCode!: string | "";


	constructor(
		private marginAccountsService: MarginAccountsService,
		private fb: FormBuilder,
	) {}

	updatePermissions(event: any, permission: string) {
		if (event.checked) {
			this.permissions.push(permission);
		} else {
			this.permissions = this.permissions.filter(p => p !== permission);
		}
	}

	addMarginAccount() {
		if (this.createAccountForm.valid) {


				const marginAccountDto = this.createAccountForm
					.value as unknown as MarginAccountDto;
        
          marginAccountDto.type="STOCK";
          marginAccountDto.marginCall=true;
          console.log(marginAccountDto);
        
          this.marginAccountsService.postMarginsAccount(marginAccountDto).subscribe({
					next: response => {
						console.log(response);
					},
					error: error => {
						console.error(error);
					},
				});
			} else {
				console.error('Form controls are null.');
			}
		}
	}




