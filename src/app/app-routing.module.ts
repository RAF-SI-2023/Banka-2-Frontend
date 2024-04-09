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
import { CompaniesComponent } from './components/companies/companies.component';
import { AgentsComponent } from './components/agents/agents.component';
import { CreditsComponent } from './components/credits/credits.component';
import { CreateCreditRequestComponent } from './components/create-credit-request/create-credit-request.component';
import { CreditRequestsComponent } from './components/credit-requests/credit-requests.component';

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
		component: UsersComponent,
		path: 'users',
		canActivate: [roleGuard],
		data: { roles: [Role.ADMIN, Role.EMPLOYEE] },
	},
	{
		component: CreateBankAccountComponent,
		path: 'create-bank-account',
		canActivate: [authGuard],
		data: { roles: [Role.ADMIN, Role.EMPLOYEE] },
	},
	{
		component: CompaniesComponent,
		path: 'companies',
		canActivate: [authGuard],
	},
	{
		component: StocksComponent,
		path: 'stocks',
		canActivate: [authGuard],
	},
	{
		component: CurrencyExchangeComponent,
		path: 'currency-exchange',
		canActivate: [authGuard],
	},
	{
		component: ForexComponent,
		path: 'forex',
		canActivate: [authGuard],
	},
	{
		component: OptionsComponent,
		path: 'options/:stockListing',
		canActivate: [authGuard],
	},
	{
		component: AgentsComponent,
		path: 'agents',
		canActivate: [authGuard],
	},
	{
		component: CreditsComponent,
		path: 'credits',
		canActivate: [authGuard],
	},
	{
		component: CreateCreditRequestComponent,
		path: 'credits/create-credit-request',
		canActivate: [authGuard],
	},
	{
		component: CreditRequestsComponent,
		path: 'credit-requests',
		canActivate: [authGuard],
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
