describe('Router', () => {
	const routes = [
		{ path: '/', name: 'Landing page' },
		{ path: '/login', name: 'Login page' },
		{ path: '/create-bank-profile', name: 'Create Bank Profile page' },
		{ path: '/home', name: 'Home page' },
		{ path: '/user-profile', name: 'User Profile page' },
		{ path: '/users', name: 'Users page' },
		{ path: '/create-bank-account', name: 'Create Bank Account page' },
		{ path: '/companies', name: 'Companies page' },
		{ path: '/stocks', name: 'Stocks page' },
		{ path: '/currency-exchange', name: 'Currency Exchange page' },
		{ path: '/forex', name: 'Forex page' },
		{ path: '/options/XYZ', name: 'Options page' },
		{ path: '/agents', name: 'Agents page' },
		{ path: '/credits', name: 'Credits page' },
		{ path: '/credits/create-credit-request', name: 'Create Credit Request page' },
		{ path: '/credit-requests', name: 'Credit Requests page' },
		{ path: '/cards', name: 'Cards page' },
		{ path: '/transactions', name: 'Transactions page' },
	];

	beforeEach(() => {
		cy.login('vasa_email_adresa_1@gmail.com', 'admin')
	});

	routes.forEach(route => {
		it(`Navigates to ${route.name}`, () => {
			cy.visit(route.path);
			if (route.path !== '/login') {
					cy.url().should('include', route.path);
				}else{
					cy.url().should('include', '/home');
			}
		});
	});
});
