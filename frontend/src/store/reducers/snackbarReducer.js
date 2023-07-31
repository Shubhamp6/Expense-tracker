import { actions } from "../../utils/constants";


const initialState = {
    message:"",
    variant:"success"

}
const snackBarReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.CALL_SNACKBAR_DATA: return { ...state,message: action.message, variant: action.variant };        
        default: return { ...state }
    }

}
export default snackBarReducer