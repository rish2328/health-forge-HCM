import { Container, Stack, Typography, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import AppLayout from "../../layouts/AppLayout";
import ProviderForm from "../../components/provider/ProviderForm";


const AddProvider = () => {
    const navigate = useNavigate();

    return (
        <AppLayout>
            <Container maxWidth={false}>
                <Stack direction="row" sx={{ mb: 3, justifyContent:"space-between", alignItems:"center" }} >
                    <div>
                        <Typography variant="h5">Add Provider</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}> Fill the information below to create a new provider. </Typography>
                    </div>

                    <Button variant="contained" startIcon={<ArrowBackIcon />} onClick={() => navigate("/providers")} sx={{ minWidth: 120, height: 46, borderRadius: 1, boxShadow: 2 }} > Back </Button>
                </Stack>

                <ProviderForm mode="add" />
            </Container>
        </AppLayout>
    );
};

export default AddProvider;
