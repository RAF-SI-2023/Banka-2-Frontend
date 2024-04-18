import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CardDto } from 'src/app/dtos/card-dto';
import { CardService } from 'src/app/services/bank-service/card.service';
import { cardNumberValidator } from 'src/app/utils/validators/card-number.validator';

@Component({
	selector: 'app-change-status-form',
	templateUrl: './change-status-form.component.html',
	styleUrls: ['./change-status-form.component.css'],
})
export class ChangeStatusFormComponent {
	constructor(
		private fb: FormBuilder,
		private cardService: CardService,
	) {}

	changeStatusForm = this.fb.group({
		identificationCardNumber: [
			null,
			[Validators.required, cardNumberValidator()],
		],
	});

	onSubmit() {
		if (this.changeStatusForm.valid && this.changeStatusForm) {
			const card = this.changeStatusForm.value as unknown as CardDto;
			console.log(card);
			this.cardService
				.putChangeCardStatus(card.identificationCardNumber)
				.pipe(
					catchError(error => {
						console.log(error);
						return throwError(() => error);
					}),
				)
				.subscribe(response => {
					console.log(response);
					this.changeStatusForm.reset();
				});
		}
	}
}
