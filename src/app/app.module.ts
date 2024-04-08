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
/// DIRECTIVES/PIPES
import { PhoneNumberValidatorDirective } from './directives/phone-number-validator.directive';
import { NoPasteDirective } from './directives/no-paste.directive';
import { BankAccountMaskDirective } from './directives/bank-account-mask.directive';
import { EpochToDatePipe } from './pipes/epoch-to-date.pipe';
import { EmailValidatorDirective } from './directives/email-validator.directive';

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

// PROVIDERS
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AlertInterceptor } from './interceptors/alert.interceptor';

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
