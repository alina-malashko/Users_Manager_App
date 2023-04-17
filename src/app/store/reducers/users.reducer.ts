import { createReducer, on } from '@ngrx/store';
import { UsersState } from '../../interfaces/user.interface';
import {
  LoadUsers,
  LoadingOnUsers,
  LoadingOffUsers,
  LoadUserInfo,
  DeleteUser,
  EditUser
} from '../actions';

const initialState: UsersState = {
  isLoadingUsers: true,
  users: [],
  userInfo: null
}

export const usersReducer = createReducer(
  initialState,
  on(LoadingOnUsers, state => ({
    ...state,
    isLoadingUsers: true
  })),
  on(LoadingOffUsers, state => ({
    ...state,
    isLoadingUsers: false
  })),
  on(LoadUsers, (state, { data }) => ({
    ...state,
    users: data
  })),
  on(LoadUserInfo, (state, { data }) => ({
    ...state,
    userInfo: data
  })),
  on(DeleteUser, (state) => ({
    ...state,
    users: state.users.filter(user => user.id != state.userInfo?.id),
    userInfo: null
  })),
  on(EditUser, (state, { data }) => {
    const usersList = state.users.map((user) => {
      if (user.id === data.id) {
        return {
          ...user,
          ...data
        }
      } else {
        return user
      }
    })
    return {
      ...state,
      users: usersList,
      userInfo: data
    }
  })
)
