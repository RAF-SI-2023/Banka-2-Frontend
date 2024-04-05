import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { IamService } from "../../../../services/iam.service";
import { isPrivateClientDto } from "../../../../dtos/private-client-dto";
import { isCorporateClientDto } from "../../../../dtos/corporate-client-dto";
import { isEmployeeDto } from "../../../../dtos/employee-dto";
import { DatePipe, formatDate } from "@angular/common";

@Component({
	selector: 'app-user-info-dialog',
	templateUrl: './user-info-dialog.component.html',
	styleUrls: ['./user-info-dialog.component.css'],
})


export class UserInfoDialogComponent {
	newSelectedRow = { ...this.data.selectedRow };
	activeUser = { ...this.data.activeUser };

	isLoading = true;
	agentLimit: number | null = null;

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

	prepareValues() {
		// replace null or empty values with a placeholder
		for (const key in this.data.selectedRow) {
			if (this.data.selectedRow[key] == null || this.data.selectedRow[key] == '') {
				this.data.selectedRow[key] = '-';
			}
		}
		this.newSelectedRow = { ...this.data.selectedRow };
	}


	canResetLimit(): boolean {
		return ['ADMIN', 'SUPERVISOR'].includes(this.activeUser.role);
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

	getAgentLimit() {
		this.iamService.getAgentsLeftLimit(this.data.selectedRow.id).subscribe(limit => {
			this.agentLimit = limit;
		});
	}

	resetLimit() {
		this.isLoading = true;
		this.iamService.resetAgentsLeftLimit(this.newSelectedRow.id).subscribe({
			next: () => {
				console.log('Limit reset successful');
				this.isLoading = false;
			},
			error: (error) => {
				console.error('Error resetting limit', error);
				this.isLoading = false;
			}
		});
	}

	protected readonly isPrivateClientDto = isPrivateClientDto;
	protected readonly Date = Date;
	protected readonly DatePipe = DatePipe;
	protected readonly formatDate = formatDate;
}
