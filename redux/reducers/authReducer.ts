import { GLOBALTYPES } from "../actions/globalTypes"
import { IAuthAction, IAuthPayload } from "../interfaces"

const initialState: IAuthPayload = {}

const authReducer = (state = initialState, action: IAuthAction): IAuthPayload => {
  switch (action.type) {
    case GLOBALTYPES.AUTH:
      return action.payload
    default:
      return state
  }
}

export default authReducer
