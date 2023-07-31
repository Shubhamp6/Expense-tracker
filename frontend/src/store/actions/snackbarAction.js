import { actions } from "../../utils/constants"


export const callSnackBar = (message,variant) => {
    
    return { type: actions.CALL_SNACKBAR_DATA, message, variant }


}