import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  private usersUrl = 'https://randomuser.me/api/?results=100';

  getUsers(): Observable<any> {
    return this.http.get<any>(this.usersUrl)
    .pipe(
      catchError(error => {
        console.log(error);
        return [];
      })
    )
  }
}
