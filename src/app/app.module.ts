import { NgModule } from '@angular/core';

// DECLARATIONS
/// COMPONENTS
import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { CreateBankProfileComponent } from './components/create-bank-profile/create-bank-profile.component';
import { HomeComponent } from './components/home/home.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { PasswordChangeComponent } from './components/password-change/password-change.component';
import { UsersComponent } from './components/users/users.component';
import { AddEmployeeDialogComponent } from './components/users/dialogs/add-employee-dialog/add-employee-dialog.component';
import { AddAgentDialogComponent } from './components/users/dialogs/add-agent-dialog/add-agent-dialog.component';
import { UpdateUserDialogComponent } from './components/users/dialogs/update-user-dialog/update-user-dialog.component';
import { CreateBankAccountComponent } from './components/create-bank-account/create-bank-account.component';
import { NavigationMenuComponent } from './components/navigation-menu/navigation-menu.component';
import { DomesticFormComponent } from './components/create-bank-account/domestic-form/domestic-form.component';
import { ForeignFormComponent } from './components/create-bank-account/foreign-form/foreign-form.component';
import { CompanyFormComponent } from './components/create-bank-account/company-form/company-form.component';
import { StocksComponent } from './components/stocks/stocks.component';
import { CurrencyExchangeComponent } from './components/currency-exchange/currency-exchange.component';
import { ForexComponent } from './components/forex/forex.component';
import { OptionsComponent } from './components/options/options.component';
import { UserInfoDialogComponent } from './components/users/dialogs/user-info-dialog/user-info-dialog.component';
import { StockInfoDialogComponent } from './components/stocks/dialogs/stock-info-dialog/stock-info-dialog.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { CompanyInfoDialogComponent } from './components/companies/dialogs/company-info-dialog/company-info-dialog.component';
import { CurrencyInfoDialogComponent } from './components/currency-exchange/dialogs/currency-info-dialog/currency-info-dialog.component';
import { ExchangeInfoDialogComponent } from './components/currency-exchange/dialogs/exchange-info-dialog/exchange-info-dialog.component';
import { AgentsComponent } from './components/agents/agents.component';
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
import { StockFilterComponent } from './components/stocks/dialogs/stock-filter/stock-filter.component';
import { CardsComponent } from './components/cards/cards.component';
import { CreationFormComponent } from './components/cards/creation-form/creation-form.component';
import { ChangeStatusFormComponent } from './components/cards/change-status-form/change-status-form.component';
import { ChangeLimitFormComponent } from './components/cards/change-limit-form/change-limit-form.component';
/// DIRECTIVES/PIPES
import { PhoneNumberValidatorDirective } from './directives/phone-number-validator.directive';
import { NoPasteDirective } from './directives/no-paste.directive';
import { BankAccountMaskDirective } from './directives/bank-account-mask.directive';
import { EpochToDatePipe } from './pipes/epoch-to-date.pipe';
import { EmailValidatorDirective } from './directives/email-validator.directive';
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
import { ConfirmDialogComponent } from './components/transactions/confirm-dialog/confirm-dialog.component';

@NgModule({
	declarations: [
		AppComponent,
		LandingComponent,
		LoginComponent,
		CreateBankProfileComponent,
		HomeComponent,
		UserProfileComponent,
		PasswordChangeComponent,
		UsersComponent,
		AddEmployeeDialogComponent,
		AddAgentDialogComponent,
		UpdateUserDialogComponent,
		CreateBankAccountComponent,
		NavigationMenuComponent,
		DomesticFormComponent,
		ForeignFormComponent,
		CompanyFormComponent,
		StocksComponent,
		CurrencyExchangeComponent,
		PhoneNumberValidatorDirective,
		NoPasteDirective,
		BankAccountMaskDirective,
		EpochToDatePipe,
		EmailValidatorDirective,
		ForexComponent,
		OptionsComponent,
		UserInfoDialogComponent,
		StockInfoDialogComponent,
		CompaniesComponent,
		CompanyInfoDialogComponent,
		CurrencyInfoDialogComponent,
		ExchangeInfoDialogComponent,
		AgentsComponent,
		CreditsComponent,
		CreditInfoDialogComponent,
		CreateCreditRequestComponent,
		TranslatePipe,
		UpdateCompanyDialogComponent,
		AddCompanyDialogComponent,
		CreditRequestsComponent,
		CreditReqInfoDialogComponent,
		ForexInfoDialogComponent,
		TransactionsComponent,
		ExternalFormComponent,
		InternalFormComponent,
		AccountNumberFormatPipe,
		StockFilterComponent,
		CardsComponent,
		CreationFormComponent,
		ChangeStatusFormComponent,
		ChangeLimitFormComponent,
		CardsInfoDialogComponent,
  ConfirmDialogComponent,
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
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
