import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
	PubliclyTradableSecuritiesComponent
} from '../../components/publicly-tradable-securities/publicly-tradable-securities.component';
import {
	PubliclyTradableSecuritiesPopupComponent
} from '../../components/publicly-tradable-securities/publicly-tradable-securities-popup/publicly-tradable-securities-popup.component';

@Injectable({
	providedIn: 'root',
})
export class PubliclyTradableSecuritiesPopupService {
	constructor(private dialog: MatDialog) {}

	openPopupPubliclyTradableSecurities(){
		this.dialog.open(PubliclyTradableSecuritiesPopupComponent);
	}
}
