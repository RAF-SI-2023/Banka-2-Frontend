import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { isPrivateClientDto } from 'src/app/dtos/private-client-dto';
import { isCorporateClientDto } from 'src/app/dtos/corporate-client-dto';
import { isEmployeeDto } from 'src/app/dtos/employee-dto';
import { UserService } from 'src/app/services/user.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { MatDatepickerInputEvent } from "@angular/material/datepicker";

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.css']
})
export class UpdateDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private userService: UserService) {
    this.checkDto();
  }

  newSelectedRow = { ...this.data.selectedRow };

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
      if (this.checkDto() == 'PRIVATE') {
        this.userService.putUpdatePrivateClient(this.newSelectedRow)
          .pipe(
            catchError(error => {
              console.error('Error loading data.', error);
              return throwError(() => error);
            })
          ).subscribe(() => {

          });
      } else if (this.checkDto() == 'CORPORATE') {
        this.userService.putUpdateCorporateClient(this.newSelectedRow)
          .pipe(
            catchError(error => {
              console.error('Error loading data.', error);
              return throwError(() => error);
            })
          ).subscribe(() => {

          });
      } else if (this.checkDto() == 'EMPLOYEE') {
        this.userService.putUpdateEmployee(this.newSelectedRow)
          .pipe(
            catchError(error => {
              console.error('Error loading data.', error);
              return throwError(() => error);
            })
          ).subscribe(() => {

          });
      }
    }
  }

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    this.newSelectedRow.dateOfBirth = event.value ? event.value.getTime().toString() : '';
  }
}
