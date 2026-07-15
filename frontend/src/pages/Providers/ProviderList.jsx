import { Container } from "@mui/material";
import AppLayout from "../../layouts/AppLayout";

import ProviderHeader from "../../components/provider/ProviderHeader";
import ProviderFilter from "../../components/provider/ProviderFilter";
import ProviderTable from "../../components/provider/ProviderTable";



const ProviderList = () => {
    return (
        <AppLayout>
            <Container maxWidth={false}>
                <ProviderHeader />

                <ProviderFilter />

                <ProviderTable />
            </Container>
        </AppLayout>
    );
};

export default ProviderList;
