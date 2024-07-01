import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OfferDto } from 'src/app/dtos/offer-dto';
import { BankOtcService } from 'src/app/services/otc-service/bank-otc.service';

@Component({
	selector: 'app-view-interbank-offer-dialog',
	templateUrl: './view-interbank-offer-dialog.component.html',
	styleUrls: ['./view-interbank-offer-dialog.component.css'],
})
export class ViewInterbankOfferDialogComponent {
	newSelectedRow: OfferDto;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		private otcService: BankOtcService,
		private dialogRef: MatDialogRef<ViewInterbankOfferDialogComponent>

	) {
		// Initialize newSelectedRow with selectedRow data
		this.newSelectedRow = { ...this.data };
	}

	acceptOffer() {
		const id = this.newSelectedRow.offerId;

		console.log(id);
		if (id) {
			this.otcService.postAcceptOffer(id).subscribe({
				next: response => {
					console.log(response);
					this.dialogRef.close(true); // Pass true if you want to send a signal to the parent component
				},
				error: error => {
					console.error(error);
				},
			});
		}
	}

	cancelOffer() { // Corrected the method name
		const id = this.newSelectedRow.offerId;

		console.log(id);
		if (id) {
			this.otcService.postDeclineOffer(id).subscribe({
				next: response => {
					console.log(response);
					this.dialogRef.close(false); // Pass false if you want to send a signal to the parent component
				},
				error: error => {
					console.error(error);
				},
			});
		}
	}

	isButtonDisabled(): boolean {
		// Disable the button if offerStatus is FINISHED_DECLINED or FINISHED_ACCEPTED
		// return (
		// 	this.newSelectedRow.offerStatus === 'ACCEPTED' ||
		// 	this.newSelectedRow.offerStatus === 'DECLINED' ||
		// 	this.newSelectedRow.offerStatus === 'FINISHED_DECLINED' ||
		// 	this.newSelectedRow.offerStatus === 'FINISHED_ACCEPTED'
		// );
		return (
			this.newSelectedRow.offerStatus != 'PROCESSING'
		);
	}
}
