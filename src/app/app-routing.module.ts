import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { CreateBankProfileComponent } from './components/create-bank-profile/create-bank-profile.component';
import { HomeComponent } from './components/home/home.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UsersComponent } from './components/users/users.component';
import { CreateBankAccountComponent } from './components/create-bank-account/create-bank-account.component';
import { roleGuard } from "./guards/role.guard";
import {loginGuard} from "./guards/login.guard";
import {Role} from "./dtos/decoded-token-dto";

const routes: Routes = [
  { component: LandingComponent, path: "" },
  { component: LoginComponent, path: "login", canActivate: [loginGuard]},
  { component: CreateBankProfileComponent, path: "create-bank-profile" },
  { component: HomeComponent, path: "home", canActivate: [authGuard] },
  { component: UserProfileComponent, path: "user-profile", canActivate: [authGuard] },
  { component: UsersComponent, path: "users", canActivate: [roleGuard], data: { roles: [Role.ADMIN, Role.EMPLOYEE] } },
  { component: CreateBankAccountComponent, path: "create-bank-account", canActivate: [authGuard], data: { roles: [Role.ADMIN, Role.EMPLOYEE]  } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
