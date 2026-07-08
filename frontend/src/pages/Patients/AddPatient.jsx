import { Container, Paper, Button, Stack, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { createPatient, createPatientContact, createPatientAddress } from "../../api/patientApi";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";

import AppLayout from "../../layouts/AppLayout";
import PatientInformation from "../../components/patient/PatientInformation";
import PatientContactInformation from "../../components/patient/PatientContactInformation";
import PatientAddressInformation from "../../components/patient/PatientAddressInformation";
import { patientSchema } from "../../validation/patientValidation";


const AddPatient = () => {
    const navigate = useNavigate();

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

            // contact: {
            //     name: "",
            //     relation: "",
            //     phone: "",
            //     email: "",
            //     is_emergency_contact: false,
            // },

            // address: {
            //     address_line_1: "",
            //     address_line_2: "",
            //     city: "",
            //     state: "",
            //     country: "",
            //     postal_code: "",
            //     address_type: "",
            // },
        },
    });

    const { reset } = methods;

    const onSubmit = async (data) => {
        try {
            // Patient Payload
            const patientPayload = {
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
            // Patient API Calling
            await createPatient(patientPayload);

            // Extract Patient UUID From Patient Response
            // const patientUUID = patientResponse.data.data.uuid;

            // if( patientUUID ) {
            //     // Contact Payload
            //     const contactPayload = {
            //         patient_uuid: patientUUID,

            //         name: data.contact.name,
            //         relation: data.contact.relation,
            //         phone: data.contact.phone,
            //         email: data.contact.email,
            //         is_emergency_contact: data.contact.is_emergency_contact,
            //     };
            //     // Contact API Calling
            //     await createPatientContact(contactPayload);

            //     // Address Payload
            //     const addressPayload = {
            //         patient_uuid: patientUUID,

            //         address_line_1: data.address.address_line_1,
            //         address_line_2: data.address.address_line_2,

            //         city: data.address.city,
            //         state: data.address.state,
            //         country: data.address.country,

            //         postal_code: data.address.postal_code,
            //         address_type: data.address.address_type,
            //     };
            //     // Address API Calling
            //     await createPatientAddress(addressPayload);
            //     console.log("Patient created successfully");
            // }

            toast.success("Patient created successfully.");
            reset();

            setTimeout(() => {
                navigate("/patients");
            }, 900);
        }
        catch (error) {
            toast.error( error?.response?.data?.message || "Failed to create patient." );
        }
    };

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
                        {/* <PatientContactInformation /> */}
                        {/* <PatientAddressInformation /> */}

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
