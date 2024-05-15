import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';
import { loginGuard } from './guards/login.guard';
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
import { PubliclyTradableSecuritiesComponent } from './components/publicly-tradable-securities/publicly-tradable-securities.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { ActuariesComponent } from './components/actuaries/actuaries.component';
import { CreditsComponent } from './components/credits/credits.component';
import { CreateCreditRequestComponent } from './components/create-credit-request/create-credit-request.component';
import { CreditRequestsComponent } from './components/credit-requests/credit-requests.component';
import { CardsComponent } from './components/cards/cards.component';
import { TransactionsComponent } from './components/transactions/transactions/transactions.component';
import { BankExchangeComponent } from './components/bank-exchange/bank-exchange.component';
import { FuturesContractsComponent } from './components/futures-contracts/futures-contracts.component';
import { accountGuard } from './guards/account.guard';

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
		component: TransactionsComponent,
		path: 'transactions',
		canActivate: [authGuard, accountGuard],
	},
	{
		component: BankExchangeComponent,
		path: 'bank-exchange',
		canActivate: [authGuard, accountGuard],
	},
	{
		component: CreditsComponent,
		path: 'credits',
		canActivate: [authGuard, accountGuard],
	},
	{
		component: CreateCreditRequestComponent,
		path: 'credits/create-credit-request',
		canActivate: [authGuard, accountGuard],
	},
	{
		component: CurrencyExchangeComponent,
		path: 'currency-exchange',
		canActivate: [authGuard, roleGuard],
		data: { roles: [Role.ADMIN, Role.SUPERVISOR, Role.AGENT] },
	},
	{
		component: StocksComponent,
		path: 'stocks',
		canActivate: [authGuard, roleGuard],
		data: { roles: [Role.ADMIN, Role.SUPERVISOR, Role.AGENT] },
	},
	{
		component: OptionsComponent,
		path: 'options/:stockListing',
		canActivate: [authGuard, roleGuard],
		data: { roles: [Role.ADMIN, Role.SUPERVISOR, Role.AGENT] },
	},
	{
		component: ForexComponent,
		path: 'forex',
		canActivate: [authGuard, roleGuard],
		data: { roles: [Role.ADMIN, Role.SUPERVISOR, Role.AGENT] },
	},
	{
		component: PubliclyTradableSecuritiesComponent,
		path: 'publicly-tradable-securities',
		canActivate: [authGuard, roleGuard],
		data: { roles: [Role.ADMIN, Role.SUPERVISOR, Role.AGENT] },
	},
	{
		component: FuturesContractsComponent,
		path: 'futures-contracts',
		canActivate: [authGuard, roleGuard],
		data: { roles: [Role.ADMIN, Role.SUPERVISOR, Role.AGENT] },
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
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
