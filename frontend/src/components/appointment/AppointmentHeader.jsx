import { Button, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

const AppointmentHeader = () => {
  const navigate = useNavigate();

  return (
    <Stack direction="row" sx={{ justifyContent:"space-between", alignItems:"center", mb: 3 }} >
        <div>
            <Typography variant="h5" sx={{fontWeight:700}}> Appointments </Typography>
            <Typography color="text.secondary"> Manage patient appointments </Typography>
        </div>

        <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate("/appointments/add")} > Schedule Appointment </Button>
    </Stack>
  );
};

export default AppointmentHeader;
