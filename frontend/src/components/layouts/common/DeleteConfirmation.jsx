import {
    DialogContent,
    DialogActions,
    Button,
    Typography,
} from '@mui/material';

const DeleteConfirmation = ({ setDeleteC }) => {
    return (
        <>
            <DialogContent>
                <Typography>This will permanently delete the category from the database. Are you sure?</Typography>
            </DialogContent>
            <DialogActions>
                <Button color="primary" variant="contained">
                    Cancel
                </Button>
                <Button color="secondary" variant="contained" onClick={() => {
                    setDeleteC(true);
                }}>
                    Confirm
                </Button>
            </DialogActions>
        </>
    );
};

export default DeleteConfirmation;