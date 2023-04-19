import { createReducer, on } from '@ngrx/store';
import { UsersState } from '../../interfaces/user.interface';
import {
  GetUsers,
  GetUsersFailed,
  LoadingOnUsers,
  DeleteUser,
  EditUser,
  AddUser
} from '../actions/users.action';

const initialState: UsersState = {
  isLoadingUsers: true,
  users: [],
  error: false
}

export const usersReducer = createReducer(
  initialState,
  on(LoadingOnUsers, state => ({
    ...state,
    isLoadingUsers: true
  })),
  on(GetUsers, (state, { users }) => ({
    ...state,
    isLoadingUsers: false,
    users: users,
    error: false
  })),
  on(GetUsersFailed, (state) => ({
    ...state,
    isLoadingUsers: false,
    error: true
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
