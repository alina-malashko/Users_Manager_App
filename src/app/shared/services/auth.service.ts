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
      localStorage.setItem('token', 'true');
      this.auth.authState.subscribe((user) => {
        if (user) {
          this.router.navigate([AppPath.MainFullPath]);
        }
      });
    })
    .catch((error)=> {
      console.log(error);
      this.router.navigate([AppPath.SignInFullPath]);
      throw new Error;
    });
  }

  signOut() {
    return this.auth.signOut().then(() => {
      localStorage.removeItem('token');
      this.router.navigate([AppPath.SignInFullPath]);
    });
  }
}
