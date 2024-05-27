import {
	ADMIN_CREDENTIALS,
	TEST_EMPLOYEE_CREDENTIALS,
} from 'cypress/support/constants';

describe('Deleting Employee', () => {
	beforeEach(() => {
		cy.login(ADMIN_CREDENTIALS.username, ADMIN_CREDENTIALS.password); // Login as Admin
		cy.visit('/users'); // Assuming your users component is accessible at /users route
	});

	it('should delete an agent when "Obriši" button is clicked', () => {
		// Click the "ID" header twice to sort the table by ID in descending order
		cy.get('th').contains('ID').click().click();

		// Locate the user row you want to delete and click the "Obriši" button
		cy.get('table')
			.contains('tr', TEST_EMPLOYEE_CREDENTIALS.username)
			.within(() => {
				// click the row where the user is located so that the row is selected
				cy.get('td')
					.contains(TEST_EMPLOYEE_CREDENTIALS.username)
					.click();
			});
		cy.get('[data-test="delete-button"]').click();

		// After clicking the delete button, verify that the user is deleted
		cy.get('.app-notification-success').should('be.visible');

		// Optionally verify the user is no longer present in the table
		cy.get('table')
			.contains('tr', TEST_EMPLOYEE_CREDENTIALS.username)
			.should('not.exist');
	});
});