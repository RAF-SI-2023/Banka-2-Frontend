export const ApiRoutes = {
	auth: {
		login: '/auth/login',
		allPermissions: '/permissions/all',
		allRoles: '/roles/all',
	},
	users: {
		findAll: '/users/all',
		findById: '/users/id',
		findByEmail: '/users/email',
		passwordActivation: '/users/public/password-activation',
		passwordChange: '/users/password-change',
		createEmployee: '/users/create/employee',
		createAgent: '/users/create/agent',
		resetAgentsLeftLimit: '/users/agent-limit/reset',
		getAgentsLeftLimit: '/users/agent-limit',
		createPrivateClient: '/users/public/create/private-client',
		createCorporateClient: '/users/public/create/corporate-client',
		updateEmployee: '/users/update/employee',
		updatePrivateClient: '/users/update/private-client',
		updateCorporateClient: '/users/update/corporate-client',
		activateEmployee: '/users/employee-activate',
		deactivateEmployee: '/users/employee-deactivate',
		delete: '/users/delete',
	},
	accounts: {
		associateProfileInitialization:
			'/accounts/associate-profile-initialization',
		codeConfirmation: '/accounts/code-confirmation',
		createDomesticAccount: '/accounts/create-account/domestic',
		createForeignAccount: '/accounts/create-account/foreign',
		createBusinessAccount: '/accounts/create-account/business',
	},
	stocks: {
		findAll: '/stock/all',
		findById: '/stock/id',
		findBySymbol: '/stock/stockSymbol',
	},
	options: {
		findAllOptionsByStockListing: '/options/stock-listing'
	},
	forex: {
		findAll: '/forex/all',
		findById: '/forex/id/',
		findByBaseCurrency: '/forex/base-currency',
		findByQuoteCurrency: '/forex/quote-currency'
	},
	companies: {
		updateCompany: '/companies/update',
		createCompany: '/companies/create',
		findByPib: '/companies/pib',
		findByIdentificationNumber: '/companies/identificationNumber',
		findById: '/companies/id',
		findAll: '/companies/all',
		deleteByIdentificationNumber: 'companies/delete/identificationNumber',
		deleteById: '/companies/delete/id'
	},
	exchange: {
		findAll: '/exchange/all',
		findById: '/exchange/id',
		findBySymbol: '/exchange/stockSymbol',
		findByMICode: '/exchange/miCode',
	},
	currency: {
		findAll: '/currency/all',
		findById: '/currency/id',
		findByCode: '/currency/code',
		findInflationByCurrencyId: '/currency/inflation/currency-id',

		// TODO: zavisi od beka kako odluci da realizuje ovo
		findInflationByCurrencyIdAndYear: '/currency/inflation/currency-id/year',
	},
};
