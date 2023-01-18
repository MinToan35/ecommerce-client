import axios from "axios"
import { Dispatch } from "redux"
import { GLOBALTYPES } from "./globalTypes"
import { IAlertAction, IUserAction } from "../interfaces"
import { AxiosInstance } from "axios"

interface userData {
  axiosJWT: AxiosInstance
  token: any
}

export const USERTYPE = {
  LOADING: "user-loading"
}

export const getUsers = (data: userData) => async (dispatch: Dispatch) => {
  try {
    dispatch<IUserAction>({ type: USERTYPE.LOADING, payload: { loading: true } })
    const res = await data.axiosJWT.get(`/api_1.0/user?page=1&limit=30`, {
      headers: { Authorization: "Bearer " + data.token }
    })
    dispatch<IUserAction>({
      type: GLOBALTYPES.USER,
      payload: {
        users: res.data.users
      }
    })
  } catch (error: any) {
    // console.log(error.response)
    dispatch<IUserAction>({
      type: GLOBALTYPES.USER,
      payload: {
        error: "user fail" //error.response.data.msg
      }
    })
  }
}
