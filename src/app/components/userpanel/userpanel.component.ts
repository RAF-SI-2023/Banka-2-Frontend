import { Component } from '@angular/core';

@Component({
  selector: 'app-userpanel',
  templateUrl: './userpanel.component.html',
  styleUrls: ['./userpanel.component.css']
})
export class UserpanelComponent {
  users: any[] = [
    { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com' },
    { id: 2, firstName: 'Jane', lastName: 'Doe', email: 'jane@example.com' }
  ];

  showPasswordForm: boolean = false;
  newPassword: string = '';
  confirmPassword: string = '';
  selectedUser: any;

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'changePassword'];

  showChangePasswordForm(user: any) {
    this.selectedUser = user;
    this.showPasswordForm = true;
  }

  changePassword() {
    if (this.newPassword === this.confirmPassword) {
      console.log(‘Password changed for user:’, this.selectedUser.firstName);
      this.showPasswordForm = false;
      this.newPassword = '';
      this.confirmPassword = '';
    } else {
      alert(‘Passwords do not match. Enter the same password in both fields, please.’);
    }
  }
}
