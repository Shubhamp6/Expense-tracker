import { DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import SubmitButton from "./button/SubmitButton"
import { useDispatch } from 'react-redux'
import { closeModal } from "../store/actions/modalAction"

const MessageDilog = ({ title = "Error", message, onSubmit }) => {
    const dispatch = useDispatch()
    const handleClose = () => {
        dispatch(closeModal())
    }
    return (
        <>
            <DialogTitle variant="h3">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText variant="h4" id="alert-dialog-slide-description">
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <SubmitButton onClick={handleClose} title={'close'}></SubmitButton>
                <SubmitButton onClick={onSubmit ? onSubmit : handleClose} title="okay" ></SubmitButton>
            </DialogActions>

        </>
    )
}
export default MessageDilog