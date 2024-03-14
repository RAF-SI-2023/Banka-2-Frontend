import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UserpanelComponent } from './components/userpanel/userpanel.component';
import { AdminpanelComponent } from './components/adminpanel/adminpanel.component';
import { CreateBankAccountComponent } from './components/create-bank-account/create-bank-account.component';
import { CreateBankProfileComponent } from './components/create-bank-profile/create-bank-profile.component';
import { NavigationMenuComponent } from './components/navigation-menu/navigation-menu.component';
import { BankAccountMaskDirective } from './directives/bank-account-mask.directive';
import { DomesticFormComponent } from './components/create-bank-account/domestic-form/domestic-form.component';
import { ForeignFormComponent } from './components/create-bank-account/foreign-form/foreign-form.component';

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgOptimizedImage } from "@angular/common";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSortModule } from "@angular/material/sort";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AlertInterceptor } from "./interceptors/alert.interceptor";
import { UpdateDialogComponent } from './components/adminpanel/dialogs/update-dialog/update-dialog.component';
import { AddDialogComponent } from './components/adminpanel/dialogs/add-dialog/add-dialog.component';
import { ConfirmActionDialogComponent } from './components/adminpanel/dialogs/confirm-action-dialog/confirm-action-dialog.component';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from '@angular/material/core';
import { PhoneNumberValidatorDirective } from './directives/phone-number-validator.directive';
import { PasswordChangeComponent } from './components/password-change/password-change.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    LoginComponent,
    HomeComponent,
    UserpanelComponent,
    AdminpanelComponent,
    CreateBankAccountComponent,
    CreateBankProfileComponent,
    NavigationMenuComponent,
    BankAccountMaskDirective,
    DomesticFormComponent,
    ForeignFormComponent,
    UpdateDialogComponent,
    AddDialogComponent,
    ConfirmActionDialogComponent,
    PhoneNumberValidatorDirective,
    PasswordChangeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    MatTabsModule,
    MatIconModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatStepperModule,
    MatCardModule,
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSnackBarModule,
    MatButtonToggleModule,
    HttpClientModule,
    MatSortModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AlertInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
