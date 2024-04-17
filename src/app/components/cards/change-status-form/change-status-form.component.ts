import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CardDto } from 'src/app/dtos/card-dto';
import { CardService } from 'src/app/services/bank-service/card.service';

@Component({
	selector: 'app-change-status-form',
	templateUrl: './change-status-form.component.html',
	styleUrls: ['./change-status-form.component.css'],
})
export class ChangeStatusFormComponent {
	cardService = inject(CardService);

	changeStatusForm = this.fb.group({
		identificationCardNumber: [0, [Validators.required]],
	});

	constructor(private fb: FormBuilder) {}

	onSubmit() {
		if (this.changeStatusForm.valid && this.changeStatusForm) {
			const card = this.changeStatusForm.value as CardDto;
			console.log(card);
			this.cardService
				.putChangeCardStatus(card.identificationCardNumber)
				.subscribe(
					response => {
						console.log(response);
						this.changeStatusForm.reset();
					},
					error => {
						console.log(error);
					},
				);
		}
	}
}
