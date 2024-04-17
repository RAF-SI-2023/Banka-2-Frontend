import { Component, inject, Input } from '@angular/core';
import { DropdownOption } from '../../../utils/constants';
import { FormBuilder, Validators } from '@angular/forms';
import { bankAccountNumberValidator } from '../../../utils/validators';
import { CardDto } from 'src/app/dtos/card-dto';
import { CardService } from 'src/app/services/bank-service/card.service';

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
		limitCard: [0, [Validators.required]],
	});

	constructor(private fb: FormBuilder) {}

	onSubmit() {
		if (this.createCardForm.valid && this.createCardForm) {
			const card = this.createCardForm.value as CardDto;
			if (card.accountNumber) {
				card.accountNumber = card.accountNumber.replaceAll('-', '');
				console.log(card);
				this.cardService.postCreateCard(card).subscribe(
					response => {
						console.log(response);
						this.createCardForm.reset();
					},
					error => {
						console.log(error);
					},
				);
			}
		}
	}
}
