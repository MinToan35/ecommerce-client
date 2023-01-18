import { BANNERTYPES } from "../actions/bannerAction"
import { GLOBALTYPES } from "../actions/globalTypes"
import { IBannerAction, IBannerPayload } from "../interfaces"

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
      return { ...state, banners: state.banners?.filter((item) => item._id !== action.payload._id), loading: false }
    default:
      return state
  }
}

export default bannerReducer
