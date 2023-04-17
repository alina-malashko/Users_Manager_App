import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AppPath } from '../enums/routing-path-enum';

@Injectable({
  providedIn: 'root'
})
export class EditGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const users = localStorage.getItem('users');
    if (users) {
      const parsedUsers = JSON.parse(users);
      if (parsedUsers.userInfo) {
        return true;
      } else {
        this.router.navigate([AppPath.MainFullPath]);
        return false;
      }
    }
    this.router.navigate([AppPath.MainFullPath]);
    return false;
  }
}
