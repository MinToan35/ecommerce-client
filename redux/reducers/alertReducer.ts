import { GLOBALTYPES } from "../actions/globalTypes";
import {AlertAction} from '../interfaces'

interface AlertState {
    [key: string]: any;
}

const initialState: AlertState = {}

const alertReducer =(state=initialState,action:AlertAction):AlertState=>{
    switch (action.type){
        case GLOBALTYPES.ALERT:
            return action.payload;
        default:
            return state;
    }
}

export default alertReducer