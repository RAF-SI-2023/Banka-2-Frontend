// src/app/components/public-security-info-dialog/public-security-info-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import Validators
import { SecurityDto } from 'src/app/dtos/security-dto';
import { SecuritiesService } from 'src/app/services/bank-service/securities.service';
import { digitValidator } from 'src/app/utils/validators/digit.validator';

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
		private securitiesService: SecuritiesService,
	) {
		this.form = this.fb.group({
			amount: [null, [Validators.required, digitValidator()]],
		});
	}

	onClose(): void {
		this.dialogRef.close();
	}
}
