import { ADMIN_CREDENTIALS } from 'cypress/support/constants';

describe('Create Credit Request', () => {
	beforeEach(() => {
		cy.login(ADMIN_CREDENTIALS.username, ADMIN_CREDENTIALS.password); // Login as Admin
		cy.visit('/credits/create-credit-request'); // Assuming your users component is accessible at /users route
	});

	it('should create a credit request when form is submitted with valid data', () => {
		cy.get('mat-select[formControlName="creditType"]').click();
		cy.get('mat-option').contains('Gotovinski').click();
		cy.get('input[formControlName="creditAmount"]').type('100000');
		cy.get('input[formControlName="mobileNumber"]').type('+38162567890');
		cy.get('input[formControlName="paymentPeriodMonths"]').type('12');

		//click data-test="submit-button"
		cy.get('[data-test="submit-button"]').click();

		cy.get('.app-notification-success').should('be.visible');
	});
});
