const baseUrl = 'http://localhost:4200'; // Set the base URL for your Angular application

describe('Router', () => {
	it('Navigates to Landing page', () => {
		cy.visit(baseUrl); // Visit the base URL
	});

	it('Navigates to Login page', () => {
		cy.visit(`${baseUrl}/login`); // Visit the login route directly
		cy.url().should('include', '/login'); // Check if the URL contains '/login'
	});

	it('Navigates to Create Bank Profile page', () => {
		cy.visit(`${baseUrl}/create-bank-profile`); // Visit the create-bank-profile route directly
		cy.url().should('include', '/create-bank-profile'); // Check if the URL contains '/create-bank-profile'
	});
});
