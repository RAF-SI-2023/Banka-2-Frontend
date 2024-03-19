import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-password-forgot',
  templateUrl: './password-forgot.component.html',
  styleUrls: ['./password-forgot.component.css'],
})
export class PasswordForgotComponent {
  email: string = '';

  constructor(public dialogRef: MatDialogRef<PasswordForgotComponent>) {}

  submit() {
    console.log('Email submitted:', this.email);
    this.dialogRef.close();
  }
}
