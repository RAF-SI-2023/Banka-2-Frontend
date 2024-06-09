export const ApiRoutes = {
	// IAM-SERVICE
	/// AuthController
	auth: {
		login: '/auth/login',
		allPermissions: '/permissions/all',
		allRoles: '/roles/all',
	},
	/// UserController
	user: {
		findAll: '/users/all',
		findById: '/users',
		findByEmail: '/users/email',
		passwordActivation: '/users/public/password-activation',
		passwordChange: '/users/password-change',
		createEmployee: '/users/create/employee',
		createAgent: '/users/create/agent',
		createPrivateClient: '/users/public/create/private-client',
		createCorporateClient: '/users/public/create/corporate-client',
		createCompanyEmployee: '/users/public/create/company-employee',
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
	company: {
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
	account: {
		findAccountsByEmail: '/accounts/find-by-email',
		associateProfileInitialization:
			'/accounts/associate-profile-initialization',
		confirmActivationCode: '/accounts/code-confirmation',
		createDomesticAccount: '/accounts/create-account/domestic', // DINARSKI
		createForeignAccount: '/accounts/create-account/foreign', // DEVIZNI
		createBusinessAccount: '/accounts/create-account/business', // POSLOVNI
		cashAccountState: '/cash-account-state',
		depositWithdrawalAddition:
			'/accounts/deposit-withdrawal/payment-addition',
		depositWithdrawalSubtraction:
			'/accounts/deposit-withdrawal/payment-subtraction',
	},
	/// CreditController
	credit: {
		findAll: '/credit/all/account-number',
		findByCreditNumber: '/credit/credit-number',
		createCreditRequest: '/credit/credit-requests/create',
		getAllPendingCreditRequests: '/credit/credit-requests/all-pending',
		getCreditRequestById: '/credit/credit-requests/id',
		approveAndCreate: '/credit/credit-requests/approve-and-create',
		denyCreditRequest: '/credit/credit-requests/deny',
	},
	/// CardController
	card: {
		getCardsByIdentificationCardNumber: '/cards/id',
		getCardsByAccountNumber: '/cards/account-number',
		createCard: '/cards/create-card',
		changeCardStatus: '/cards/change-status',
		changeCardLimit: '/cards/change-card-limit',
		changeCardBlock: '/cards/changeBlock',
	},
	// TransferTransactionController
	transferTransaction: {
		getAllTransactions: '/transaction/funds-transfer-by-email',
		createInternalTransaction: '/transaction/internal',
		createExternalTransaction: '/transaction/external',
		patchVerifyTransaction: '/transaction/verify',
	},
	// CurrencyExchangeController
	bankCurrencyExchange: {
		getAllExchangeRates: '/currency-exchange/exchange-rate/from',
		postExchangeCurrency: '/currency-exchange/exchange-currency',
	},
	// SecuritiesOwnershipsController
	securities: {
		findAll: '/securities-ownerships/all-available',
		findAllPrivate: '/securities-ownerships/all-available-private',
		findAllCompanies: '/securities-ownerships/all-available-companies',
		findAllByAccountNumber: '/securities-ownerships/account-number',
		findBySecuritySymbol: '/securities-ownerships/security-name',
		updateSecurity: '/securities-ownerships/update-publicly-available',
	},
	// OrderController
	order: {
		createOrder: '/orders',
		getAllOrders: '/orders',
		getNonApprovedOrders: '/orders/non-approved',
		getApprovedOrders: '/orders/approved',
		getDeniedOrders: '/orders/denied',
		getOrderById: '/orders/id',
		approveOrder: '/orders/approve',
		rejectOrder: '/orders/reject',
	},
	// OrderTransactionController
	orderTransaction: {
		findAll: '/order-transactions',
		findById: '/order-transactions/id',
		findByOrderId: '/order-transactions/order-id',
		findAllByAccountNumber: '/order-transactions/account-number',
		findAllByEmail: '/order-transactions/email',
	},
	// BankTransferTransactionDetailsController
	bankTransferTransactionDetails: {
		getAll: '/bank-transactions-details/all',
		getTotalProfit: '/bank-transactions-details/total-profit',
	},
	// ActionAgentProfitController
	actionAgentProfit: {
		getAll: '/agent-profit/all',
		getAllTotalProfitsByEmail: '/agent-profit/all-profits-by-users',
		getAgentsTotalProfit: '/agent-profit/total-profit',
	},
	// BankProfitController
	bankProfit: {
		getAll: '/bank-profit/all',
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
		findByName: '/exchange/exchange-name',
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
	futuresContract: {
		findAll: '/futures',
		findById: '/futures',
	},
	/// StockController
	stocks: {
		findAll: '/stock/all',
		findById: '/stock/id',
		findBySymbol: '/stock/by-symbol',
	},
	/// OptionController
	options: {
		findAllOptionsByStockListing: '/options/stock-listing',
	},
	// OTC-SERVICE
	/// ContractController
	contract: {
		getAllContracts: '/contracts/all',
		getAllWaitingContracts: '/contracts/all-waiting',
		getAllApprovedContracts: '/contracts/all-approved',
		getAllRejectedContracts: '/contracts/all-rejected',
		getContractById: '/contracts',
		createContract: '/contracts/create',
		sellerApproveContractById: '/contracts/approve-seller',
		bankApproveContractById: '/contracts/approve-bank',
		sellerDenyContractById: '/contracts/deny-seller',
		bankDenyContractById: '/contracts/deny-bank',
	},
};
