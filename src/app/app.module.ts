import { NgModule } from '@angular/core';

// DECLARATIONS
/// COMPONENTS
import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { CreateBankProfileComponent } from './components/create-bank-profile/create-bank-profile.component';
import { HomeComponent } from './components/home/home.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UsersComponent } from './components/users/users.component';
import { AddEmployeeDialogComponent } from './components/users/dialogs/add-employee-dialog/add-employee-dialog.component';
import { AddAgentDialogComponent } from './components/actuaries/add-agent-dialog/add-agent-dialog.component';
import { UpdateUserDialogComponent } from './components/users/dialogs/update-user-dialog/update-user-dialog.component';
import { CreateBankAccountComponent } from './components/create-bank-account/create-bank-account.component';
import { NavigationMenuComponent } from './components/navigation-menu/navigation-menu.component';
import { DomesticFormComponent } from './components/create-bank-account/domestic-form/domestic-form.component';
import { ForeignFormComponent } from './components/create-bank-account/foreign-form/foreign-form.component';
import { BusinessFormComponent } from './components/create-bank-account/business-form/business-form.component';
import { StocksComponent } from './components/stocks/stocks.component';
import { CurrencyExchangeComponent } from './components/currency-exchange/currency-exchange.component';
import { ForexComponent } from './components/forex/forex.component';
import { OptionsComponent } from './components/options/options.component';
import { UserInfoDialogComponent } from './components/users/dialogs/user-info-dialog/user-info-dialog.component';
import { StockInfoDialogComponent } from './components/stocks/dialogs/stock-info-dialog/stock-info-dialog.component';
import { TransactionsAllInfoDialogComponent } from './components/transactions-all/dialogs/transactions-all-info-dialog/transaction-all-info-dialog.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { CompanyInfoDialogComponent } from './components/companies/dialogs/company-info-dialog/company-info-dialog.component';
import { CurrencyInfoDialogComponent } from './components/currency-exchange/dialogs/currency-info-dialog/currency-info-dialog.component';
import { ExchangeInfoDialogComponent } from './components/currency-exchange/dialogs/exchange-info-dialog/exchange-info-dialog.component';
import { ActuariesComponent } from './components/actuaries/actuaries.component';
import { CreditsComponent } from './components/credits/credits.component';
import { CreditInfoDialogComponent } from './components/credits/dialogs/credit-info-dialog/credit-info-dialog.component';
import { CreateCreditRequestComponent } from './components/create-credit-request/create-credit-request.component';
import { UpdateCompanyDialogComponent } from './components/companies/dialogs/update-company-dialog/update-company-dialog.component';
import { AddCompanyDialogComponent } from './components/companies/dialogs/add-company-dialog/add-company-dialog.component';
import { CreditRequestsComponent } from './components/credit-requests/credit-requests.component';
import { CreditReqInfoDialogComponent } from './components/credit-requests/credit-req-info-dialog/credit-req-info-dialog.component';
import { ForexInfoDialogComponent } from './components/forex/forex-info-dialog/forex-info-dialog.component';
import { CardsInfoDialogComponent } from './components/user-profile/cards-info-dialog/cards-info-dialog.component';
import { TransactionsComponent } from './components/transactions/transactions/transactions.component';
import { ExternalFormComponent } from './components/transactions/external-form/external-form.component';
import { InternalFormComponent } from './components/transactions/internal-form/internal-form.component';
import { VerifyTransactionDialogComponent } from './components/transactions/verify-transaction-dialog/verify-transaction-dialog.component';
import { StockFilterComponent } from './components/stocks/dialogs/stock-filter/stock-filter.component';
import { CardsComponent } from './components/cards/cards.component';
import { CreationFormComponent } from './components/cards/creation-form/creation-form.component';
import { ChangeStatusFormComponent } from './components/cards/change-status-form/change-status-form.component';
import { ChangeLimitFormComponent } from './components/cards/change-limit-form/change-limit-form.component';
import { BankExchangeComponent } from './components/bank-exchange/bank-exchange.component';
import { FuturesContractsComponent } from './components/futures-contracts/futures-contracts.component';
import { FuturesContractInfoDialogComponent } from './components/futures-contracts/futures-contract-info-dialog/futures-contract-info-dialog.component';
import { ActuaryInfoDialogComponent } from './components/actuaries/actuary-info-dialog/actuary-info-dialog.component';
import { PasswordChangeDialogComponent } from './components/user-profile/password-change-dialog/password-change-dialog.component';
import { TransactionsAllComponent } from './components/transactions-all/transactions-all.component';
import { RequestsComponent } from './components/acquired-securities/requests/requests.component';
import { RequestInfoDialogComponent } from './components/acquired-securities/requests/request-info-dialog/request-info-dialog.component';
import { AcquiredSecuritiesComponent } from './components/acquired-securities/acquired-securities.component';
import { PubliclyTradableSecuritiesComponent } from './components/publicly-tradable-securities/publicly-tradable-securities.component';
import { PublicSecurityInfoDialogComponent } from './components/publicly-tradable-securities/public-security-info-dialog/public-security-info-dialog.component';
import { AcquiredSecuritiesInfoDialogComponent } from './components/acquired-securities/acquired-securities-info-dialog/acquired-securities-info-dialog.component';
import { AllCompanyEmployeesComponent } from './components/companies/all-company-employees/all-company-employees.component';
import { AddCompanyEmployeeComponent } from './components/companies/all-company-employees/dialogs/add-company-employee/add-company-employee.component';
/// DIRECTIVES/PIPES
import { NoPasteDirective } from './directives/no-paste.directive';
import { BankAccountMaskDirective } from './directives/bank-account-mask.directive';
import { EpochToDatePipe } from './pipes/epoch-to-date.pipe';
import { TranslatePipe } from './pipes/translate.pipe';
import { AccountNumberFormatPipe } from './pipes/account-number-format.pipe';

// IMPORTS
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgOptimizedImage } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HighchartsChartModule } from 'highcharts-angular';
import { MatSliderModule } from '@angular/material/slider';

// PROVIDERS
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AlertInterceptor } from './interceptors/alert.interceptor';
import {
	DateAdapter,
	MAT_DATE_FORMATS,
	MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DATE_FORMAT } from './utils/constants';
import { OptionInfoDialogComponent } from './components/options/option-info-dialog/option-info-dialog.component';

@NgModule({
	declarations: [
		AppComponent,
		LandingComponent,
		LoginComponent,
		CreateBankProfileComponent,
		HomeComponent,
		UserProfileComponent,
		PasswordChangeDialogComponent,
		UsersComponent,
		AddEmployeeDialogComponent,
		AddAgentDialogComponent,
		UpdateUserDialogComponent,
		CreateBankAccountComponent,
		NavigationMenuComponent,
		DomesticFormComponent,
		ForeignFormComponent,
		BusinessFormComponent,
		StocksComponent,
		CurrencyExchangeComponent,
		NoPasteDirective,
		BankAccountMaskDirective,
		EpochToDatePipe,
		ForexComponent,
		OptionsComponent,
		UserInfoDialogComponent,
		StockInfoDialogComponent,
		CompaniesComponent,
		CompanyInfoDialogComponent,
		CurrencyInfoDialogComponent,
		ExchangeInfoDialogComponent,
		ActuariesComponent,
		CreditsComponent,
		CreditInfoDialogComponent,
		CreateCreditRequestComponent,
		RequestInfoDialogComponent,
		RequestsComponent,
		TranslatePipe,
		UpdateCompanyDialogComponent,
		AddCompanyDialogComponent,
		CreditRequestsComponent,
		CreditReqInfoDialogComponent,
		ForexInfoDialogComponent,
		FuturesContractsComponent,
		TransactionsComponent,
		ExternalFormComponent,
		InternalFormComponent,
		VerifyTransactionDialogComponent,
		AccountNumberFormatPipe,
		StockFilterComponent,
		CardsComponent,
		CardsInfoDialogComponent,
		CreationFormComponent,
		ChangeStatusFormComponent,
		ChangeLimitFormComponent,
		BankExchangeComponent,
		FuturesContractInfoDialogComponent,
		ActuaryInfoDialogComponent,
		TransactionsAllComponent,
		TransactionsAllInfoDialogComponent,
		RequestsComponent,
		AcquiredSecuritiesComponent,
		PubliclyTradableSecuritiesComponent,
		PublicSecurityInfoDialogComponent,
		AcquiredSecuritiesInfoDialogComponent,
		AllCompanyEmployeesComponent,
		AddCompanyEmployeeComponent,
		OptionInfoDialogComponent,
	],
	imports: [
		HttpClientModule,
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		FormsModule,
		ReactiveFormsModule,
		NgOptimizedImage,
		MatToolbarModule,
		MatTabsModule,
		MatIconModule,
		MatMenuModule,
		MatFormFieldModule,
		MatButtonModule,
		MatInputModule,
		MatStepperModule,
		MatCardModule,
		MatCheckboxModule,
		MatTableModule,
		MatPaginatorModule,
		MatSelectModule,
		MatSnackBarModule,
		MatSortModule,
		MatButtonToggleModule,
		MatDialogModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatListModule,
		MatProgressSpinnerModule,
		HighchartsChartModule,
		MatSliderModule,
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AlertInterceptor,
			multi: true,
		},
		{
			provide: DateAdapter,
			useClass: MomentDateAdapter,
			deps: [MAT_DATE_LOCALE],
		},
		{ provide: MAT_DATE_FORMATS, useValue: DATE_FORMAT },
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
