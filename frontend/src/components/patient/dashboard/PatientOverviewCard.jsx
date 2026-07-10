import { Paper, Typography, Grid, Stack, Card, CardContent, Chip, Divider } from "@mui/material";

import { calculateAge } from "../../../utils/helpers";
import { formatDate } from "../../../utils/helpers";

const PatientOverviewCard = ({ patient }) => {

    const homeAddress = patient?.addresses?.find( (item) => item.address_type === "Home" ) || patient?.addresses?.[0];
    const emergencyContact = patient?.contact?.find( (item) => item.is_emergency_contact ) || patient?.contact?.[0];

    return (
        <Stack spacing={3}>
            {/* Personal Information */}
            <Paper elevation={0} sx={{ p: 3, border: "1px solid #E5E7EB", borderRadius: 1 }} >
                <Typography variant="h6" sx={{ fontWeight: 600 }}> Personal Information </Typography>
                <Divider sx={{ my: 2 }} />

                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography color="text.secondary" sx={{ fontWeight: 600 }}> First Name </Typography>
                        <Typography>{patient?.first_name}</Typography>
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography color="text.secondary" sx={{ fontWeight: 600 }}> Middle Name </Typography>
                        <Typography> {patient?.middle_name || "--"} </Typography>
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography color="text.secondary" sx={{ fontWeight: 600 }}> Last Name </Typography>
                        <Typography>{patient?.last_name}</Typography>
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography color="text.secondary" sx={{ fontWeight: 600 }}> Date of Birth </Typography>
                        <Typography> {formatDate(patient?.dob)} ( {calculateAge(patient?.dob)} ) </Typography>
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography color="text.secondary" sx={{ fontWeight: 600 }}> Marital Status </Typography>
                        <Typography> {patient?.marital_status} </Typography>
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography color="text.secondary" sx={{ fontWeight: 600 }}> Phone </Typography>
                        <Typography>{patient?.phone}</Typography>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography color="text.secondary" sx={{ fontWeight: 600 }}> Email </Typography>
                        <Typography> {patient?.email || "--"} </Typography>
                    </Grid>
                </Grid>
            </Paper>

            {/* Registration */}
            <Paper elevation={0} sx={{ p: 3, border: "1px solid #E5E7EB", borderRadius: 1 }} >
                <Typography variant="h6" sx={{ fontWeight: 600 }}> Registration Information </Typography>
                <Divider sx={{ my: 2 }} />

                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography color="text.secondary" sx={{ fontWeight: 600 }}> MRN </Typography>
                        <Typography> {patient?.patient_mrn} </Typography>
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography color="text.secondary" sx={{ fontWeight: 600 }}> UUID </Typography>
                        <Typography> {patient?.uuid} </Typography>
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography color="text.secondary" sx={{ fontWeight: 600 }}> Registered On </Typography>
                        <Typography> {formatDate(patient?.created_at)} </Typography>
                    </Grid>
                </Grid>
            </Paper>

            {/* Primary Address */}
            <Paper elevation={0} sx={{ p: 3, border: "1px solid #E5E7EB", borderRadius: 1 }} >
                <Typography variant="h6" sx={{ fontWeight: 600 }}> Primary Address </Typography>
                <Divider sx={{ my: 2 }} />

                {homeAddress ? (
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12 }}>
                            <Typography color="text.secondary" sx={{ fontWeight: 600 }}> Address </Typography>
                            <Typography> {homeAddress.address_line_1} </Typography>
                            <Typography> {homeAddress.address_line_2} </Typography>
                        </Grid>

                        <Grid size={{ xs: 12, md: 3 }}>
                            <Typography color="text.secondary" sx={{ fontWeight: 600 }}> City </Typography>
                            <Typography> {homeAddress.city} </Typography>
                        </Grid>

                        <Grid size={{ xs: 12, md: 3 }}>
                            <Typography color="text.secondary" sx={{ fontWeight: 600 }}> State </Typography>
                            <Typography> {homeAddress.state} </Typography>
                        </Grid>

                        <Grid size={{ xs: 12, md: 3 }}>
                            <Typography color="text.secondary" sx={{ fontWeight: 600 }}> Country </Typography>
                            <Typography> {homeAddress.country} </Typography>
                        </Grid>

                        <Grid size={{ xs: 12, md: 3 }}>
                            <Typography color="text.secondary" sx={{ fontWeight: 600 }}> Postal Code </Typography>
                            <Typography> {homeAddress.postal_code} </Typography>
                        </Grid>
                    </Grid>
                ) : (
                    <Typography color="text.secondary" sx={{ fontStyle:"italic", textAlign:"center" }}> No Address Available </Typography>
                )}
            </Paper>

            {/* Emergency Contact */}
            <Paper elevation={0} sx={{ p: 3, border: "1px solid #E5E7EB", borderRadius: 1 }} >
                <Typography variant="h6" sx={{ fontWeight: 600 }}> Emergency Contact </Typography>
                <Divider sx={{ my: 2 }} />

                {emergencyContact ? (
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, md: 3 }}>
                            <Typography color="text.secondary" sx={{ fontWeight: 600 }}> Name </Typography>
                            <Typography> {emergencyContact.name} </Typography>
                        </Grid>

                        <Grid size={{ xs: 12, md: 3 }}>
                            <Typography color="text.secondary" sx={{ fontWeight: 600 }}> Relation </Typography>
                            <Typography> {emergencyContact.relation} </Typography>
                        </Grid>

                        <Grid size={{ xs: 12, md: 3 }}>
                            <Typography color="text.secondary" sx={{ fontWeight: 600 }}> Phone </Typography>
                            <Typography> {emergencyContact.phone} </Typography>
                        </Grid>

                        <Grid size={{ xs: 12, md: 3 }}>
                            <Typography color="text.secondary" sx={{ fontWeight: 600 }}> Email </Typography>
                            <Typography> {emergencyContact.email || "--"} </Typography>
                        </Grid>
                    </Grid>
                ) : (
                    <Typography color="text.secondary" sx={{ fontStyle:"italic", textAlign:"center" }}> No Emergency Contact Available </Typography>
                )}
            </Paper>
        </Stack>
    );
};

export default PatientOverviewCard;