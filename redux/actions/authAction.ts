import axios from "axios"
import { GLOBALTYPES } from "./globalTypes"
import { Dispatch } from "redux"
import { ILoginData, IAlertAction, IAuthAction } from "../interfaces"

export const login = (data: ILoginData) => async (dispatch: Dispatch) => {
  try {
    dispatch<IAlertAction>({ type: GLOBALTYPES.ALERT, payload: { loading: true } })

    const res = await axios.post("/api_1.0/auth/login", data)

    dispatch<IAuthAction>({
      type: GLOBALTYPES.AUTH,
      payload: {
        token: res.data.accessToken,
        user: res.data.user
      }
    })

    dispatch<IAlertAction>({
      type: GLOBALTYPES.ALERT,
      payload: {
        success: res.data.msg
      }
    })
  } catch (error: any) {
    //console.log(error.response)
    dispatch<IAlertAction>({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: error.response.data.msg
      }
    })
  }
}

export const logout = () => async (dispatch: Dispatch) => {
  try {
    dispatch<IAlertAction>({ type: GLOBALTYPES.ALERT, payload: { loading: true } })
    await axios.post("/api_1.0/auth/logout")
    dispatch<IAuthAction>({
      type: GLOBALTYPES.AUTH,
      payload: {}
    })

    dispatch<IAlertAction>({
      type: GLOBALTYPES.ALERT,
      payload: {
        loading: false
      }
    })
  } catch (error: any) {
    //console.log(error.response)
    dispatch<IAlertAction>({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: error.response.data.msg
      }
    })
  }
}

export const refreshToken = () => async (dispatch: Dispatch) => {
  try {
    dispatch<IAlertAction>({
      type: GLOBALTYPES.ALERT,
      payload: {
        loading: true
      }
    })
    const res = await axios.post("/api_1.0/auth/refresh_token")

    dispatch<IAuthAction>({
      type: GLOBALTYPES.AUTH,
      payload: {
        token: res.data.accessToken,
        user: res.data.user
      }
    })

    dispatch<IAlertAction>({
      type: GLOBALTYPES.ALERT,
      payload: {
        success: res.data.msg
      }
    })
    return res.data.accessToken
  } catch (error: any) {
    dispatch<IAlertAction>({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: error.response.data.msg
      }
    })
  }
}
