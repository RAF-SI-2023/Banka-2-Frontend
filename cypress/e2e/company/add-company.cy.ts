describe('Adding Company Dialog', () => {
	beforeEach(() => {
		cy.login('vasa_email_adresa_1@gmail.com', 'admin'); // Login as Admin
		cy.visit('/companies'); // Assuming your companies component is accessible at /companies route
	});

	it('should open the "Dodaj kompaniju" dialog when "Dodaj kompaniju" button is clicked', () => {
		cy.get('button').contains('Dodaj kompaniju').click();
		cy.get('mat-dialog-content').should('exist');
		cy.get('mat-dialog-actions').should('exist');
	});

	it('should display required fields in the dialog form', () => {
		cy.get('button').contains('Dodaj kompaniju').click();

		cy.get('input[name="companyName"]').should('exist');
		cy.get('input[name="faxNumber"]').should('exist');
		cy.get('input[name="phoneNumber"]').should('exist');
		cy.get('input[name="pib"]').should('exist');
		cy.get('input[name="registryNumber"]').should('exist');
		cy.get('input[name="identificationNumber"]').should('exist');
		cy.get('input[name="activityCode"]').should('exist');
		cy.get('input[name="address"]').should('exist');
		// Add more assertions based on your dialog's form fields
	});

	it('should add a company when "Dodaj" button is clicked with valid data', () => {
		cy.get('button').contains('Dodaj kompaniju').click();

		cy.get('input[name="companyName"]').type('Test Company');
		cy.get('input[name="faxNumber"]').type('654321');
		cy.get('input[name="phoneNumber"]').type('+38162423456');
		cy.get('input[name="pib"]').type('3493403');
		cy.get('input[name="registryNumber"]').type('383249032');
		cy.get('input[name="identificationNumber"]').type('93013030');
		cy.get('input[name="activityCode"]').type('789012');
		cy.get('input[name="address"]').type('123 Test St');

		cy.get('[data-test="dodaj-button"]').click();

		cy.get('.app-notification-success').should('be.visible');
		// Add assertions to verify that company is successfully added, e.g., check if the new company appears in the companies list
	});

	// Add more test cases to cover other scenarios and edge cases
});
