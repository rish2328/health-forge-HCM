import { Grid, Paper, Typography, Divider } from "@mui/material";

const PatientOverviewCard = () => {
    return (
        <Paper elevation={0} sx={{ mt: 3, p: 3, borderRadius: 1, border: "1px solid #E5E7EB" }} >
        <Typography variant="h6" fontWeight={600} mb={3}> Overview </Typography>

        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 3 }}>
            <Typography color="text.secondary">First Name</Typography>

            <Typography fontWeight={600}>--</Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
            <Typography color="text.secondary">Last Name</Typography>

            <Typography fontWeight={600}>--</Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
            <Typography color="text.secondary">Gender</Typography>

            <Typography fontWeight={600}>--</Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
            <Typography color="text.secondary">Date of Birth</Typography>

            <Typography fontWeight={600}>--</Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
            <Typography color="text.secondary">Blood Group</Typography>

            <Typography fontWeight={600}>--</Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
            <Typography color="text.secondary">Marital Status</Typography>

            <Typography fontWeight={600}>--</Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
            <Typography color="text.secondary">Email</Typography>

            <Typography fontWeight={600}>--</Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
            <Typography color="text.secondary">Phone</Typography>

            <Typography fontWeight={600}>--</Typography>
            </Grid>
        </Grid>
        </Paper>
    );
};

export default PatientOverviewCard;
