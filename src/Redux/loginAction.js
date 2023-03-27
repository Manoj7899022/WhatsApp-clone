import { ActionTypes } from "./actionTypes";

export const loginAction = user =>{
    return {
        type:ActionTypes.SET_USER,
        payload: user
    }
}