import { actions } from "../../utils/constants";


const initialState = {
    new: 0,
    data: [

    ],

}
const notificationReducer = (state = initialState, action) => {

    switch (action.type) {
        case actions.SET_NOTIFICATION_DATA: return { ...state, new: action.new, data: action.data };
        case actions.NOTIFICATION_READ: return { ...state, new: 0 };
        default: return { ...state }
    }

}
export default notificationReducer