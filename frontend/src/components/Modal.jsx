import { Box, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Slide, Typography } from '@mui/material';
import { forwardRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { closeModal } from '../store/actions/modalAction'
import { Cancel } from '@mui/icons-material';
import SubmitButton from './button/SubmitButton';
import { ResetButton } from './button/SubmitButton';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const PopUpModal = () => {

    const modal = useSelector(state => state.modal)
    const dispatch = useDispatch()
    const handleClose = () => { modal.onCancle ? modal.onCancle() : dispatch(closeModal()) }
    return <Dialog

        fullWidth={true}
        TransitionComponent={Transition}
        maxWidth={modal.size}
        open={modal.open}
        onClose={handleClose}
    >
        <DialogTitle >
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Typography variant='h3'>{modal.title}</Typography>
                <IconButton onClick={handleClose}>
                    <Cancel />
                </IconButton>
            </Box>
        </DialogTitle>
        <DialogContent>
            {modal.component}
        </DialogContent>
        <DialogActions>
            {modal.onCancle && <Box>
                <ResetButton title="Cancle"></ResetButton>
            </Box>}
            {modal.onConfirm && <Box>
                <SubmitButton title="Submit"></SubmitButton>
            </Box>}
        </DialogActions>


    </Dialog>
}
export default PopUpModal