import { useState } from "react";
import { Box, Paper, Tab, Tabs } from "@mui/material";

import ProviderOverviewTab from "./ProviderOverviewTab";
import ProviderAvailabilityTab from "./ProviderAvailabilityTab";
import ProviderSpecialtiesTab from "./ProviderSpecialtiesTab";
import ProviderDocumentsTab from "./ProviderDocumentsTab";

const ProviderTabs = ({ provider, refreshProvider }) => {
    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <Paper elevation={0} sx={{ border: "1px solid #E5E7EB", borderRadius: 2, overflow: "hidden" }} >
            <Tabs value={tabValue} onChange={handleTabChange} variant="scrollable" scrollButtons="auto" >
                <Tab label="Overview" />
                <Tab label="Availability" />
                <Tab label="Specialties" />
                <Tab label="Documents" />
            </Tabs>

            <Box sx={{ p: 3 }}>
                {tabValue === 0 && <ProviderOverviewTab provider={provider} />}
                
                {tabValue === 1 && (
                    <ProviderAvailabilityTab provider={provider} refreshProvider={refreshProvider} />
                )}

                {tabValue === 2 && (
                    <ProviderSpecialtiesTab provider={provider} refreshProvider={refreshProvider} />
                )}

                {tabValue === 3 && (
                    <ProviderDocumentsTab provider={provider} refreshProvider={refreshProvider} />
                )}
            </Box>
        </Paper>
    );
};

export default ProviderTabs;
