import { GLOBALTYPES } from "../actions/globalTypes"
import { IUserAction, IUserPayload } from "../interfaces"
import { USERTYPE } from "../actions/userAction"

const initialState: IUserPayload = {
  users: []
}

const userReducer = (state = initialState, action: IUserAction): IUserPayload => {
  switch (action.type) {
    case GLOBALTYPES.USER:
      return action.payload
    case USERTYPE.LOADING:
      return { ...state, loading: true }
    default:
      return state
  }
}

export default userReducer
