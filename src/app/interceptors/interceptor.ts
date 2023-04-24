import { AppPath } from './../enums/routing-path-enum';
import { AuthService } from 'src/app/services/auth.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { EMPTY, Observable } from "rxjs"
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authReq = req.clone({
      headers: req.headers.set('token', this.authService.token),
    })
    if (this.authService.isUserAuthorized()) {
      return next.handle(authReq);
    } else {
      this.router.navigate([AppPath.SignInFullPath]);
      return EMPTY;
    }
  }
}
