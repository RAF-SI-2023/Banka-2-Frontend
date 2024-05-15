import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { digitValidator } from '../../../utils/validators/digit.validator';

@Component({
  selector: 'app-publicly-tradable-securities-popup',
  templateUrl: './publicly-tradable-securities-popup.component.html',
  styleUrls: ['./publicly-tradable-securities-popup.component.css']
})
export class PubliclyTradableSecuritiesPopupComponent implements OnInit {
	transactionForm = this.fb.group({
		amount: [null, [Validators.required, digitValidator()]],
		price: [null, [Validators.required, digitValidator()]],
	});
	authService: any;

	constructor(private fb: FormBuilder) {}

	ngOnInit(): void {}



	//onSubmit(formDirective: FormGroupDirective) {
	//}

}
