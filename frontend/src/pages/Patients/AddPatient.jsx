import { Container, Paper, Button, Stack, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import AppLayout from "../../layouts/AppLayout";
import PatientInformation from "../../components/patient/PatientInformation";
import PatientContactInformation from "../../components/patient/PatientContactInformation";
import PatientAddressInformation from "../../components/patient/PatientAddressInformation";

const AddPatient = () => {
    const navigate = useNavigate();

    const methods = useForm({
        defaultValues: {
            first_name: "",
            middle_name: "",
            last_name: "",

            gender: "",
            dob: "",
            blood_group: "",
            marital_status: "",

            email: "",
            phone: "",

            contact: {
                name: "",
                relation: "",
                phone: "",
                email: "",
                is_emergency_contact: false,
            },

            address: {
                address_line_1: "",
                address_line_2: "",
                city: "",
                state: "",
                country: "",
                postal_code: "",
                address_type: "",
            },
        },
    });

    const { reset } = methods;

    const onSubmit = (data) => {
        console.log(data);
    };

    const onAdd =() => {
        navigate("/patients")
    }

    return (
        <AppLayout>
            <Container maxWidth={false}>
                <Stack direction="row" sx={{ mb: 3, justifyContent:"space-between", alignItems:"center" }} >
                    <div>
                        <Typography variant="h4">Add Patient</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}> Register a new patient into the System. </Typography>
                    </div>

                    <Button variant="contained" startIcon={<ArrowBackIcon />} onClick={() => navigate("/patients")} sx={{ minWidth: 120, height: 46, borderRadius: 1, boxShadow: 2 }} > Back </Button>
                </Stack>

                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <PatientInformation />
                        <PatientContactInformation />
                        <PatientAddressInformation />

                        <Paper elevation={0} sx={{ p: 3, mt: 3, borderRadius: 3, border: "1px solid #E5E7EB" }} >
                            <Stack direction="row" spacing={2} sx={{ justifyContent:"flex-end"}} >
                                <Button variant="outlined" onClick={() => reset()} > Reset </Button>
                                <Button variant="contained" type="submit"> Save Patient </Button>
                            </Stack>
                        </Paper>
                    </form>
                </FormProvider>
            </Container>
        </AppLayout>
    );
};

export default AddPatient;
