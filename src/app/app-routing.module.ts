import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminpanelComponent } from './components/adminpanel/adminpanel.component';
import { CreateBankAccountComponent } from './components/create-bank-account/create-bank-account.component';
import { CreateBankProfileComponent } from './components/create-bank-profile/create-bank-profile.component';
import { HomeComponent } from './components/home/home.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { UserpanelComponent } from './components/userpanel/userpanel.component';
import { authGuard } from './guards/auth.guard';
import { PaperStocksComponent } from './components/paper-stocks/paper-stocks.component';
const routes: Routes = [
  { component: LandingComponent, path: " " },
  { component: LoginComponent, path: "login" },
  { component: CreateBankProfileComponent, path: "create-bank-profile" },
  { component: HomeComponent, path: "home", canActivate: [authGuard], canDeactivate: [authGuard] },
  { component: UserpanelComponent, path: "userpanel", canActivate: [authGuard], canDeactivate: [authGuard] },
  { component: AdminpanelComponent, path: "adminpanel", canActivate: [authGuard], canDeactivate: [authGuard] },
  { component: CreateBankAccountComponent, path: "create-bank-account", canActivate: [authGuard], canDeactivate: [authGuard] },
  { component: PaperStocksComponent, path: "paper-stocks", canActivate: [authGuard], canDeactivate: [authGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
