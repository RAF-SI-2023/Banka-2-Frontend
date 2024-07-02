import {
	ADMIN_CREDENTIALS,
	TEST_USER_CREDENTIALS,
} from '../../support/constants';

describe('Stock Purchase', () => {
	it(' should purchase DT stock', () => {
		cy.login(
			TEST_USER_CREDENTIALS.username,
			TEST_USER_CREDENTIALS.password,
		);
		cy.visit('/stocks');

		cy.wait(1000);

		cy.get('table')
			.contains('tr', 'DT')
			.within(() => {
				cy.get('td').contains('DT').dblclick();
			});

		cy.get('input[formControlName="quantity"]').type('3', { force: true });

		cy.get('[data-test="buy-button"]').click();

		cy.get('.app-notification-success').should('be.visible');
	});

	it(' should accept the purchase', () => {
		cy.login(ADMIN_CREDENTIALS.username, ADMIN_CREDENTIALS.password);
		cy.visit('/orders');

		cy.get('input[placeholder="Status"]').click(); // Click to open the autocomplete options
		cy.get('mat-option').contains('Na').click();

		cy.wait(1000);

		cy.get('table')
			.contains('tr', 'DT')
			.within(() => {
				cy.get('td').contains('DT').dblclick();
			});

		cy.get('[data-test="accept-button"]').click();

		cy.get('.app-notification-success').should('be.visible');
	});

	it(' should have the stock in the portfolio', () => {
		cy.login(
			TEST_USER_CREDENTIALS.username,
			TEST_USER_CREDENTIALS.password,
		);
		cy.visit('/acquired-securities');

		cy.wait(1000);
		// Open the mat-select dropdown
		cy.get('[data-test="accountNumberSelect"]').click();

		// Select the option that contains the account number
		cy.get('mat-option').contains('333-4444-111111111').click();

		// Check if the stock is in the portfolio
		cy.get('table').contains('tr', 'DT').should('exist');
	});
});
