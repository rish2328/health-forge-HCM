import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";


const DeleteAvailabilityDialog = ({ open, onClose, onConfirm, availability }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle sx={{ fontWeight: 700 }} > Delete Availability </DialogTitle>

            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete the availability schedule for{" "}
                    <strong>{availability?.day_of_week || availability?.day}</strong>?
                </DialogContentText>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 2.5 }}>
                <Button variant="outlined" onClick={onClose}> Cancel </Button>
                <Button variant="contained" color="error" onClick={onConfirm}> Delete </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteAvailabilityDialog;



