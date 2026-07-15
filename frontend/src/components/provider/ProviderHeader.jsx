import { Box, Button, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

const ProviderHeader = () => {
    const navigate = useNavigate();

    return (
        <Stack direction="row" sx={{justifyContent:"space-between", alignItems:"center", mb:3}} >
            <Box>
                <Typography variant="h4" sx={{fontWeight:700}}> Providers </Typography>
                <Typography color="text.secondary"> Manage all healthcare providers. </Typography>
            </Box>

            <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate("/providers/add")} > Add Provider </Button>
        </Stack>
    );
};

export default ProviderHeader;
