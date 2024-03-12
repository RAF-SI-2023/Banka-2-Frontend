import { Component, signal } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { emailValidator } from "../../utils/validators/email.validator";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  passwordHidden = true;
  badCredentialsError = false;

  loginForm = this.fb.group({
    email: ['', [Validators.required, emailValidator()]],
    password: ['', [Validators.required]],
    remember: [false]
  });

  constructor(private fb: FormBuilder) { }

  onSubmit() {
    if (this.loginForm.valid) {
      // Send the form data to the backend
    }
  }

  togglePasswordVisibility() {
    this.passwordHidden = !this.passwordHidden;
  }
}
