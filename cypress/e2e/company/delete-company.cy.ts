describe('Deleting Company', () => {
	beforeEach(() => {
		cy.login('vasa_email_adresa_1@gmail.com', 'admin'); // Login as Admin
		cy.visit('/companies'); // Assuming your companies component is accessible at /companies route
	});

	it('should delete a company when "Izbriši kompaniju" button is clicked', () => {
		// Assuming you have some companies listed in a table
		// Locate the company row you want to delete and click the "Izbriši kompaniju" button
		cy.get('table')
			.contains('tr', 'Test Company') // Assuming 'Test Company' is the name of the company you want to delete
			.within(() => {
				// Click the row where the company is located so that the row is selected
				// Select the specific cell in the row that contains the company name
				cy.get('td').contains('Test Company').click();
			});
		cy.get('[data-test="delete-button"]').click();

		// After clicking the delete button, verify that the company is deleted
		// For example, check if the company's data is no longer present in the table
		cy.get('.app-notification-success').should('be.visible');
	});
});
