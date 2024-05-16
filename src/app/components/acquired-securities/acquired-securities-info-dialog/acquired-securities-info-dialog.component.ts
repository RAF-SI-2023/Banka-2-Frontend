import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import Validators
import { SecurityDto } from 'src/app/dtos/security-dto';
import { SecuritiesService } from 'src/app/services/bank-service/securities.service';
import { digitValidator } from 'src/app/utils/validators/digit.validator';

@Component({
	selector: 'app-acquired-securities-info-dialog',
	templateUrl: './acquired-securities-info-dialog.component.html',
	styleUrls: ['./acquired-securities-info-dialog.component.css'],
})
export class AcquiredSecuritiesInfoDialogComponent {
	form: FormGroup;

	constructor(
		public dialogRef: MatDialogRef<AcquiredSecuritiesInfoDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: SecurityDto,
		private fb: FormBuilder,
		private securitiesService: SecuritiesService, // Inject SecuritiesService
	) {
		this.form = this.fb.group({
			amount: [null, [Validators.required, digitValidator()]],
		});
	}

	onClose(): void {
		this.dialogRef.close();
	}

	updateSecurity(): void {
		if (this.form.valid) {
			const updatedQuantity: number = this.form.get('amount')?.value;

			const securityDto: SecurityDto = {
				id: this.data.id,
				email: this.data.email,
				ownedByBank: this.data.ownedByBank,
				accountNumber: this.data.accountNumber,
				securitiesSymbol: this.data.securitiesSymbol,
				quantity: this.data.quantity,
				quantityOfPubliclyAvailable: updatedQuantity,
				reservedQuantity: this.data.reservedQuantity,
			};
			// console.log( updatedQuantity<= this.data.quantity-this.data.reservedQuantity);
			if (
				updatedQuantity <=
				this.data.quantity - this.data.reservedQuantity
			) {
				this.securitiesService.putSecurity(securityDto).subscribe(
					response => {
						console.log('Security updated successfully', response);
						this.dialogRef.close(response);
					},
					error => {
						console.error('Error updating security', error);
					},
				);
			} else {
				console.error('nema dovoljna kolicina');
			}
		} else {
			console.error('Form is invalid');
		}
	}
}
