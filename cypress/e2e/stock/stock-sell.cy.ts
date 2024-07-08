import { ADMIN_CREDENTIALS } from '../../support/constants';

describe('Stock Sell', () => {
	it(' should sell DT stock', () => {
		cy.login(ADMIN_CREDENTIALS.username, ADMIN_CREDENTIALS.password);
		cy.visit('/acquired-securities');

		cy.wait(1000);

		// Open the mat-select dropdown
		cy.get('[data-test="accountNumberSelect"]').click();

		// Select the option that contains the account number
		cy.get('mat-option').contains('333-4444-999999999').click();

		cy.get('table')
			.contains('tr', 'GOOGL')
			.within(() => {
				cy.get('td').contains('GOOGL').dblclick();
			});

		cy.get('input[formControlName="amount"]').type('1', { force: true });

		cy.get('[data-test="sell-quantity"]').click();

		cy.get('.app-notification-success').should('be.visible');
	});

	it(' should accept the sell', () => {
		cy.login(ADMIN_CREDENTIALS.username, ADMIN_CREDENTIALS.password);
		cy.visit('/orders');

		cy.get('input[placeholder="Status"]').click(); // Click to open the autocomplete options
		cy.get('mat-option').contains('Na').click();

		cy.wait(1000);

		cy.get('table')
			.contains('tr', 'GOOGL')
			.within(() => {
				cy.get('td').contains('GOOGL').dblclick();
			});

		cy.get('[data-test="accept-button"]').click();

		cy.get('.app-notification-success').should('be.visible');
	});
});
