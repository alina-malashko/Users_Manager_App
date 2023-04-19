import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState } from './../../interfaces/user.interface';

export const selectUsersFeature = createFeatureSelector<UsersState>('users')

export const selectIsLoadingUsers = createSelector(
  selectUsersFeature,
  (state: UsersState) => state.isLoadingUsers
)

export const selectUsers = createSelector(
  selectUsersFeature,
  (state: UsersState) => state.users
)

export const selectUsersError = createSelector(
  selectUsersFeature,
  (state: UsersState) => state.error
)
