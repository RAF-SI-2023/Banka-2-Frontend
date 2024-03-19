import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-password-forgot',
  templateUrl: './password-forgot.component.html',
  styleUrls: ['./password-forgot.component.css']
})
export class PasswordForgotComponent {
  email: string = '';

  constructor(public dialogRef: MatDialogRef<PasswordForgotComponent>) { }

  submit() {
    // Here you can implement the logic to send a password reset link to the provided email.
    // You can use services to interact with your backend API.
    console.log('Email submitted:', this.email);

    // Close the dialog after submitting
    this.dialogRef.close();
  }
}
