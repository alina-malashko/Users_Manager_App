import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HelpersService } from './helpers.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private usersUrl = environment.usersUrl;

  constructor(
    private http: HttpClient,
    private helpersService: HelpersService
  ) { }

  public getUsers(): Observable<any> {
    return this.http.get<any>(this.usersUrl)
    .pipe(
      map((data) => data.results),
      map((users) => (
        users.map((user: any, index: number) => ({
          id: index + this.helpersService.getIdForNewUser(),
          name: user.name,
          location: {
            city: user.location.city,
            country: user.location.country
          },
          email: user.email,
          birth: this.helpersService.formateDate(user.dob.date),
          registered: this.helpersService.formateDate(user.registered.date),
          phone: user.phone,
          picture: user.picture.large,
          nationality: user.nat
        }))
      )),
    )
  }
}
