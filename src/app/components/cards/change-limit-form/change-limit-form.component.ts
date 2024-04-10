import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CardDto } from 'src/app/dtos/card-dto';
import { CardService } from 'src/app/services/bank-service/card.service';

@Component({
	selector: 'app-change-limit-form',
	templateUrl: './change-limit-form.component.html',
	styleUrls: ['./change-limit-form.component.css'],
})
export class ChangeLimitFormComponent {
	cardService = inject(CardService);

	changeLimitForm = this.fb.group({
		identificationCardNumber: [0, [Validators.required]],
		limitCard: [0, [Validators.required]],
	});

	constructor(private fb: FormBuilder) {}

	onSubmit() {
		if (this.changeLimitForm.valid) {
			let card = this.changeLimitForm.value! as CardDto;
			console.log(card);
			this.cardService.putChangeCardLimit(card).subscribe(
				response => {
					console.log(response);
					this.changeLimitForm.reset();
				},
				error => {
					console.log(error);
				},
			);
		}
	}
}
