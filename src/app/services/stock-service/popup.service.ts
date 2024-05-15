import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StockPopupComponent } from '../../components/stocks/dialogs/stock-popup/stock-popup.component';


@Injectable({
	providedIn: 'root',
})
export class PopupService {
	constructor(private dialog: MatDialog) {}

	openPopup() {
		this.dialog.open(StockPopupComponent);
	}
}
