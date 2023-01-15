import { combineReducers } from "redux"
import auth from "./authReducer"
import alert from "./alertReducer"
import user from "./userReducer"
const rootReducer = combineReducers({
  auth,
  alert,
  user
})

export default rootReducer
