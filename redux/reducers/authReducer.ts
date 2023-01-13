import { GLOBALTYPES } from "../actions/globalTypes"
import { IAuthAction, IAuthState } from "../interfaces"

const initialState: IAuthState = {}

const authReducer = (state = initialState, action: IAuthAction): IAuthState => {
  switch (action.type) {
    case GLOBALTYPES.AUTH:
      return action.payload
    default:
      return state
  }
}

export default authReducer
