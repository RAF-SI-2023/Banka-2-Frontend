import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UserpanelComponent } from './components/userpanel/userpanel.component';
import { AdminpanelComponent } from './components/adminpanel/adminpanel.component';
import { CreateBankAccountComponent } from './components/create-bank-account/create-bank-account.component';
import { CreateBankProfileComponent } from './components/create-bank-profile/create-bank-profile.component';
import { NavigationMenuComponent } from './components/navigation-menu/navigation-menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaperStocksComponent } from './components/paper-stocks/paper-stocks.component';


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
    PaperStocksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule, 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
