import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {IamService} from "../../../../services/iam.service";
import {isPrivateClientDto} from "../../../../dtos/private-client-dto";
import {isCorporateClientDto} from "../../../../dtos/corporate-client-dto";
import {isEmployeeDto} from "../../../../dtos/employee-dto";

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.css']
})
export class InfoDialogComponent {
	newSelectedRow = { ...this.data.selectedRow };
	isLoading = true;
	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		private iamService: IamService,
	) {
		this.fetchData();
	}

	fetchData() {
		this.iamService.getFindById(this.data.selectedRow.id).subscribe((response) => {
			this.data.selectedRow = response;
			this.checkDto();
			this.prepareValues();
			this.isLoading = false;
		});
	}

	prepareValues(){
		// replace null or empty values with a placeholder
		for (const key in this.data.selectedRow) {
			if (this.data.selectedRow[key] == null || this.data.selectedRow[key] == '') {
				this.data.selectedRow[key] = '-';
			}
		}
		this.newSelectedRow = { ...this.data.selectedRow };
	}

	checkDto(): string {
		if (isPrivateClientDto(this.data.selectedRow)) {
			return 'PRIVATE';
		} else if (isCorporateClientDto(this.data.selectedRow)) {
			return 'CORPORATE';
		} else if (isEmployeeDto(this.data.selectedRow)) {
			return 'EMPLOYEE';
		}
		return 'NONE';
	}

	protected readonly isPrivateClientDto = isPrivateClientDto;
}
