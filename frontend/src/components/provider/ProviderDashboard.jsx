import { Box } from "@mui/material";

import ProviderDashboardHeader from "./dashboard/ProviderDashboardHeader";
import ProviderTabs from "./dashboard/ProviderTabs";


const ProviderDashboard = ({ provider, refreshProvider }) => {
    return (
        <Box>
            <ProviderDashboardHeader provider={provider} />
            <ProviderTabs provider={provider} refreshProvider={refreshProvider} />
        </Box>
    );
};

export default ProviderDashboard;
