import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormControl } from '@angular/forms';
import { EmployeeDto } from 'src/app/dto/EmployeeDto';


@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent {

  name: string = '';
  surname: string = '';
  gender: string = '';
  position: string = '';
  department: string = '';
  active: boolean = true;

  id: number = 0;
  dateOfBirth: number = 0;
  email: string = '';
  phone: string = '';

  address: string = '';
  username: string = '';
  role: string = '';
  permissions: string[] = [];


  employeeForm = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    gender: new FormControl(''),
    position: new FormControl(''),
    department: new FormControl(''),
    active: new FormControl(false)
  });


  constructor(private userService: UserService) {

  }

  addUser() {
    const employeeDto: EmployeeDto = {

      name: this.name,
      surname: this.surname,
      gender: this.gender,
      position: this.position,
      department: this.department,
      active: this.active,
      dateOfBirth: this.dateOfBirth,
      id: 0,
      email: this.email,
      phone: this.phone,
      address: this.address,
      username: this.username,
      role: this.role,
      permissions: this.permissions
    };

    this.userService.createEmployee(employeeDto).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}

