import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { digitValidator } from '../../../../utils/validators/digit.validator';
import { FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-stock-popup',
  templateUrl: './stock-popup.component.html',
  styleUrls: ['./stock-popup.component.css']
})
export class StockPopupComponent implements OnInit {
	transactionForm = this.fb.group({
		amount: [null, [Validators.required, digitValidator()]],
	});
	authService: any;

	constructor(private fb: FormBuilder) {}

	ngOnInit(): void {}



	//onSubmit(formDirective: FormGroupDirective) {
	//}
}
