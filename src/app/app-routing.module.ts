import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppPath } from './enums/routing-path-enum';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: AppPath.Core,
    redirectTo: AppPath.Main,
    pathMatch: 'full',
  },
  {
    path: AppPath.SignIn,
    loadChildren: () => import('./pages/login-page/login-page.module').then(m => m.LoginPageModule),
    data: {animation: 'SignInPage'}
  },
  {
    path: AppPath.Main,
    loadChildren: () => import('./pages/main-page/main-page.module').then(m => m.MainPageModule),
    canActivate: [AuthGuard],
    data: {animation: 'MainPage'}
  },
  {
    path: AppPath.EditPage,
    loadChildren: () => import('./pages/edit-user-page/edit-user-page.module').then(m => m.EditUserPageModule),
    canActivate: [AuthGuard],
    data: {animation: 'EditUserPage'}
  },
  {
    path: '**',
    loadChildren: () => import('./pages/not-found-page/not-found-page.module').then(m => m.NotFoundPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
