import { MainPageComponent } from './pages/main-page/main-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppPath } from './shared/enums/routing-path-enum';

const routes: Routes = [
  {path: AppPath.Core, redirectTo: AppPath.SignIn, pathMatch: 'full'},
  {path: AppPath.SignIn, component: LoginPageComponent},
  {path: AppPath.Main, component: MainPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
