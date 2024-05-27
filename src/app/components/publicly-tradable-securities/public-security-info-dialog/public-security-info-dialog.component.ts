// src/app/components/public-security-info-dialog/public-security-info-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import Validators
import { SecurityDto } from 'src/app/dtos/security-dto';
import { digitValidator } from 'src/app/utils/validators/digit.validator';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ContractDto } from 'src/app/dtos/contract-dto';
import { ContractService } from 'src/app/services/otc-service/contract.service';
import { UserService } from 'src/app/services/iam-service/user.service';

@Component({
	selector: 'app-public-security-info-dialog',
	templateUrl: './public-security-info-dialog.component.html',
	styleUrls: ['./public-security-info-dialog.component.css'],
})
export class PublicSecurityInfoDialogComponent {
	email = localStorage.getItem('email');
	form: FormGroup;

	constructor(
		public dialogRef: MatDialogRef<PublicSecurityInfoDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: SecurityDto,
		private fb: FormBuilder,
		private contractService: ContractService,
		private userService: UserService,
	) {
		this.form = this.fb.group({
			volume: [null, [Validators.required, digitValidator()]],
			totalPrice: [null, [Validators.required, digitValidator()]],
		});
	}

	onClose(): void {
		this.dialogRef.close();
	}

	private hasPib(response: any): response is { pib: string } {
		return (response as { pib: string }).pib !== undefined;
	}

	createContract() {
		const contractDto = this.form.value as unknown as ContractDto;

		contractDto.id = this.data.id;
		contractDto.ticker = this.data.securitiesSymbol;
		const buyersEmail: string | null = localStorage.getItem('email');
		if (buyersEmail !== null) {
			contractDto.buyersEmail = buyersEmail;
		}
		contractDto.sellersEmail = this.data.email;

		const buyersPIB: string | null = localStorage.getItem('pib');
		if (buyersPIB !== null) {
			contractDto.buyersPIB = Number(buyersPIB);
		}

		this.userService
			.getFindByEmail(contractDto.buyersEmail)
			.pipe(
				map(response => {
					if (this.hasPib(response)) {
						contractDto.sellersPIB = Number(response.pib);
					}
					return response;
				}),
				catchError(error => {
					return throwError(() => error);
				}),
			)
			.subscribe();

		this.contractService.postCreateContract(contractDto).subscribe({
			next: response => {
				console.log(response);
			},
			error: error => {
				console.error(error);
			},
		});
	}
}
