import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { isPrivateClientDto } from 'src/app/dtos/private-client-dto';
import { isCorporateClientDto } from 'src/app/dtos/corporate-client-dto';
import { isEmployeeDto } from 'src/app/dtos/employee-dto';
import { IamService } from 'src/app/services/iam.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { MatDatepickerInputEvent } from '@angular/material/datepicker'; // Import MatDatepickerInputEvent

@Component({
	selector: 'app-update-user-dialog',
	templateUrl: './update-user-dialog.component.html',
	styleUrls: ['./update-user-dialog.component.css'],
})
export class UpdateUserDialogComponent {
	newSelectedRow = { ...this.data.selectedRow };

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		private iamService: IamService,
	) {
		this.checkDto();
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

	updateUser(): void {
		if (this.newSelectedRow != null) {
			// Convert dateOfBirth to epoch
			this.newSelectedRow.dateOfBirth = this.newSelectedRow.dateOfBirth
				? new Date(this.newSelectedRow.dateOfBirth).getTime().toString()
				: null;

			if (this.checkDto() == 'PRIVATE') {
				this.iamService
					.putUpdatePrivateClient(this.newSelectedRow)
					.pipe(
						catchError(error => {
							console.error('Error loading data.', error);
							return throwError(() => error);
						}),
					)
					.subscribe(() => {});
			} else if (this.checkDto() == 'CORPORATE') {
				this.iamService
					.putUpdateCorporateClient(this.newSelectedRow)
					.pipe(
						catchError(error => {
							console.error('Error loading data.', error);
							return throwError(() => error);
						}),
					)
					.subscribe(() => {});
			} else if (this.checkDto() == 'EMPLOYEE') {
				this.iamService
					.putUpdateEmployee(this.newSelectedRow)
					.pipe(
						catchError(error => {
							console.error('Error loading data.', error);
							return throwError(() => error);
						}),
					)
					.subscribe(() => {});
			}
		}
	}
}
