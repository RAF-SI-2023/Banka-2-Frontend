import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { CardDto } from 'src/app/dtos/card-dto';
import { CardService } from 'src/app/services/bank-service/card.service';
import { cardNumberValidator } from 'src/app/utils/validators/card-number.validator';
import { MatDialog } from '@angular/material/dialog';

@Component({
	selector: 'app-change-block-form',
	templateUrl: './change-block-form.component.html',
	styleUrls: ['./change-block-form.component.css'],
})
export class ChangeBlockFormComponent {
	@ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;

	constructor(
		private fb: FormBuilder,
		private cardService: CardService,
		private dialog: MatDialog,
	) {}

	changeBlockForm = this.fb.group({
		identificationCardNumber: [
			null,
			[Validators.required, cardNumberValidator()],
		],
	});

	onSubmit(formDirective: FormGroupDirective) {
		if (this.changeBlockForm.valid && this.changeBlockForm) {
			const card = this.changeBlockForm.value as unknown as CardDto;
			console.log(card);
			this.cardService
				.putChangeCardBlock(card.identificationCardNumber)
				.pipe(
					catchError(error => {
						console.log(error);
						// this.openDialog('An error occurred: ' + error.message);
						return throwError(() => error);
					}),
				)
				.subscribe(response => {
					const card = response as unknown as CardDto;
					console.log(card.block);
					if (card.block == false)
						this.openDialog(
							'Kartica ' +
								card.accountNumber +
								' je odblokirana.',
						);
					if (card.block == true)
						this.openDialog(
							'Kartica ' + card.accountNumber + ' je blokirana.',
						);

					formDirective.resetForm();
					this.changeBlockForm.reset();
				});
		}
	}

	openDialog(message: string): void {
		this.dialog.open(this.dialogTemplate, {
			data: { message: message },
		});
	}
}
