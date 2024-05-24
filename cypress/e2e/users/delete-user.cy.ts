import { ADMIN_CREDENTIALS } from 'cypress/support/constants';

describe('Deleting User', () => {
	beforeEach(() => {
		cy.login(ADMIN_CREDENTIALS.username, ADMIN_CREDENTIALS.password); // Login as Admin
		cy.visit('/users'); // Assuming your users component is accessible at /users route
	});

	it('should delete a user when "Obriši" button is clicked', () => {
		// Assuming you have some users listed in a table
		// Locate the user row you want to delete and click the "Obriši" button
		cy.get('table')
			.contains('tr', 'test@example.com')
			.within(() => {
				// click the row where the user is located so that the row is selected
				// select the specific cell in the row that contains USER
				cy.get('td').contains('test@example.com').click();
			});
		cy.get('[data-test="delete-button"]').click();

		// After clicking the delete button, verify that the user is deleted
		// For example, check if the user's data is no longer present in the table
		cy.get('.app-notification-success').should('be.visible');
	});
});
