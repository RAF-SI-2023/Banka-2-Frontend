import { EMPLOYEE_CREDENTIALS } from 'cypress/support/constants';

describe('Change Password Dialog', () => {
	beforeEach(() => {
		// Assume you are logged in and on the page where the "Promeni lozinku" button is available
		cy.login(EMPLOYEE_CREDENTIALS.username, EMPLOYEE_CREDENTIALS.password);
		cy.visit('/user-profile'); // Navigate to the page where the "Promeni lozinku" button is located
	});

	it('should open the change password dialog when "Promeni lozinku" button is clicked', () => {
		// Click the "Promeni lozinku" button to open the dialog
		cy.get('#change-password-btn').click();
		// Verify that the dialog is visible
		cy.get('#mat-mdc-dialog-title-0').should('contain', 'Promeni lozinku');
	});

	// case where passwords donot match
	it('should show an error message when new password and confirm password do not match', () => {
		// Click the "Promeni lozinku" button to open the dialog
		cy.get('#change-password-btn').click();

		// Enter new password
		cy.get('input[formControlName="newPassword"]').type('Newpassword123!');

		// Enter confirm password
		cy.get('input[formControlName="confirmPassword"]').type(
			'Newpassword1234!',
		);

		// Submit the form by clicking the "Promeni" button
		cy.get('[data-test="change-button"]').click();

		// Verify that the error message is displayed
		cy.contains('Lozinke se ne poklapaju!');
	});

	it('should change password when valid new password and confirm password are entered', () => {
		// Click the "Promeni lozinku" button to open the dialog
		cy.get('#change-password-btn').click();

		// Enter new password
		cy.get('input[formControlName="newPassword"]').type(
			EMPLOYEE_CREDENTIALS.password,
		);

		// Enter confirm password
		cy.get('input[formControlName="confirmPassword"]').type(
			EMPLOYEE_CREDENTIALS.password,
		);

		// Submit the form by clicking the "Promeni" button
		cy.get('[data-test="change-button"]').click();

		cy.contains('Zahtev je uspešan!').should('exist');
	});

	// Add more test cases to cover other scenarios, such as invalid passwords, form validation, etc.
});
