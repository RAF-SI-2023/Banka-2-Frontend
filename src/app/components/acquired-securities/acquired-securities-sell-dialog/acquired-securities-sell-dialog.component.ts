
import { Component} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { digitValidator } from 'src/app/utils/validators/digit.validator';


@Component({
  selector: 'app-acquired-securities-sell-dialog',
  templateUrl: './acquired-securities-sell-dialog.component.html',
  styleUrls: ['./acquired-securities-sell-dialog.component.css']
})
export class AcquiredSecuritiesSellDialogComponent {

	transactionForm = this.fb.group({
		amount: [null, [Validators.required, digitValidator()]],
	});
	authService: any;

	constructor(
		private fb: FormBuilder,
		public dialogRef: MatDialogRef<AcquiredSecuritiesSellDialogComponent>
	) {}

	onSubmit(formDirective: any) {
		if (this.transactionForm.valid) {

		  this.dialogRef.close();
		}
	  }
	

}
