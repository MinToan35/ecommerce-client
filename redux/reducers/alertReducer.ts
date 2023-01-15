import { GLOBALTYPES } from "../actions/globalTypes"
import { IAlertAction, IAlertPayload } from "../interfaces"

const initialState: IAlertPayload = {}

const alertReducer = (state = initialState, action: IAlertAction): IAlertPayload => {
  switch (action.type) {
    case GLOBALTYPES.ALERT:
      return action.payload
    default:
      return state
  }
}

export default alertReducer
