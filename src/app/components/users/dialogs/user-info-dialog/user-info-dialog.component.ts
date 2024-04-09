import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../../../../services/iam-service/user.service';
import { isPrivateClientDto } from '../../../../dtos/private-client-dto';
import { isCorporateClientDto } from '../../../../dtos/corporate-client-dto';
import { isEmployeeDto } from '../../../../dtos/employee-dto';
import { DatePipe, formatDate } from '@angular/common';

@Component({
	selector: 'app-user-info-dialog',
	templateUrl: './user-info-dialog.component.html',
	styleUrls: ['./user-info-dialog.component.css'],
})
export class UserInfoDialogComponent {
	newSelectedRow = { ...this.data.selectedRow };
	isLoading = true;
	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		private iamService: UserService,
	) {
		this.fetchData();
	}

	fetchData() {
		this.iamService
			.getFindById(this.data.selectedRow.id)
			.subscribe(response => {
				this.data.selectedRow = response;
				this.checkDto();
				this.prepareValues();
				this.isLoading = false;
			});
	}

	prepareValues() {
		// replace null or empty values with a placeholder
		for (const key in this.data.selectedRow) {
			if (
				this.data.selectedRow[key] == null ||
				this.data.selectedRow[key] == ''
			) {
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
	protected readonly Date = Date;
	protected readonly DatePipe = DatePipe;
	protected readonly formatDate = formatDate;
}
