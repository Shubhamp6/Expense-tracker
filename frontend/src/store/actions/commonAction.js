import { resetTokenApi } from '../../apis/auth.api'
import MessageDilog from '../../components/MessageDilog'
import { SNACK_BAR_VARIETNS } from '../../utils/constants'

import { accessToken, refreshToken } from '../../utils/helper'
import { openModal } from './modalAction'
import { callSnackBar } from './snackbarAction'
import { signOutAction } from './userReducerAction'

export const callApiAction = (
  asyncFun,
  onSuccess = () => { },
  onError = () => { },
) => {
  return async (dispatch, getState) => {
    const callResponse = await asyncFun()

    if (callResponse.status === 1) {
      await onSuccess(callResponse.data)
    } else {

      if(callResponse.response && callResponse.response.data){
        const response = callResponse.response.data
        
        if (response.code === 400) {
          onError(Array.isArray(response.data) && response.data[0].msg)
        } else if (response.code === 401) {
          const resetFunResponse = await resetTokenApi()
          
          if (resetFunResponse.status === 1) {
            accessToken.set(resetFunResponse.data.accessToken)
            refreshToken.set(resetFunResponse.data.refreshToken)
  
            dispatch(callApiAction(asyncFun, onSuccess, onError))
          } else if (resetFunResponse.code === 401) {
            
            dispatch(signOutAction())
          }
        } else if (response.code === 403) {
          dispatch(callSnackBar("Your session has expired due to unautherized access", SNACK_BAR_VARIETNS.error))
          dispatch(signOutAction())
        } else {
          dispatch(callSnackBar(response.message || "OOPS! Something went wrong", SNACK_BAR_VARIETNS.error))
          onError(response.message || "OOPS! Something went wrong")
        }
      }else{
        
        if (callResponse.response && callResponse.response.status === 503) {
          dispatch(callSnackBar("Server is under maintance.", SNACK_BAR_VARIETNS.error))
          onError("Server is under maintance.")
        }else{
          dispatch(callSnackBar("Something went wrong", SNACK_BAR_VARIETNS.error))
          onError("Something went wrong")
        }
      }
     
    }
  }
}
