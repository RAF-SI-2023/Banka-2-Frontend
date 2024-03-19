import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { passwordChangeTokenDto } from 'src/app/dtos/password-change-token-dto';
import { AuthCredentialsDto } from 'src/app/dtos/auth-credentials-dto';
import { passwordChangeTokenNewPasswordDto } from 'src/app/dtos/password-change-token-new-password-dto';
@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css'],
})
export class PasswordChangeComponent {
  passwordChange: AuthCredentialsDto = { email: '', password: '' };
  passwordChangeToken!: passwordChangeTokenDto;
  passwordChangeTokenNewPasswordDto:
    | passwordChangeTokenNewPasswordDto
    | undefined;
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(
    private userService: UserService,
    public dialogRef: MatDialogRef<PasswordChangeComponent>
  ) {}

  submit(): void {
    if (this.newPassword !== this.confirmPassword) {
      return;
    }
    let email = localStorage.getItem('email');

    if (email == null) email = '';
    this.passwordChange = {
      email: email,
      password: this.currentPassword,
    };

    this.userService.changePasswordRequest(this.passwordChange).subscribe(
      (response: any) => {
        this.passwordChangeToken = response;
        this.passwordChangeTokenNewPasswordDto = {
          newPassword: this.newPassword,
          passwordChangeTokenDto: this.passwordChangeToken,
        };
        console.log(this.passwordChangeTokenNewPasswordDto);
        this.userService
          .changePasswordSubmit(this.passwordChangeTokenNewPasswordDto)
          .subscribe(
            (result: any) => {
              console.log(response);
            },
            (error) => {
              console.error('Error calling another service:', error);
            }
          );
        this.dialogRef.close();
      },
      (error) => {
        console.error('Error changing password:', error);
      }
    );
  }

  formValid(): boolean {
    return (
      this.currentPassword !== '' &&
      this.newPassword !== '' &&
      this.confirmPassword !== '' &&
      this.newPassword === this.confirmPassword
    );
  }
}
