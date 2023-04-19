import { Action } from '@ngrx/store';
import { UsersService } from './../../services/users.service';
import { catchError, map, mergeMap } from 'rxjs/operators';
import {
  GetUsers,
  GetUsersFailed,
} from './../actions/users.action';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ActionTypes } from 'src/app/enums/action-types-enum';

@Injectable()
export class UsersEffects {

  constructor(private actions: Actions, private usersService: UsersService) {}

  private getUsers$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(ActionTypes.LOADING_ON_USERS),
      mergeMap(() =>
        this.usersService.getUsers().pipe(
          map((users) => (
            GetUsers({ users })
          )),
          catchError((err: HttpErrorResponse) =>
            of(GetUsersFailed())
          )
        )
      )
    )
  );
}
