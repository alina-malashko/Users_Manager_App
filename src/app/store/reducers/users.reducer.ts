import { createReducer, on } from '@ngrx/store';
import { UsersState } from '../../interfaces/user.interface';
import {
  GetUsers,
  LoadingOnUsers,
  LoadingOffUsers,
  DeleteUser,
  EditUser,
  AddUser
} from '../actions/users.action';

const initialState: UsersState = {
  isLoadingUsers: true,
  users: [],
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
  on(GetUsers, (state, { data }) => ({
    ...state,
    users: data
  })),
  on(DeleteUser, (state, { data }) => ({
    ...state,
    users: state.users.filter(user => user.id != data),
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
    }
  }),
  on(AddUser, (state, { data }) => ({
    ...state,
    users: [
      ...state.users,
      {
        ...data,
        id: state.users.length
      }
    ]
  })),
)
