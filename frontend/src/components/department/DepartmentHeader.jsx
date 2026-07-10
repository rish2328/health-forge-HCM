import { Button, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";


const DepartmentHeader = () => {
    const navigate = useNavigate();

    return (
        <Stack direction="row" sx={{ mb: 3, justifyContent: "space-between", alignItems: "center" }} >
            <div>
                <Typography variant="h4">Departments</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}> Manage all hospital departments. </Typography>
            </div>

            <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate("/departments/add")} sx={{ minWidth: 170, height: 46, borderRadius: 1, boxShadow: 2 }} > Add Department </Button>
        </Stack>
    );
};

export default DepartmentHeader;
