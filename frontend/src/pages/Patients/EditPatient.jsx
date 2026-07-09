import { useEffect } from "react";
import { Container, Paper, Button, Stack, Typography } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { toast } from "react-toastify";


import AppLayout from "../../layouts/AppLayout";
import PatientInformation from "../../components/patient/PatientInformation";
import { getPatientByUUID } from "../../api/patientApi";
import { patientSchema } from "../../validation/patientValidation";
import { updatePatient } from "../../api/patientApi"; 



const EditPatient = () => {

    const navigate = useNavigate();
    const { uuid } = useParams();

    const methods = useForm({
        resolver: yupResolver(patientSchema),

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
        },
    });

    const { reset } = methods;

    const fetchPatient = async () => {
        try {
            const response = await getPatientByUUID(uuid);
            const patient = response.data.data;
            reset({
                first_name: patient.first_name || "",
                middle_name: patient.middle_name || "",
                last_name: patient.last_name || "",
                gender: patient.gender || "",
                dob: patient.dob || "",
                blood_group: patient.blood_group || "",
                marital_status: patient.marital_status || "",
                email: patient.email || "",
                phone: patient.phone || "",
            });
        }
        catch (error) {
            console.error(error);
        }
    };

    const onSubmit = async (data) => {
        try {
            const payload = {
                first_name: data.first_name,
                middle_name: data.middle_name || null,
                last_name: data.last_name,

                gender: data.gender,
                dob: data.dob,

                blood_group: data.blood_group,
                marital_status: data.marital_status,

                email: data.email,
                phone: data.phone,
            };

            await updatePatient(uuid, payload);
            toast.success("Patient updated successfully.");

            setTimeout(() => {
                navigate("/patients");
            }, 800);
        }
        catch (error) {
            toast.error( error?.response?.data?.message || "Failed to update patient." );
        }
    };

    useEffect(() => {
        fetchPatient();
    }, []);

    return (
        <AppLayout>
            <Container maxWidth={false}>
                <Stack direction="row" sx={{ mb: 3, justifyContent:"space-between", alignItems:"center" }} >
                    <div>
                        <Typography variant="h4">Edit Patient</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}> Update patient information. </Typography>
                    </div>

                    <Button variant="contained" startIcon={<ArrowBackIcon />} onClick={() => navigate("/patients")} sx={{ minWidth: 120, height: 46, borderRadius: 1, boxShadow: 2 }} > Back </Button>
                </Stack>

                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <PatientInformation />

                        <Paper elevation={0} sx={{ p: 3, mt: 3, borderRadius: 3, border: "1px solid #E5E7EB" }} >
                            <Stack direction="row" spacing={2} sx={{ justifyContent:"flex-end"}} >
                                <Button variant="outlined" onClick={() => navigate("/patients")} > Discard </Button>
                                <Button variant="contained" type="submit"> Update Patient </Button>
                            </Stack>
                        </Paper>
                    </form>
                </FormProvider>
            </Container>
        </AppLayout>
    );
};

export default EditPatient;