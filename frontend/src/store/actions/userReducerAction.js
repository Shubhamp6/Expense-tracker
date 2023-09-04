import { signInApi } from "../../apis/auth.api"
import getUserAndSystemDataApi from "../../apis/user.api"
import { actions } from "../../utils/constants"
import { logOut } from "../../utils/helper"
import { callApiAction } from "./commonAction"


export const signInAction = (data, onError, onSuccess) => {
    return async (dispatch, getState) => {
        dispatch(callApiAction(
            async () => await signInApi(data),
            (response) => {
                dispatch({ type: actions.SIGN_IN, value: response })
                onSuccess()
            },
            (err) => {

                onError(err)
            }
        ))
    }


}

export const fetchUserDetails = (data, onSuccess, onError) => {
    return async (dispatch, getState) => {
        dispatch(callApiAction(
            async () => await getUserAndSystemDataApi(data),
            (response) => {
                dispatch({ type: actions.SET_USER, value: response })
                onSuccess(response)
            },
            (err) => {

                onError(err)
            }
        ))
    }


}



export const signOutAction = () => {
    logOut()
    return {
        type: actions.SIGN_OUT,
    }
}