import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { catchError, throwError } from 'rxjs';
import { isCorporateClientDto } from 'src/app/dtos/corporate-client-dto';
import { isEmployeeDto } from 'src/app/dtos/employee-dto';
import { isPrivateClientDto } from 'src/app/dtos/private-client-dto';
import { IamService } from 'src/app/services/iam.service';

@Component({
  selector: 'app-update-company-dialog',
  templateUrl: './update-company-dialog.component.html',
  styleUrls: ['./update-company-dialog.component.css']
})
export class UpdateCompanyDialogComponent {
  newSelectedRow = { ...this.data.selectedRow };

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		private iamService: IamService,
	) {
	}


	updateCompany(): void {
		if (this.newSelectedRow != null) {
			// Convert dateOfBirth to epoch
			this.newSelectedRow.dateOfBirth = this.newSelectedRow.dateOfBirth
				? new Date(this.newSelectedRow.dateOfBirth).getTime().toString()
				: null;


				this.iamService
					.putUpdateCompany(this.newSelectedRow)
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