import { useEffect, useState } from "react";
import AppLayout from "../../layouts/AppLayout";
import { getPatientByUUID } from "../../api/patientApi";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import PatientHeader from "../../components/patient/dashboard/PatientHeader";
import PatientContactTab from "../../components/patient/dashboard/PatientContactCard";
import PatientAddressTab from "../../components/patient/dashboard/PatientAddressCard";
import PatientOverviewCard from "../../components/patient/dashboard/PatientOverviewCard";
import { Avatar, Box, Button, Chip, Container, Paper, Stack, Typography, Tabs, Tab } from "@mui/material";



const PatientDashboard = () => {
    const navigate = useNavigate();

    const [tab, setTab] = useState(0);
    const [patient, setPatient] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleTabChange = (event, newValue) => {
        setTab(newValue);
    };

    const { uuid } = useParams();

    const fetchPatient = async () => {
        try {
            setLoading(true);
            const response = await getPatientByUUID(uuid);
            
            setPatient(response.data.data);
        } catch (error) {
            console.error(error);

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPatient();
    }, [uuid]);



    return (
        <AppLayout>
            <Container maxWidth={false}>
                {/* Top Header */}
                <Stack direction="row" alignItems="center" sx={{ mb: 3, justifyContent:"end" }} >
                    <Button variant="contained" startIcon={<ArrowBackIcon />} onClick={() => navigate("/patients")} > Back </Button>
                    {/* <Button variant="contained" color="warning" startIcon={<EditOutlinedIcon />} onClick={() => navigate(`/patients/edit/${uuid}`)} > Edit Patient </Button> */}
                </Stack>

                {/* Patient Summary */}
                <PatientHeader patient={patient} />

                <Paper elevation={0} sx={{ mt: 3, borderRadius: 1, border: "1px solid #E5E7EB" }} >
                    <Tabs value={tab} onChange={handleTabChange} variant="scrollable" scrollButtons="auto" >
                        <Tab label="Addresses" />
                        <Tab label="Contacts" />
                        <Tab label="Insurance" />
                        <Tab label="Documents" />
                        <Tab label="Vitals" />
                        <Tab label="Notes" />
                    </Tabs>

                    <Box sx={{ p: 3 }}>
                        {tab === 0 && ( <PatientAddressTab patient={patient} setPatient={setPatient} /> )}
                        {tab === 1 && ( <PatientContactTab patient={patient} setPatient={setPatient} /> )}
                        {tab === 2 && ( <div>Insurance Tab</div> )}
                        {tab === 3 && ( <div>Documents Tab</div> )}
                        {tab === 4 && ( <div>Vitals Tab</div> )}
                        {tab === 5 && ( <div>Notes Tab</div> )}
                    </Box>
                </Paper>















            </Container>
        </AppLayout>
    );
};

export default PatientDashboard;
