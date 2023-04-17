import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private usersUrl = environment.usersUrl;

  constructor(private http: HttpClient) { }

  private formateResponsePayload(users: any): User[] {
    return users.map((user: any, index: number) => {
      return {
        id: index,
        name: user.name,
        location: {
          city: user.location.city,
          country: user.location.country
        },
        email: user.email,
        birth: user.dob.date,
        registered: user.registered.date,
        phone: user.phone,
        picture: user.picture.large,
        nationality: user.nat
      }
    })
  }

  public getUsers(): Observable<any> {
    return this.http.get<any>(this.usersUrl)
    .pipe(
      map((data) => data.results),
      map((users) => this.formateResponsePayload(users)),
    )
  }
}
