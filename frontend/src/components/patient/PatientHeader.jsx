import { Button, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const PatientHeader = ({ onAdd }) => {
    return (
        <Stack direction="row" sx={{ mb: 3, justifyContent:"space-between", alignItems:"center" }} >
            <div>
                <Typography variant="h4">Patients</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}> Manage all registered patients. </Typography>
            </div>

            <Button variant="contained" startIcon={<AddIcon />} size="large" onClick={onAdd} > Add Patient </Button>
        </Stack>
    );
};

export default PatientHeader;
