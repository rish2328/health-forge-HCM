import { Container } from "@mui/material";
import { useParams } from "react-router-dom";
import AppLayout from "../../layouts/AppLayout";
import ProviderForm from "../../components/provider/ProviderForm";


const EditProvider = () => {
    const { uuid } = useParams();

    return (
        <AppLayout>
            <Container maxWidth={false}>
                <ProviderForm mode="edit" uuid={uuid} />
            </Container>
        </AppLayout>
    );
};

export default EditProvider;
