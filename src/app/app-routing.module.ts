import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppPath } from './shared/enums/routing-path-enum';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {path: AppPath.Core, redirectTo: AppPath.Main, pathMatch: 'full'},
  {path: AppPath.SignIn, component: LoginPageComponent},
  {path: AppPath.Main, component: MainPageComponent, canActivate: [AuthGuard]},
  {path: '**', component: NotFoundPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
