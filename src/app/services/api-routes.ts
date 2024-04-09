export const ApiRoutes = {
	// IAM-SERVICE
	/// AuthController
	auth: {
		login: '/auth/login',
		allPermissions: '/permissions/all',
		allRoles: '/roles/all',
	},
	/// UserController
	users: {
		findAll: '/users/all',
		findById: '/users/id',
		findByEmail: '/users/email',
		passwordActivation: '/users/public/password-activation',
		passwordChange: '/users/password-change',
		createEmployee: '/users/create/employee',
		createAgent: '/users/create/agent',
		createPrivateClient: '/users/public/create/private-client',
		createCorporateClient: '/users/public/create/corporate-client',
		updateEmployee: '/users/update/employee',
		updatePrivateClient: '/users/update/private-client',
		updateCorporateClient: '/users/update/corporate-client',
		activateEmployee: '/users/employee-activate',
		deactivateEmployee: '/users/employee-deactivate',
		delete: '/users/delete',
		getAgentsLeftLimit: '/users/agent-limit',
		resetAgentsLeftLimit: '/users/agent-limit/reset',
	},
	/// CompanyController
	companies: {
		updateCompany: '/companies/update',
		createCompany: '/companies/create',
		findByPib: '/companies/pib',
		findByIdentificationNumber: '/companies/identificationNumber',
		findById: '/companies/id',
		findAll: '/companies/all',
		deleteByIdentificationNumber: 'companies/delete/identificationNumber',
		deleteById: '/companies/delete/id',
	},
	// BANK-SERVICE
	/// AccountController
	accounts: {
		findAccountsByEmail: '/accounts/find-by-email',
		associateProfileInitialization:
			'/accounts/associate-profile-initialization',
		confirmActivationCode: '/accounts/code-confirmation',
		createDomesticAccount: '/accounts/create-account/domestic', // DINARSKI
		createForeignAccount: '/accounts/create-account/foreign', // DEVIZNI
		createBusinessAccount: '/accounts/create-account/business', // POSLOVNI
	},
	/// CreditController
	credits: {
		findAll: '/credit/all/account-number',
		findByCreditNumber: '/credit/credit-number',
		createCreditRequest: '/credit/credit-requests/create',
		getAllPendingCreditRequests: '/credit/credit-requests/all-pending',
		getCreditRequestById: '/credit/credit-requests/id',
		approveAndCreate: '/credit/credit-requests/approve-and-create',
		denyCreditRequest: '/credit/credit-requests/deny',
	},
	// STOCK-SERVICE
	/// CurrencyController
	currency: {
		findAll: '/currency/all',
		findById: '/currency/id',
		findByCode: '/currency/code',
		findInflationByCurrencyId: '/currency/inflation/currency-id',
		findInflationByCurrencyIdAndYear:
			'/currency/inflation/currency-id/year',
	},
	/// ExchangeController
	exchange: {
		findAll: '/exchange/all',
		findById: '/exchange/id',
		findBySymbol: '/exchange/stockSymbol',
		findByMICode: '/exchange/miCode',
	},
	/// ForexController
	forex: {
		findAll: '/forex/all',
		findById: '/forex/id',
		findByBaseCurrency: '/forex/base-currency',
		findByQuoteCurrency: '/forex/quote-currency',
	},
	/// FuturesContractController
	futures: {
		findAllFutures: '/futures',
	},
	/// StockController
	stocks: {
		findAll: '/stock/all',
		findById: '/stock/id',
		findBySymbol: '/stock/stockSymbol',
	},
	/// OptionController
	options: {
		findAllOptionsByStockListing: '/options/stock-listing',
	},
};
