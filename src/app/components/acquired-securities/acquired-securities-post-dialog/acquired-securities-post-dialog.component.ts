import { Component} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { digitValidator } from 'src/app/utils/validators/digit.validator';


@Component({
  selector: 'app-acquired-securities-post-dialog',
  templateUrl: './acquired-securities-post-dialog.component.html',
  styleUrls: ['./acquired-securities-post-dialog.component.css']
})
export class AcquiredSecuritiesPostDialogComponent {


	transactionForm = this.fb.group({

		amount: [null, [Validators.required, digitValidator()]],
	});
	authService: any;

	constructor(
		private fb: FormBuilder,
		public dialogRef: MatDialogRef<AcquiredSecuritiesPostDialogComponent>
	) {}

	onSubmit(formDirective: any) {
		if (this.transactionForm.valid) {

		  this.dialogRef.close();
		}
	  }

}
