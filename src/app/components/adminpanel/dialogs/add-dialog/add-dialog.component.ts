import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { isPrivateClientDto } from 'src/app/dto/PrivateClientDto';
import { isCorporateClientDto } from 'src/app/dto/CorporateClientDto';
import { isEmployeeDto } from 'src/app/dto/EmployeeDto';
import { UserService } from 'src/app/services/user.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private userService: UserService) {
    this.checkDto();
    console.log(data.selectedRow);
  }

  newSelectedRow = { ...this.data.selectedRow };

  checkDto(): string {
    if (isPrivateClientDto(this.data.selectedRow)) {
      console.log("private");
      return 'PRIVATE';
    } else if (isCorporateClientDto(this.data.selectedRow)) {
      console.log("corporate");
      return 'CORPORATE';
    } else if (isEmployeeDto(this.data.selectedRow)) {
      console.log("employee");
      return 'EMPLOYEE';
    }
    return 'NONE';
  }

  addUser(): void {
    console.log("van:");
    console.log(this.newSelectedRow);
    if (this.newSelectedRow != null) {
      console.log("in:");
      console.log(this.newSelectedRow);
      if (this.checkDto() == 'PRIVATE') {
        console.log("private:");
        console.log(this.newSelectedRow);
        this.userService.putUpdatePrivateClient(this.newSelectedRow)
          .pipe(
            catchError(error => {
              console.error('Error loading data.', error);
              return throwError(() => error);
            })
          ).subscribe(() => {

          });
      } else if (this.checkDto() == 'CORPORATE') {
        console.log("corpo:");
        console.log(this.newSelectedRow);
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
}
