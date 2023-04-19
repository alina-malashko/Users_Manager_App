import { UsersState } from './../interfaces/user.interface';
import { ActionReducerMap, ActionReducer, MetaReducer } from '@ngrx/store';
import { usersReducer } from './reducers/users.reducer';
import { localStorageSync } from 'ngrx-store-localstorage';

export interface AppState {
  users: UsersState
}

export const reducers: ActionReducerMap<AppState, any> = {
  users: usersReducer,
};

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({keys: ['users'], rehydrate: true})(reducer);
}

export const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];
