import {ADMIN_CREDENTIALS, TEST_USER_2_CREDENTIALS, TEST_USER_CREDENTIALS} from "../../support/constants";

describe('OTC trade', () => {
	it(' should sell DT stock', () => {
		cy.login(TEST_USER_CREDENTIALS.username, TEST_USER_CREDENTIALS.password);
		cy.visit('/acquired-securities');

		cy.wait(1000);
		// Open the mat-select dropdown
		cy.get('[data-test="accountNumberSelect"]').click();

		// Select the option that contains the account number
		cy.get('mat-option').contains('333-4444-111111111').click();

		cy.get('table')
			.contains('tr', 'DT')
			.within(() => {
				cy.get('td').contains('DT').dblclick();
			});

		cy.get('input[formControlName="amount"]').type('1', { force: true })

		cy.get('[data-test="sell-quantity"]').click()

		cy.get('.app-notification-success').should('be.visible');
	})

	it(' should accept the sale', () => {
		cy.login(TEST_USER_2_CREDENTIALS.username, TEST_USER_2_CREDENTIALS.password);
		cy.visit('/publicly-tradable-securities');

		cy.wait(1000);

		// Type into the input field
		cy.get('input[matinput]').type('lpavlovic11521rn');

		cy.get('table')
			.contains('tr', 'DT')
			.within(() => {
				cy.get('td').contains('DT').dblclick();
			});

		cy.get('input[formControlName="volume"]').type('1', { force: true })
		cy.get('input[formControlName="totalPrice"]').type('10', { force: true })

		cy.get('[data-test="buy-button"]').click()

		cy.get('.app-notification-success').should('be.visible');
	})

	it(' should admin accept contract', () => {
		cy.login(ADMIN_CREDENTIALS.username, ADMIN_CREDENTIALS.password);
		cy.visit('/contracts');

		cy.get('input[placeholder="Status"]').click(); // Click to open the autocomplete options
		cy.get('mat-option').contains('Na').click();

		cy.wait(1000);
		cy.get('.cdk-column-dateTimeCreated > .mat-sort-header-container').dblclick()

		cy.get('table')
				.contains('tr', 'DT')
				.within(() => {
					cy.get('td').contains('DT').dblclick();
				});

		cy.get('[data-test="approve-contract-button"]').click()

		cy.get('.app-notification-success').should('be.visible');
	})

	it(' should seller accept contract', () => {
		cy.login(TEST_USER_CREDENTIALS.username, TEST_USER_CREDENTIALS.password);
		cy.visit('/contracts');

		cy.get('input[placeholder="Status"]').click(); // Click to open the autocomplete options

		cy.get('mat-option').contains('Na').click();

		cy.wait(1000);
		cy.get('.cdk-column-dateTimeCreated > .mat-sort-header-container').dblclick()

		cy.get('table')
				.contains('tr', 'DT')
				.within(() => {
					cy.get('td').contains('DT').dblclick();
				});

		cy.get('[data-test="approve-contract-button"]').click()

		cy.get('.app-notification-success').should('be.visible');
	})

	it(' should have the stock in approved contracts', () => {
		cy.login(TEST_USER_CREDENTIALS.username, TEST_USER_CREDENTIALS.password);
		cy.visit('/contracts');

		cy.get('input[placeholder="Status"]').click(); // Click to open the autocomplete options

		cy.get('mat-option').contains('Odobreno').click();

		// Check if the stock is in the portfolio
		cy.get('table')
			.contains('tr', 'DT')
			.should('exist');
	})
})
