// src/app/components/public-security-info-dialog/public-security-info-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import Validators
import { SecurityDto } from 'src/app/dtos/security-dto';
import { digitValidator } from 'src/app/utils/validators/digit.validator';
import { ContractDto } from 'src/app/dtos/contract-dto';
import { ContractService } from 'src/app/services/otc-service/contract.service';

@Component({
	selector: 'app-public-security-info-dialog',
	templateUrl: './public-security-info-dialog.component.html',
	styleUrls: ['./public-security-info-dialog.component.css'],
})
export class PublicSecurityInfoDialogComponent {
	form: FormGroup;

	constructor(
		public dialogRef: MatDialogRef<PublicSecurityInfoDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: SecurityDto,
		private fb: FormBuilder,
		private contractServce: ContractService,
	) {
		this.form = this.fb.group({
			amount: [null, [Validators.required, digitValidator()]],
		});
	}

	onClose(): void {
		this.dialogRef.close();
	}

	createContract() {
		const contractDto = this.form.value as unknown as ContractDto;

		this.contractServce.postCreateContract(contractDto).subscribe({
			next: response => {
				console.log(response);
			},
			error: error => {
				console.error(error);
			},
		});
	}
}
