import { createAction, props } from '@ngrx/store';
import { User } from '../../interfaces/user.interface';
import { ActionTypes } from '../../enums/action-types-enum';

export const LoadingOnUsers = createAction(
  ActionTypes.LOADING_ON_USERS
);

export const GetUsers = createAction(
  ActionTypes.GET_USERS,
  props<{users: User[]}>()
);

export const GetUsersFailed = createAction(
  ActionTypes.GET_USERS_FAILED
);

export const DeleteUser = createAction(
  ActionTypes.DELETE_USER,
  props<{data: number}>()
);

export const EditUser = createAction(
  ActionTypes.EDIT_USER,
  props<{data: User}>()
);

export const AddUser = createAction(
  ActionTypes.ADD_USER,
  props<{data: User}>()
);
