import { ADMIN_CREDENTIALS } from 'cypress/support/constants';

describe('Adding Company Dialog', () => {
	beforeEach(() => {
		cy.login(ADMIN_CREDENTIALS.username, ADMIN_CREDENTIALS.password); // Login as Admin
		cy.visit('/bank-exchange'); // Assuming your companies component is accessible at /companies route
	});


	it('should exchange', () => {
		// wait for a second
		cy.wait(1000);
		// Select the first option from the first dropdown
		cy.get('mat-select[name="fromAccount"]')
			.click()
			.get('mat-option')
			.first()
			.click();

		// Select the second option from the second dropdown
		cy.get('mat-select[name="toAccount"]')
			.click()
			.get('mat-option')
			.eq(1)
			.click();

		// Enter the amount in the third input field
		cy.get('mat-form-field')
			.contains('Iznos')
			.parent()
			.find('input')
			.type('1');

		cy.get('[data-test="exchange-button"]').click();

		cy.get('.app-notification-success').should('be.visible');

	})

})
