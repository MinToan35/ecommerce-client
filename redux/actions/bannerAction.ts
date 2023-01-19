import axios, { AxiosInstance } from "axios"
import { Dispatch } from "redux"
import { imageUpload } from "../../utils/imageUpload"
import { IBanner, IBannerAction } from "../interfaces"
import { GLOBALTYPES } from "./globalTypes"

interface IBannerData {
  axiosJWT: AxiosInstance
  token: any
  banners?: IBanner[]
  banner?: IBanner
  //_id?: string
  image?: File | string
  imageMobile?: File | string
  name?: string
  isShow?: boolean
}

export const BANNERTYPES = {
  LOADING: "BANNER-LOADING",
  ERROR: "BANNER-ERROR",
  ADD: "ADD-BANNER",
  DELETE: "DELETE-BANNER",
  UPDATE: "UPDATE-BANNER"
}

export const getBanners = (data: IBannerData) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: BANNERTYPES.LOADING, payload: { loading: true } })
    const res = await data.axiosJWT.get(`/api_1.0/banner?page=1&limit=30`, {
      headers: { Authorization: "Bearer " + data.token }
    })
    dispatch({
      type: GLOBALTYPES.BANNER,
      payload: {
        banners: res.data.banners,
        loading: false
      }
    })
  } catch (error: any) {
    dispatch<IBannerAction>({
      type: GLOBALTYPES.BANNER,
      payload: {
        error: error.message || error.response.data.msg
      }
    })
  }
}

export const createBanner = (data: IBannerData) => async (dispatch: Dispatch) => {
  //const { image, imageMobile, name, isShow } = data.banner
  const { axiosJWT, token } = data
  try {
    dispatch({ type: BANNERTYPES.LOADING, payload: { loading: true } })
    let newImage: any
    let newImageMobile: any
    if (data.banner?.image && typeof data.banner.image !== "string") newImage = await imageUpload(data.banner?.image)
    if (data.banner?.imageMobile && typeof data.banner.imageMobile !== "string")
      newImageMobile = await imageUpload(data.banner?.imageMobile)

    const res = await axiosJWT.post(
      `/api_1.0/banner`,
      {
        image: newImage.data.secure_url,
        imageMobile: newImageMobile.data.secure_url,
        name: data.banner?.name,
        isShow: data.banner?.isShow
      },
      {
        headers: { Authorization: "Bearer " + token }
      }
    )
    dispatch({
      type: BANNERTYPES.ADD,
      payload: { banner: res.data.banner }
    })
  } catch (error: any) {
    console.log(error)
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: error.response.data.msg }
    })
  }
}

export const deleteBanner = (data: IBannerData) => async (dispatch: Dispatch) => {
  try {
    const { axiosJWT, token, banner } = data
    dispatch({ type: BANNERTYPES.LOADING, payload: { loading: true } })
    await axiosJWT.delete(`/api_1.0/banner/${data.banner?._id}`, {
      headers: { Authorization: "Bearer " + token }
    })
    dispatch({
      type: BANNERTYPES.DELETE,
      payload: { banner }
    })
  } catch (error: any) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: error.response.data.msg }
    })
  }
}

export const updateBanner = (data: IBannerData) => async (dispatch: Dispatch) => {
  try {
    if (!data.banner) return dispatch({ type: GLOBALTYPES.ALERT, payload: { error: "Missing info" } })
    const { axiosJWT, token } = data
    const { image, imageMobile, name, isShow, _id } = data.banner
    dispatch({ type: BANNERTYPES.LOADING, payload: { loading: true } })

    let newImage: any
    let newImageMobile: any

    if (data.banner?.image && typeof data.banner.image !== "string") newImage = await imageUpload(data.banner?.image)
    if (data.banner?.imageMobile && typeof data.banner.imageMobile !== "string")
      newImageMobile = await imageUpload(data.banner?.imageMobile)

    dispatch({
      type: BANNERTYPES.UPDATE,
      payload: {
        banner: {
          _id,
          image: newImage ? newImage.data.secure_url : image,
          imageMobile: newImageMobile ? newImageMobile.data.secure_url : imageMobile,
          name,
          isShow
        }
      }
    })
    await axiosJWT.put(
      `/api_1.0/banner/${_id}`,
      {
        image: newImage ? newImage.data.secure_url : image,
        imageMobile: newImageMobile ? newImageMobile.data.secure_url : imageMobile,
        name,
        isShow
      },
      {
        headers: { Authorization: "Bearer " + token }
      }
    )
    dispatch({ type: BANNERTYPES.LOADING, payload: { loading: false } })
  } catch (error: any) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: error.response.data.msg }
    })
  }
}
