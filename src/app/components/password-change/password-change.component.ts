import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css']
})
export class PasswordChangeComponent {
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  paswordToken: string = ''; // Variable to store the token


  constructor(private userService: UserService,public dialogRef: MatDialogRef<PasswordChangeComponent>) { }

  submit(): void {
    if (this.newPassword !== this.confirmPassword) {
      // Handle password mismatch error
      return;
    }
  
    this.userService.changePasswordRequest(this.currentPassword, this.newPassword)
      .subscribe((response: any) => {
        // Extracting token from the response
        const paswordToken = response.token;
  
  
        this.userService.changePasswordSubmit(paswordToken,this.newPassword)
          .subscribe((result: any) => {


          }, error => {
            console.error('Error calling another service:', error);
          });
          
          // Close the dialog
          this.dialogRef.close();

      }, error => {
        console.error('Error changing password:', error);
      });
  }

  formValid(): boolean {
    return  this.newPassword !== '' && this.confirmPassword !== '' && this.newPassword === this.confirmPassword;
    // return this.currentPassword !== '' && this.newPassword !== '' && this.confirmPassword !== '' && this.newPassword === this.confirmPassword;
  }
}
