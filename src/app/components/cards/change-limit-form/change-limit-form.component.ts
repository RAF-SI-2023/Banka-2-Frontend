import { Component, inject } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { CardDto } from 'src/app/dtos/card-dto';
import { CardService } from 'src/app/services/bank-service/card.service';
import { cardNumberValidator } from 'src/app/utils/validators/card-number.validator';
import { digitValidator } from 'src/app/utils/validators/digit.validator';

@Component({
	selector: 'app-change-limit-form',
	templateUrl: './change-limit-form.component.html',
	styleUrls: ['./change-limit-form.component.css'],
})
export class ChangeLimitFormComponent {
	cardService = inject(CardService);

	changeLimitForm = this.fb.group({
		identificationCardNumber: [
			null,
			[Validators.required, cardNumberValidator()],
		],
		limitCard: [null, [Validators.required, digitValidator()]],
	});

	constructor(private fb: FormBuilder) {}

	onSubmit() {
		if (this.changeLimitForm.valid && this.changeLimitForm) {
			const card = this.changeLimitForm.value as unknown as CardDto;
			console.log(card);
			this.cardService
				.putChangeCardLimit(card)
				.pipe(
					catchError(error => {
						console.log(error);
						return throwError(() => error);
					}),
				)
				.subscribe(response => {
					console.log(response);
					this.changeLimitForm.reset();
				});
		}
	}
}
