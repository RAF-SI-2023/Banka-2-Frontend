describe('Adding Employee Dialog', () => {
	beforeEach(() => {
		cy.login('vasa_email_adresa_1@gmail.com', 'admin'); // Login as Admin
		cy.visit('/users'); // Assuming your users component is accessible at /users route
	});

	it('should open the "Dodaj zaposlenog" dialog when "Dodaj zaposlenog" button is clicked', () => {
		cy.get('button').contains('Dodaj zaposlenog').click();
		cy.get('mat-dialog-content').should('exist');
		cy.get('mat-dialog-actions').should('exist');
	});

	it('should display required fields in the dialog form', () => {
		cy.get('button').contains('Dodaj zaposlenog').click();

		cy.get('input[name="email"]').should('exist');
		cy.get('input[name="name"]').should('exist');
		cy.get('input[name="surname"]').should('exist');
		cy.get('mat-select[name="gender"]').should('exist');
		cy.get('input[name="dateOfBirth"]').should('exist');
		cy.get('input[name="phone"]').should('exist');
		cy.get('input[name="address"]').should('exist');
		cy.get('input[name="position"]').should('exist');
		cy.get('input[name="department"]').should('exist');
		cy.get('mat-checkbox[name="active"]').should('exist');
		// Add more assertions based on your dialog's form fields
	});

	it('should add an employee when "Dodaj" button is clicked with valid data', () => {
		cy.get('button').contains('Dodaj zaposlenog').click();

		cy.get('input[name="email"]').type('test@example.com');
		cy.get('input[name="name"]').type('John');
		cy.get('input[name="surname"]').type('Doe');
		cy.get('mat-select[name="gender"]')
			.click()
			.get('mat-option')
			.contains('Muški')
			.click();
		const dateOfBirth = '1990-01-01';
		cy.get('input[name="dateOfBirth"]')
			.invoke('val', dateOfBirth)
			.trigger('input');
		cy.get('input[name="phone"]').type('1234567890');
		cy.get('input[name="address"]').type('123 Test St');
		cy.get('input[name="position"]').type('Developer');
		cy.get('input[name="department"]').type('IT');

		cy.get('[data-test="dodaj-button"]').click(); // Replace 'data-testid' and 'dodaj-button' with the actual data attribute and value

		cy.get('.app-notification-success').should('be.visible');
		// Add assertions to verify that employee is successfully added, e.g., check if the new employee appears in the users table
	});

	// Add more test cases to cover other scenarios and edge cases
});
