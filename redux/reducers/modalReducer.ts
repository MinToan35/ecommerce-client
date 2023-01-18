import React from "react"
import { GLOBALTYPES } from "../actions/globalTypes"
import { IModalAction } from "../interfaces"

const modalReducer = (state = false, action: IModalAction): Boolean => {
  switch (action.type) {
    case GLOBALTYPES.MODAL:
      return action.payload
    default:
      return state
  }
}

export default modalReducer
