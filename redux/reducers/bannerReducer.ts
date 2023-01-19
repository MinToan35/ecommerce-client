import { BANNERTYPES } from "../actions/bannerAction"
import { GLOBALTYPES } from "../actions/globalTypes"
import { IBanner, IBannerAction, IBannerPayload } from "../interfaces"

const initialState: IBannerPayload = {
  banners: [],
  loading: false
}

const bannerReducer = (state = initialState, action: IBannerAction): IBannerPayload => {
  switch (action.type) {
    case GLOBALTYPES.BANNER:
      return action.payload
    case BANNERTYPES.LOADING:
      return { ...state, loading: action.payload.loading }
    case BANNERTYPES.ADD:
      if (!Array.isArray(state.banners)) state.banners = []
      if (action.payload.banner) return { ...state, banners: [...state.banners, action.payload.banner], loading: false }
      else return state
    case BANNERTYPES.DELETE:
      return {
        ...state,
        banners: state.banners?.filter((item) => item?._id !== action.payload.banner?._id),
        loading: false
      }
    case BANNERTYPES.UPDATE:
      if (state.banners) {
        return {
          ...state,
          banners: state.banners.map((banner) =>
            banner?._id === action.payload.banner?._id ? { ...banner, ...action.payload.banner } : banner
          )
        }
      }
      return {
        ...state
      }
    default:
      return state
  }
}

export default bannerReducer
