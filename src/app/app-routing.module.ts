import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';
import { loginGuard } from './guards/login.guard';
import { accountGuard } from './guards/account.guard';
import { Role } from './dtos/decoded-token-dto';

import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { CreateBankProfileComponent } from './components/create-bank-profile/create-bank-profile.component';
import { HomeComponent } from './components/home/home.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UsersComponent } from './components/users/users.component';
import { CreateBankAccountComponent } from './components/create-bank-account/create-bank-account.component';
import { StocksComponent } from './components/stocks/stocks.component';
import { CurrencyExchangeComponent } from './components/currency-exchange/currency-exchange.component';
import { OptionsComponent } from './components/options/options.component';
import { ForexComponent } from './components/forex/forex.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { AllCompanyEmployeesComponent } from './components/companies/all-company-employees/all-company-employees.component';
import { ActuariesComponent } from './components/actuaries/actuaries.component';
import { CreditsComponent } from './components/credits/credits.component';
import { CreateCreditRequestComponent } from './components/create-credit-request/create-credit-request.component';
import { CreditRequestsComponent } from './components/credit-requests/credit-requests.component';
import { CardsComponent } from './components/cards/cards.component';
import { MoneyTransactionsComponent } from './components/money-transactions/money-transactions.component';
import { BankExchangeComponent } from './components/bank-exchange/bank-exchange.component';
import { FuturesContractsComponent } from './components/futures-contracts/futures-contracts.component';
import { MoneyTransactionsAllComponent } from './components/money-transactions-all/money-transactions-all.component';
import { PubliclyTradableSecuritiesComponent } from './components/publicly-tradable-securities/publicly-tradable-securities.component';
import { AcquiredSecuritiesComponent } from './components/acquired-securities/acquired-securities.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ContractsComponent } from './components/contracts/contracts.component';
import { OrderTransactionsAllComponent } from './components/order-transactions-all/order-transactions-all.component';
import { BankProfitsComponent } from './components/bank-profits/bank-profits.component';
import { AgentProfitsComponent } from './components/bank-profits/agent-profits/agent-profits.component';
import { BankTransactionsProfitsComponent } from './components/bank-profits/bank-transactions-profits/bank-transactions-profits.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { MarginAccountsComponent } from './components/margin-accounts/margin-accounts.component';

const routes: Routes = [
	{
		component: LandingComponent,
		path: '',
	},
	{
		component: LoginComponent,
		path: 'login',
		canActivate: [loginGuard],
	},
	{
		component: CreateBankProfileComponent,
		path: 'create-bank-profile',
	},
	{
		component: HomeComponent,
		path: 'home',
		canActivate: [authGuard],
	},
	{
		component: UserProfileComponent,
		path: 'user-profile',
		canActivate: [authGuard],
	},
	{
		component: MoneyTransactionsComponent,
		path: 'money-transactions',
		canActivate: [authGuard, accountGuard, roleGuard],
		data: { roles: [Role.ADMIN, Role.USER] },
	},
	{
		component: MoneyTransactionsAllComponent,
		path: 'money-transactions/all',
		canActivate: [authGuard],
	},
	{
		component: OrderTransactionsAllComponent,
		path: 'order-transactions/all',
		canActivate: [authGuard],
	},
	{
		component: BankExchangeComponent,
		path: 'bank-exchange',
		canActivate: [authGuard, accountGuard, roleGuard],
		data: { roles: [Role.ADMIN, Role.USER] },
	},
	{
		component: CreditsComponent,
		path: 'credits',
		canActivate: [authGuard, accountGuard, roleGuard],
		data: { roles: [Role.ADMIN, Role.USER] },
	},
	{
		component: CreateCreditRequestComponent,
		path: 'credits/create-credit-request',
		canActivate: [authGuard, accountGuard, roleGuard],
		data: { roles: [Role.ADMIN, Role.USER] },
	},
	{
		component: CurrencyExchangeComponent,
		path: 'currency-exchange',
		canActivate: [authGuard],
	},
	{
		component: StocksComponent,
		path: 'stocks',
		canActivate: [authGuard],
	},
	{
		component: OptionsComponent,
		path: 'options/:stockListing',
		canActivate: [authGuard, roleGuard],
		data: { roles: [Role.ADMIN, Role.SUPERVISOR, Role.AGENT, Role.USER] },
	},
	{
		component: ForexComponent,
		path: 'forex',
		canActivate: [authGuard, roleGuard],
		data: { roles: [Role.ADMIN, Role.SUPERVISOR, Role.AGENT] },
	},
	{
		component: FuturesContractsComponent,
		path: 'futures-contracts',
		canActivate: [authGuard, roleGuard],
		data: { roles: [Role.ADMIN, Role.SUPERVISOR, Role.AGENT, Role.USER] },
	},
	{
		component: UsersComponent,
		path: 'users',
		canActivate: [authGuard, roleGuard],
		data: { roles: [Role.ADMIN, Role.EMPLOYEE] },
	},
	{
		component: CreateBankAccountComponent,
		path: 'create-bank-account',
		canActivate: [authGuard, roleGuard],
		data: { roles: [Role.ADMIN, Role.EMPLOYEE] },
	},
	{
		component: CompaniesComponent,
		path: 'companies',
		canActivate: [authGuard, roleGuard],
		data: {
			roles: [Role.ADMIN, Role.EMPLOYEE, Role.SUPERVISOR, Role.AGENT],
		},
	},
	{
		component: AllCompanyEmployeesComponent,
		path: 'companies/:pib',
		canActivate: [authGuard, roleGuard],
		data: { roles: [Role.ADMIN, Role.EMPLOYEE] },
	},
	{
		component: ActuariesComponent,
		path: 'actuaries',
		canActivate: [authGuard, roleGuard],
		data: { roles: [Role.ADMIN, Role.EMPLOYEE, Role.SUPERVISOR] },
	},
	{
		component: CreditRequestsComponent,
		path: 'credit-requests',
		canActivate: [authGuard, roleGuard],
		data: { roles: [Role.ADMIN, Role.EMPLOYEE] },
	},
	{
		component: CardsComponent,
		path: 'cards',
		canActivate: [authGuard, roleGuard],
		data: { roles: [Role.ADMIN, Role.EMPLOYEE] },
	},
	{
		component: PubliclyTradableSecuritiesComponent,
		path: 'publicly-tradable-securities',
		canActivate: [authGuard],
	},
	{
		component: AcquiredSecuritiesComponent,
		path: 'acquired-securities',
		canActivate: [authGuard],
	},
	{
		component: OrdersComponent,
		path: 'orders',
		canActivate: [authGuard, roleGuard],
		data: { roles: [Role.ADMIN, Role.EMPLOYEE, Role.SUPERVISOR] },
	},
	{
		component: ContractsComponent,
		path: 'contracts',
		canActivate: [authGuard, roleGuard],
		data: {
			roles: [Role.ADMIN, Role.EMPLOYEE, Role.SUPERVISOR, Role.USER],
		},
	},
	{
		component: BankProfitsComponent,
		path: 'bank-profits',
		canActivate: [authGuard, roleGuard],
		data: {
			roles: [Role.ADMIN, Role.EMPLOYEE, Role.SUPERVISOR],
		},
	},
	{
		component: AgentProfitsComponent,
		path: 'bank-profits/agent-profits',
		canActivate: [authGuard, roleGuard],
		data: {
			roles: [Role.ADMIN, Role.EMPLOYEE, Role.SUPERVISOR],
		},
	},
	{
		component: BankTransactionsProfitsComponent,
		path: 'bank-profits/bank-transactions-profits',
		canActivate: [authGuard, roleGuard],
		data: {
			roles: [Role.ADMIN, Role.EMPLOYEE, Role.SUPERVISOR],
		},
	},
	{
		component: PaymentsComponent,
		path: 'payments',
		canActivate: [authGuard, accountGuard, roleGuard],
		data: {
			roles: [Role.ADMIN, Role.USER],
		},
	},
	{
		component: MarginAccountsComponent,
		path: 'margin-accounts',
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
