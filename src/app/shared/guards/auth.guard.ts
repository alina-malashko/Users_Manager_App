import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AppPath } from '../enums/routing-path-enum';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {}

  canActivate() {
    if (this.authService.isUserAuthorized()) {
      return true;
    }
    this.router.navigate([AppPath.SignInFullPath]);
    return false;
  }
}
