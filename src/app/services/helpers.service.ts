import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  public promiseToObservable<T>(promise: Promise<T>): Observable<T> {
    return new Observable((subscriber) => {
      promise
      .then((resp) => subscriber.next(resp))
      .catch((e) => subscriber.error(e))
      .finally(() => subscriber.complete())
    })
  }

  public formateDate(value: string): string {
    const date = new Date(value);
    const year = date.getFullYear();
    const month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
    const day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
    return `${year}-${month}-${day}`;
  }

  public getIdForNewUser(): number {
    let index = 0;
    const store = localStorage.getItem('users');
    if (store) {
      const users = JSON.parse(store).users;
      if (users.length == 0) return 0;
      index = users[users.length-1].id + 1
    }
    return index;
  }
}
