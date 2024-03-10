import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UserpanelComponent } from './components/userpanel/userpanel.component';
import { AdminpanelComponent } from './components/adminpanel/adminpanel.component';
import { CreateBankAccountComponent } from './components/create-bank-account/create-bank-account.component';
import { CreateBankProfileComponent } from './components/create-bank-profile/create-bank-profile.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';


import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    LoginComponent,
    HomeComponent,
    UserpanelComponent,
    AdminpanelComponent,
    CreateBankAccountComponent,
    CreateBankProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatStepperModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
