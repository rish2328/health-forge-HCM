import { Avatar, Box, Chip, Paper, Stack, Typography } from "@mui/material";
import { calculateAge } from "../../../utils/helpers"

const PatientHeader = ({ patient }) => {

    console.log('check-PatientHeader-patient', patient)

    return (
        <Paper elevation={0} sx={{ p: 3, borderRadius: 1, border: "1px solid #E5E7EB" }} >
            <Stack direction="row" spacing={3} alignItems="center">
                <Avatar sx={{ width: 80, height: 80, fontSize: 32 }} > {patient?.first_name?.charAt(0)?.toUpperCase()} </Avatar>
                
                <Box sx={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                    <Stack sx={{ flexDirection:"column" }}>
                        <Typography variant="h5">{patient ? `${patient.first_name} ${patient.middle_name || ""} ${patient.last_name}` : "Loading..."}</Typography>
                        <Typography color="text.secondary" mt={2}> {patient?.patient_mrn} </Typography>
                    </Stack>

                    <Stack direction="row" spacing={1} mt={1}>
                        <Chip label={patient?.gender || "--"} color="primary" />
                        <Chip label={patient?.blood_group || "--"} color="error" />
                        <Chip label={calculateAge(patient?.dob)} />
                        <Chip label="Active" color="success" />
                    </Stack>
                </Box>

            </Stack>
        </Paper>
    );
};

export default PatientHeader;