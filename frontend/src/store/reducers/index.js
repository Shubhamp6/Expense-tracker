import { combineReducers } from "@reduxjs/toolkit"
import modalReducer from "./modalReducer";
import userReducer from "./userReducer";
import notificationReducer from "./notificationReducer";
import snackBarReducer from "./snackbarReducer";

const rootReducer = combineReducers({
    user: userReducer,
    modal: modalReducer,
    notifications: notificationReducer,
    snackBar: snackBarReducer
})
export default rootReducer;