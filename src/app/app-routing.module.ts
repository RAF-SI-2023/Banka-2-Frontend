import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { CreateBankProfileComponent } from './components/create-bank-profile/create-bank-profile.component';
import { HomeComponent } from './components/home/home.component';
import { UserpanelComponent } from './components/userpanel/userpanel.component';
import { AdminpanelComponent } from './components/adminpanel/adminpanel.component';
import { CreateBankAccountComponent } from './components/create-bank-account/create-bank-account.component';

const routes: Routes = [
  { component: LandingComponent, path: "" },
  { component: LoginComponent, path: "login" },
  { component: CreateBankProfileComponent, path: "create-bank-profile" },
  { component: HomeComponent, path: "home", canActivate: [authGuard] },
  { component: UserpanelComponent, path: "userpanel", canActivate: [authGuard] },
  { component: AdminpanelComponent, path: "adminpanel", canActivate: [authGuard] },
  { component: CreateBankAccountComponent, path: "create-bank-account", canActivate: [authGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
