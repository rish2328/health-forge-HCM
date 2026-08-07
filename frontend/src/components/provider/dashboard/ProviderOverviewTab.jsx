import { Divider, Grid, Paper, Typography } from "@mui/material";

const InfoItem = ({ label, value }) => (
    <Grid size={{ xs: 12, md: 4 }}>
        <Typography variant="body2" color="text.secondary"> {label} </Typography>

        <Typography variant="body1" fontWeight={600} sx={{ mt: 0.5 }}> {value || "-"} </Typography>
    </Grid>
);

const Section = ({ title, children }) => (
    <Paper elevation={0} sx={{ p: 3, mb: 3, border: "1px solid #E5E7EB", borderRadius: 2 }} >
        <Typography variant="h6" fontWeight={600} mb={3}> {title} </Typography>

        <Grid container spacing={3}> {children} </Grid>
    </Paper>
);

const ProviderOverviewTab = ({ provider }) => {
    console.log('check-ProviderOverviewTab', provider);
    return (
        <>
            {/* =======================================================
                    BASIC INFORMATION
            ======================================================= */}
            <Section title="Basic Information">
                <InfoItem label="Provider Code" value={provider?.provider_code} />
                <InfoItem label="Title" value={provider?.title} />
                <InfoItem label="Gender" value={provider?.gender} />
                <InfoItem label="Date of Birth" value={provider?.dob} />
                <InfoItem label="Email" value={provider?.email} />
                <InfoItem label="Phone" value={provider?.phone} />
            </Section>

            {/* =======================================================
                    PROFESSIONAL INFORMATION
            ======================================================= */}
            <Section title="Professional Information">
                <InfoItem label="Department" value={provider?.department_name} />
                <InfoItem label="Role" value={provider?.role_display_name} />
                <InfoItem label="Designation" value={provider?.designation} />
                <InfoItem label="Employment Type" value={provider?.employment_type} />
                <InfoItem label="License Number" value={provider?.license_number} />
                <InfoItem label="Registration Number" value={provider?.registration_number} />
            </Section>

            {/* =======================================================
                    CONSULTATION FEES
            ======================================================= */}
            <Section title="Consultation Fees">
                <InfoItem label="Consultation Fee" value={`₹ ${provider?.consultation_fee || 0}`} />
                <InfoItem label="Follow-up Fee" value={`₹ ${provider?.followup_fee || 0}`} />
                <InfoItem label="Emergency Fee" value={`₹ ${provider?.emergency_fee || 0}`} />
            </Section>

            {/* =======================================================
                    REMARKS
            ======================================================= */}
            <Paper elevation={0} sx={{ p: 3, border: "1px solid #E5E7EB", borderRadius: 2 }} >
                <Typography variant="h6" fontWeight={600} mb={2}> Remarks </Typography>

                <Divider sx={{ mb: 2 }} />

                <Typography>{provider?.remarks || "-"}</Typography>
            </Paper>
        </>
    );
};

export default ProviderOverviewTab;
