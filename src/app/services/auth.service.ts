import { HelpersService } from './helpers.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { filter, mergeMap, Observable, tap } from 'rxjs';
import { AppPath } from '../enums/routing-path-enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private helpersService: HelpersService
  ) {}

  public signIn(email: string, password: string): Observable<any> {

    const sideEffects = (user: any): Observable<any> => {
      return this.helpersService
      .promiseToObservable(user?.getIdTokenResult())
      .pipe(
        tap((data: any) => {
          localStorage.setItem('token', data.token);
          localStorage.setItem('expires', data.expirationTime);
          this.router.navigate([AppPath.MainFullPath]);
        })
      )
    }

    return this.helpersService
    .promiseToObservable(this.auth.signInWithEmailAndPassword(email, password))
    .pipe(
      mergeMap(() => this.auth.authState
        .pipe(
          filter(user => user !== null),
          mergeMap(user => {
            return sideEffects(user);
          })
        )
      )
    )
  }

  public signOut(): Observable<any> {
    return this.helpersService.promiseToObservable(this.auth.signOut())
    .pipe(
      tap(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('expires');
        localStorage.removeItem('users');
        this.router.navigate([AppPath.SignInFullPath]);
      }
    ))
  }

  public isUserAuthorized(): boolean {
    const token = localStorage.getItem('token');
    const expires = localStorage.getItem('expires');
    if (token && expires) {
      return new Date(expires) > new Date();
    }
    return false;
  }
}
