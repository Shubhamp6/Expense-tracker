import { actions } from "../../utils/constants";
import { accessToken, loggedInUser, refreshToken } from "../../utils/helper";


const initialState = {
    data: {},
   
    isLoggedIn: false,

}
const userReducer = (state = initialState, action) => {

    switch (action.type) {

        case actions.SET_USER: return { ...state, data: action.value, isLoggedIn: true };
        case actions.SIGN_IN: {
            accessToken.set(action.value.access_token)
            
            refreshToken.set(action.value.refresh_token)
            return { ...state, data: action.value,  isLoggedIn: true };
        }
        case actions.SIGN_OUT: return { ...state, data: {},  isLoggedIn: false };
        default: return { ...state }
    }

}
export default userReducer