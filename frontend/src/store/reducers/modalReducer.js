import { actions } from "../../utils/constants";


const initialState = {
    open: false,
    component: <></>,
    title: "",
    onConfirm: () => {

    },
    onCancle: () => {

    },
    confirmText: "Submit",
    resetText: "Cancel",
    size: 'md'

}
const modalReducer = (state = initialState, action) => {

    switch (action.type) {
        case actions.OPEN_MODAL: return {
            ...state,
            open: true,
            component: action.component,
            size: action.size,
            title: action.title,
            onConfirm: action.onConfirm ?? null,
            onCancle: action.onCancle ?? null,
            confirmText: action.confirmText ?? "Submit",
            resetText: action.resetText ?? "Cancel",

        };
        case actions.CLOSE_MODAL: return { ...state, ...initialState };
        default: return { ...state }
    }

}
export default modalReducer