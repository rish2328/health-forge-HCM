import { useEffect, useState } from "react";
import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

import AppLayout from "../../layouts/AppLayout";
import PatientHeader from "../../components/patient/PatientHeader";
import PatientFilter from "../../components/patient/PatientFilter";
import PatientTable from "../../components/patient/PatientTable";
import { getPatients } from "../../api/patientApi";



const PatientList = () => {
    const navigate = useNavigate();

    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPatients = async () => {
        try {
            setLoading(true);
            const response = await getPatients();
            console.log(response.data);
            setPatients(response.data.data);
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPatients();
    }, []);

    return (
        <AppLayout>
            <Container maxWidth={false} >
                <PatientHeader onAdd={() => navigate("/patients/add")} />

                <PatientFilter />

                <PatientTable patients={patients} loading={loading} />
            </Container>
        </AppLayout>
    );
};

export default PatientList;
