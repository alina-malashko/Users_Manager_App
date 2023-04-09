import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AppPath } from '../enums/routing-path-enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth, private router: Router) { }

  signIn(email: string, password: string) {
    return this.auth
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      this.auth.authState.subscribe((user) => {
        if (user) {
          user.getIdTokenResult().then((data) => {
            localStorage.setItem('token', data.token);
            localStorage.setItem('expires', data.expirationTime);
            this.router.navigate([AppPath.MainFullPath]);
          })
        }
      });
    })
  }

  signOut() {
    return this.auth.signOut().then(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('expires');
      this.router.navigate([AppPath.SignInFullPath]);
    });
  }

  isUserAuthorized() {
    const token = localStorage.getItem('token');
    const expires = localStorage.getItem('expires');
    if (token && expires) {
      return new Date(expires) > new Date();
    }
    return false;
  }
}
