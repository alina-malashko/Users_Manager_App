import { createAction, props } from '@ngrx/store';
import { User } from '../interfaces/user.interface';
import {
  LOAD_USERS,
  LOADING_ON_USERS,
  LOADING_OFF_USERS,
  DELETE_USER,
  LOAD_USER_INFO,
  EDIT_USER,
  ADD_USER
} from './types';

export const LoadingOnUsers = createAction(
  LOADING_ON_USERS
);

export const LoadingOffUsers = createAction(
  LOADING_OFF_USERS
);

export const LoadUsers = createAction(
  LOAD_USERS,
  props<{data: User[]}>()
);

export const DeleteUser = createAction(
  DELETE_USER
);

export const EditUser = createAction(
  EDIT_USER,
  props<{data: User}>()
);

export const AddUser = createAction(
  ADD_USER,
  props<{data: User}>()
);

export const LoadUserInfo = createAction(
  LOAD_USER_INFO,
  props<{data: User | null}>()
);
