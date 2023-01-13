//import { GLOBALTYPES } from "./actions/globalTypes";

interface IAuthPayload {
  token?: string
  user?: any
}

interface IAlertPayload {
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
}
