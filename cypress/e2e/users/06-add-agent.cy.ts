import {
	ADMIN_CREDENTIALS,
	TEST_AGENT_CREDENTIALS,
} from 'cypress/support/constants';

describe('Adding Agent Dialog', () => {
	beforeEach(() => {
		cy.login(ADMIN_CREDENTIALS.username, ADMIN_CREDENTIALS.password); // Login as Admin
		cy.visit('/actuaries'); // Assuming your users component is accessible at /users route
	});

	it('should open the "Dodaj agenta" dialog when "Dodaj agenta" button is clicked', () => {
		cy.get('button').contains('Dodaj agenta').click();
		cy.get('mat-dialog-content').should('exist');
		cy.get('mat-dialog-actions').should('exist');
	});

	it('should display required fields in the dialog form', () => {
		cy.get('button').contains('Dodaj agenta').click();

		cy.get('input[name="email"]').should('exist');
		cy.get('input[name="dateOfBirth"]').should('exist');
		cy.get('input[name="phone"]').should('exist');
		cy.get('input[name="address"]').should('exist');
		cy.get('input[name="userLimit"]').should('exist');
		cy.get('input[name="leftOfLimit"]').should('exist');
		// Add more assertions based on your dialog's form fields
	});

	it('should add an agent when "Dodaj" button is clicked with valid data', () => {
		cy.get('button').contains('Dodaj agenta').click();

		cy.get('input[name="email"]').type(TEST_AGENT_CREDENTIALS.username);
		const dateOfBirth = '1990-01-01';
		cy.get('input[name="dateOfBirth"]')
			.invoke('val', dateOfBirth)
			.trigger('input');
		cy.get('input[name="phone"]').type('+38162567890');
		cy.get('input[name="address"]').type('123 Test St');
		cy.get('input[name="userLimit"]').type('100');
		cy.get('input[name="leftOfLimit"]').type('50');

		cy.get('[data-test="dodaj-button"]').click();

		cy.get('.app-notification-success').should('be.visible');
		// Add assertions to verify that employee is successfully added, e.g., check if the new employee appears in the users table
	});

	// Add more test cases to cover other scenarios and edge cases
});
