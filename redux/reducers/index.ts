import { combineReducers } from "redux"
import auth from "./authReducer"
import alert from "./alertReducer"
import user from "./userReducer"
import bannerState from "./bannerReducer"
import modal from "./modalReducer"
const rootReducer = combineReducers({
  auth,
  alert,
  user,
  bannerState,
  modal
})

export default rootReducer
