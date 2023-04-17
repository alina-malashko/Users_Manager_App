import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromiseToObservableService {

  public promiseToObservable<T>(promise: Promise<T>): Observable<T> {
    return new Observable((subscriber) => {
      promise
      .then((resp) => subscriber.next(resp))
      .catch((e) => subscriber.error(e))
      .finally(() => subscriber.complete())
    })
  }
}
