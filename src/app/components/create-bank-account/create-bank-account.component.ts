import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-bank-account',
  templateUrl: './create-bank-account.component.html',
  styleUrls: ['./create-bank-account.component.css']
})
export class CreateBankAccountComponent {

  name: string = '';
  lastName: string = '';
  email: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  submitForm() {
    const formData = {
      name: this.name,
      lastName: this.lastName,
      email: this.email
    };
    // Simulation of sending data to the backend
    const backendUrl = ''; // waiting for backend URL
    this.http.post<any>(backendUrl, formData).subscribe(
      (response) => {
        console.log('Data successfully sent to backend.', response);
        // Add a redirect to the Admin Panel
        this.router.navigate(['/adminpanel']);

      },
      (error) => {
        console.error('Error sending data to backend.', error);

      }
    );
  }

}
