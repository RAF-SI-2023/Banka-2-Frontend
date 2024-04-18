import { Component, inject, Input } from '@angular/core';
import { catchError } from 'rxjs';
import { throwError } from 'rxjs';
import { DropdownOption } from '../../../utils/constants';
import { FormBuilder, Validators } from '@angular/forms';
import { bankAccountNumberValidator } from '../../../utils/validators';
import { CardDto } from 'src/app/dtos/card-dto';
import { CardService } from 'src/app/services/bank-service/card.service';
import { digitValidator } from 'src/app/utils/validators/digit.validator';

@Component({
	selector: 'app-creation-form',
	templateUrl: './creation-form.component.html',
	styleUrls: ['./creation-form.component.css'],
})
export class CreationFormComponent {
	@Input() cardTypeOptions!: DropdownOption[];
	cardService = inject(CardService);

	createCardForm = this.fb.group({
		cardType: ['', [Validators.required]],
		nameOfCard: ['', [Validators.required]],
		accountNumber: [
			'',
			[Validators.required, bankAccountNumberValidator()],
		],
		limitCard: [null, [Validators.required, digitValidator()]],
	});

	constructor(private fb: FormBuilder) {}

	onSubmit() {
		if (this.createCardForm.valid && this.createCardForm) {
			const card = this.createCardForm.value as unknown as CardDto;
			if (card.accountNumber) {
				card.accountNumber = card.accountNumber.replaceAll('-', '');
				console.log(card);
				this.cardService
					.postCreateCard(card)
					.pipe(
						catchError(error => {
							console.log(error);
							return throwError(() => error);
						}),
					)
					.subscribe(response => {
						console.log(response);
						this.createCardForm.reset();
					});
			}
		}
	}
}
