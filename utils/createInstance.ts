import axios, { AxiosRequestConfig } from "axios"
import jwt_decode from "jwt-decode"
import { Dispatch } from "redux"
import { refreshToken } from "../redux/actions/authAction"

export const createAxios = (token: any, dispatch: Dispatch) => {
  const newInstance = axios.create()
  newInstance.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      let date = new Date()
      const decodedToken: any = jwt_decode(token)
      if (decodedToken.exp < date.getTime() / 1000) {
        const res = dispatch<any>(refreshToken())
        if (config.headers) {
          ;(config.headers as any).Authorization = res
        }
      }

      return config
    },
    (err) => {
      return Promise.reject(err)
    }
  )
  return newInstance
}
