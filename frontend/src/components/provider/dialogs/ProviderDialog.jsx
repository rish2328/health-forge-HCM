import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, } from "@mui/material";

const ProviderDialog = ({ open, onClose, onConfirm }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle>Delete Provider</DialogTitle>

            <DialogContent>
                <DialogContentText> Are you sure you want to delete this provider ? </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button color="error" variant="contained" onClick={onConfirm}> Delete </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ProviderDialog;
