import { useEffect, useState } from "react";
import { Container, CircularProgress, Box } from "@mui/material";
import { useParams } from "react-router-dom";

import AppLayout from "../../layouts/AppLayout";
import ProviderDashboard from "../../components/provider/ProviderDashboard";

import { getProviderByUUID } from "../../api/providerApi";

const ViewProvider = () => {
    const { uuid } = useParams();

    const [provider, setProvider] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadProvider = async () => {
        try {
            const response = await getProviderByUUID(uuid);
            setProvider(response.data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProvider();
    }, [uuid]);

    return (
        <AppLayout>
            <Container maxWidth={false}>
                {loading ? (
                    <Box display="flex" justifyContent="center" mt={5}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <ProviderDashboard provider={provider} refreshProvider={loadProvider} />
                )}
            </Container>
        </AppLayout>
    );
};

export default ViewProvider;
