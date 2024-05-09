import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
	bankAccountNumberValidator,
	phoneNumberValidator,
} from '../../utils/validators';
import { emailValidator } from '../../utils/validators/email.validator';
import { UserService } from 'src/app/services/iam-service/user.service';
import { AccountService } from '../../services/bank-service/account.service';
import { DropdownOption, DropdownOptions } from '../../utils/constants';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { catchError } from 'rxjs';

@Component({
	selector: 'app-create-bank-profile',
	templateUrl: './create-bank-profile.component.html',
	styleUrls: ['./create-bank-profile.component.css'],
})
export class CreateBankProfileComponent implements OnInit {
	userService = inject(UserService);
	bankService = inject(AccountService);
	router = inject(Router);
	snackbar = inject(MatSnackBar);
	currentStep = 1;

	// Step 1
	primaryAccountNumber = '';
	//error message
	accountNumberError = '';

	// Step 2
	phone = '';
	email = '';
	dateOfBirth = '';
	address = '';
	name = '';
	surname = '';
	gender = '';
	bankProfileType: DropdownOption[] = DropdownOptions.bankProfileType;
	selectedBankProfileType = '';
	genderOptions: DropdownOption[] = DropdownOptions.gender;
	selectedGender = '';
	// error message
	basicInfoError = '';

	// Step 3
	activationCode = '';
	// error message
	activationCodeError = '';

	// Step 4
	password = '';
	passwordRepeat = '';
	// error message
	passwordError = '';

	ngOnInit() {
		// Subscribe to changes of the selectedBankProfileType form control
		const selectedBankProfileTypeControl = this.contactInfoForm.get(
			'selectedBankProfileType',
		);

		if (selectedBankProfileTypeControl) {
			selectedBankProfileTypeControl.valueChanges.subscribe(value => {
				if (value) {
					this.selectedBankProfileType = value;
				}
			});
		}
	}

	basicInfoForm = new FormGroup({
		primaryAccountNumber: new FormControl('', [
			Validators.required,
			bankAccountNumberValidator(),
		]),
	});

	contactInfoForm = new FormGroup({
		phone: new FormControl('', [
			Validators.required,
			phoneNumberValidator(),
		]),
		email: new FormControl('', [Validators.required, emailValidator()]),
		selectedBankProfileType: new FormControl('', [Validators.required]),
		dateOfBirth: new FormControl(''),
		address: new FormControl(''),
		name: new FormControl(''),
		surname: new FormControl(''),
		gender: new FormControl(''),
	});

	activationCodeForm = new FormGroup({
		activationCode: new FormControl('', [
			Validators.required,
			Validators.pattern(/^[0-9a-zA-Z]+$/),
		]), // Primer: samo alfanumerički kod
	});

	passwordForm = new FormGroup({
		password: new FormControl('', [Validators.required]),
		passwordRepeat: new FormControl('', [Validators.required]),
	});

	goToNextStep() {
		// If you need to go to the next step without sending the data to the server
		// You just comment out the function that sends the data to the server
		// and uncomment the function that increments the currentStep

		if (this.currentStep === 1 && this.basicInfoForm.valid) {
			this.primaryAccountNumber = this.basicInfoForm.controls
				.primaryAccountNumber.value as string;
			console.log('Primary account number:', this.primaryAccountNumber);
			// this.currentStep++;
			this.bankAccountNumberSubmit();
		} else if (this.currentStep === 2 && this.contactInfoForm.valid) {
			this.phone = this.contactInfoForm.controls.phone.value as string;
			this.email = this.contactInfoForm.controls.email.value as string;
			this.dateOfBirth = this.dateOfBirth as string;
			this.address = this.contactInfoForm.controls.address
				.value as string;
			this.name = this.contactInfoForm.controls.name.value as string;
			this.surname = this.contactInfoForm.controls.surname
				.value as string;
			this.selectedGender = this.contactInfoForm.controls.gender
				.value as string;
			this.selectedBankProfileType = this.contactInfoForm.controls
				.selectedBankProfileType.value as string;

			// this.currentStep++;
			this.createBankProfile();
		} else if (this.currentStep === 3 && this.activationCodeForm.valid) {
			this.activationCode = this.activationCodeForm.controls
				.activationCode.value as string;

			// this.currentStep++;
			this.sendActivationCode();
		} else if (this.currentStep === 4 && this.passwordForm.valid) {
			this.password = this.passwordForm.controls.password.value as string;
			this.passwordRepeat = this.passwordForm.controls.passwordRepeat
				.value as string;
			if (this.password !== this.passwordRepeat) {
				this.passwordError = 'Lozinke se ne poklapaju';
			} else {
				this.activatePassword();
			}
		}
	}

	bankAccountNumberSubmit() {
		this.bankService
			.postAssociateProfileInitialization(
				this.primaryAccountNumber.replaceAll('-', ''),
			)
			.pipe(
				catchError(error => {
					this.accountNumberError =
						'Greška prilikom inicijalizacije profila. Pokušajte ponovo.';
					throw error;
				}),
			)
			.subscribe({
				next: () => {
					this.currentStep++;
				},
				error: error => {
					console.error(
						'Error during profile initialization [bankAccountNumberSubmit]:',
						error,
					);
				},
			});
	}

	createBankProfile() {
		const dateOfBirthValue = this.contactInfoForm.value.dateOfBirth;
		const dateOfBirthEpoch = dateOfBirthValue
			? new Date(dateOfBirthValue).getTime()
			: 0;
		this.dateOfBirth = dateOfBirthEpoch.toString();

		if (this.selectedBankProfileType === 'PRIVATE') {
			this.userService
				.postCreatePrivateClient({
					phone: this.phone,
					email: this.email,
					dateOfBirth: this.dateOfBirth,
					address: this.address,
					name: this.name,
					surname: this.surname,
					primaryAccountNumber: this.primaryAccountNumber.replaceAll(
						'-',
						'',
					),
					gender: this.selectedGender,
					username: this.email,
				})
				.pipe(
					catchError(error => {
						this.accountNumberError =
							'Greška prilikom inicijalizacije profila. Pokušajte ponovo.';
						throw error;
					}),
				)
				.subscribe({
					next: () => {
						this.currentStep++;
					},
					error: error => {
						this.basicInfoError =
							'Greška prilikom inicijalizacije profila. Pokušajte ponovo.';
						console.error(
							'Error during profile initialization [createBankProfile/PRIVATE]:',
							error,
						);
					},
				});
		} else if (this.selectedBankProfileType === 'CORPORATE') {
			this.userService
				.postCreateCorporateClient({
					phone: this.phone,
					email: this.email,
					dateOfBirth: this.dateOfBirth,
					address: this.address,
					name: this.name,
					primaryAccountNumber: this.primaryAccountNumber.replaceAll(
						'-',
						'',
					),
					username: this.email,
				})
				.pipe(
					catchError(error => {
						this.accountNumberError =
							'Greška prilikom inicijalizacije profila. Pokušajte ponovo.';
						throw error;
					}),
				)
				.subscribe({
					next: () => {
						this.currentStep++;
					},
					error: error => {
						this.basicInfoError =
							'Greška prilikom inicijalizacije profila. Pokušajte ponovo.';
						console.error(
							'Error during profile initialization [createBankProfile/CORPORATE]:',
							error,
						);
					},
				});
		}
	}

	sendActivationCode() {
		this.bankService
			.postCodeConfirmation(
				this.activationCode,
				this.primaryAccountNumber.replaceAll('-', ''),
			)
			.subscribe({
				next: () => {
					this.currentStep++;
				},
				error: error => {
					this.basicInfoError =
						'Greška prilikom inicijalizacije profila. Pokušajte ponovo.';
					console.error(
						'Error during profile initialization [sendActivationCode]:',
						error,
					);
				},
			});
	}

	activatePassword() {
		this.userService
			.postPasswordActivation(this.email, this.password)
			.subscribe({
				next: () => {
					// this.router.navigate(['/login']);
					this.creationSuccess();
				},
				error: error => {
					this.passwordError = error.message
						? error.message
						: 'Greška prilikom aktivacije lozinke. Pokušajte ponovo.';
					console.error(
						'Error during profile initialization [activatePassword]:',
						error,
					);
				},
			});
	}

	creationSuccess() {
		this.snackbar.open('Profil uspešno kreiran', 'Zatvori', {
			duration: 3000,
		});
		this.router.navigate(['/login']);
	}

	goToPreviousStep() {
		if (this.currentStep > 1) {
			this.currentStep--;
		}
	}

	onDateChange(event: MatDatepickerInputEvent<Date>) {
		this.dateOfBirth = event.value ? event.value.getTime().toString() : '';
		console.log('Datum rodjenja:', this.dateOfBirth);
	}

	logFormData(event: Event) {
		event.preventDefault();

		console.log('Korisnicki racun:', this.basicInfoForm.value);
		console.log('Osnovni podaci:', this.contactInfoForm.value);
		console.log('Aktivacioni kod:', this.activationCodeForm.value);

		console.log(
			'Broj računa/kartice/kredita:',
			this.basicInfoForm.get('primaryAccountNumber')?.value,
		);
		console.log(
			'Broj mobilnog telefona:',
			this.contactInfoForm.get('phone')?.value,
		);
		console.log('Email:', this.contactInfoForm.get('email')?.value);
		console.log(
			'Aktivacioni kod:',
			this.activationCodeForm.get('activationCode')?.value,
		);

		console.log('Lozinka:', this.password);
	}
}
