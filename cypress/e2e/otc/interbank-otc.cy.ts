import {ADMIN_CREDENTIALS} from "../../support/constants";

describe('Interbank OTC', () => {
	it(' should send request' , () => {
		cy.login(ADMIN_CREDENTIALS.username, ADMIN_CREDENTIALS.password);
		cy.visit('/interbank-tradable-securities');

		cy.wait(500);
		cy.get('[data-test="refresh-button"]').click()

		cy.get('.app-notification-success').should('be.visible');

		cy.get('table')
					.contains('tr', 'NVDA')
					.within(() => {
						cy.get('td').contains('NVDA').dblclick();
					});

		cy.get('input[formControlName="amount"]').type('1', { force: true })
		cy.get('input[formControlName="price"]').type('10', { force: true })

		cy.get('[data-test="send-button"]').click()
		cy.get('.app-notification-success').should('be.visible');
	})

	it(' should offer exist', () => {
		cy.login(ADMIN_CREDENTIALS.username, ADMIN_CREDENTIALS.password);
		cy.visit('/interbank-securities-offers');

		cy.get('input[placeholder="Status"]').click(); // Click to open the autocomplete options
		cy.get('mat-option').contains('Poslate').click();

		// Check if the stock is in the portfolio
		cy.get('table')
			.contains('tr', 'NVDA')
			.should('exist');
	})
})
