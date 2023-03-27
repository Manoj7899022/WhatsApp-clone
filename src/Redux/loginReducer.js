import { ActionTypes } from "./actionTypes"

const initialState = {
    user: null
}

export const loginReducer =(state=initialState, {type, payload}) => {
    switch(type){
        case ActionTypes.SET_USER:
            return{
                ...state,
                user:payload
            }
        default: return state;
    }
}