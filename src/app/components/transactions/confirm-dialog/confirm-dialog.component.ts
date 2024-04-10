import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TransactionService } from 'src/app/services/bank-service/transaction.service';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {
	// isLoading = true;
  token : any = null;
  id: number=0;
  @Input() response: any=null;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		private transactionService: TransactionService,
	) {	    
		this.response = data.response;
	}
	snedToken() {
		
		// if(this.response!=null && this.token!=null){
			console.log(this.response);
			console.log(this.token);
			this.transactionService
				.patchTransactionVerify(this.response.id,this.token)
				.subscribe(response => {
					console.log(response);
				});
		// }
	}
}