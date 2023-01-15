//import { GLOBALTYPES } from "./actions/globalTypes";

export interface IAuthPayload {
  token?: string
  user?: IUser
}

export interface IAlertPayload {
  loading?: boolean
  success?: string
  error?: string
}

export interface ILoginData {
  email: string
  password: string
}

export interface IAlertAction {
  type: string
  payload: IAlertPayload
}

export interface IAuthAction {
  type: string
  payload: IAuthPayload
}

// export interface IAuthState {
//   [key: string]: any
// }

export interface IRootState {
  auth: IAuthPayload
  alert: IAlertPayload
  user: IUserPayload
}

export interface IUser {
  avatar: string
  mobile?: string
  address?: string
  gender: string
  _id: string
  email: string
  username: string
  role: string
  status: string
  createdAt: string
}

//user

export interface IUserAction {
  type: string
  payload: IUserPayload
}

export interface IUserPayload {
  users?: IUser[]
  loading?: boolean
  error?: string
}
