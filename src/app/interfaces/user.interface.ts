export interface UserName {
  title: string,
  first: string,
  last: string
}
export interface UserLocation {
  city: string,
  country: string
}
export interface User {
  id: number,
  name: UserName,
  location: UserLocation,
  email: string,
  birth: string,
  registered: string,
  phone: string,
  picture: string,
  nationality: string
}
export interface UsersState {
  isLoadingUsers: boolean,
  users: User[],
  userInfo: User | null
}
