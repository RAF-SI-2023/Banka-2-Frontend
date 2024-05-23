import { ADMIN_CREDENTIALS } from 'cypress/support/constants';

describe('Login Component', () => {
	beforeEach(() => {
		cy.visit('/login'); // Assuming your login page is accessible at /login route
	});

	// Check if the login form is displayed
	it('should display login form', () => {
		cy.get('form').should('exist');
		cy.get('input[type="email"]').should('exist');
		cy.get('input[type="password"]').should('exist');
		cy.get('button[type="submit"]').should('exist').contains('Uloguj se');
	});

	// Check if email validation works
	it('should show error message for invalid credentials', () => {
		cy.get('input[type="email"]').type('invalidemail');
		cy.get('input[type="password"]').type('invalidpassword');
		cy.get('button[type="submit"]').click();
		cy.contains('Pogrešan format email-a.').should('exist');
	});

	// Check if invalid credentials show error message
	it('should show error message for wrong credentials', () => {
		cy.get('input[type="email"]').type('invalidemail@example.com');
		cy.get('input[type="password"]').type('invalidpassword');
		cy.get('button[type="submit"]').click();
		cy.contains('Neautorizovan pristup!').should('exist');
	});

	// Successful login test
	it('should login with valid credentials', () => {
		cy.get('input[type="email"]').type(ADMIN_CREDENTIALS.username);
		cy.get('input[type="password"]').type(ADMIN_CREDENTIALS.password);
		cy.get('button[type="submit"]').click();
		cy.url().should('include', '/home');
	});
});
