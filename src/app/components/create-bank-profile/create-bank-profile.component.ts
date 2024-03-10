import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-create-bank-profile',
  templateUrl: './create-bank-profile.component.html',
  styleUrls: ['./create-bank-profile.component.css']
})
export class CreateBankProfileComponent {

  currentStep = 1;
  accountNumber: string = '';
  phoneNumber: string = '';
  email: string = '';
  activationCode: string = '';
  password: string = '';


  basicInfoForm = new FormGroup({
    accountNumber: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/)]),
  });

  contactInfoForm = new FormGroup({
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/)]), // Primer validacije telefona
    email: new FormControl('', [Validators.required, Validators.email])
  });

  activationCodeForm = new FormGroup({
    activationCode: new FormControl('', [Validators.required, Validators.pattern(/^[0-9a-zA-Z]+$/)]) // Primer: samo alfanumerički kod
  });

  goToNextStep() {
    if (this.currentStep === 1 && this.basicInfoForm.valid) {
      this.accountNumber = this.basicInfoForm.controls.accountNumber.value as string;
      this.currentStep++;
    } else if (this.currentStep === 2 && this.contactInfoForm.valid) {
      this.phoneNumber = this.contactInfoForm.controls.phoneNumber.value as string;
      this.email = this.contactInfoForm.controls.email.value as string;
      this.currentStep++;
    } else if (this.currentStep === 3 && this.activationCodeForm.valid) {
      this.activationCode = this.activationCodeForm.controls.activationCode.value as string;
      this.currentStep++;
    }
  }

  goToPreviousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  logFormData(event: Event) {
    event.preventDefault();

    console.log('Korisnički račun:', this.basicInfoForm.value);
    console.log('Osnovni podaci:', this.contactInfoForm.value);
    console.log('Aktivacioni kod:', this.activationCodeForm.value);

    console.log('Broj računa/kartice/kredita:', this.basicInfoForm.get('accountNumber')?.value);
    console.log('Broj mobilnog telefona:', this.contactInfoForm.get('phoneNumber')?.value);
    console.log('E-mail:', this.contactInfoForm.get('email')?.value);
    console.log('Aktivacioni kod:', this.activationCodeForm.get('activationCode')?.value);


    console.log('Lozinka:', this.password);
  }

}
