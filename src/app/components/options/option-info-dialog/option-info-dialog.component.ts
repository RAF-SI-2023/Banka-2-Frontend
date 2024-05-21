import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	selector: 'app-option-info-dialog',
	templateUrl: './option-info-dialog.component.html',
	styleUrls: ['./option-info-dialog.component.css'],
})
export class OptionInfoDialogComponent {
	constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
