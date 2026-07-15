import { Button, Divider, Grid, MenuItem, Paper, Stack, TextField, Typography } from "@mui/material";


const ProviderForm = () => {
    return (
        <Paper elevation={0} sx={{ p: 4, borderRadius: 1, border: "1px solid #E5E7EB" }} >
            <Grid container spacing={3}>
                {/* Basic Information */}

                <Grid size={12}>
                    <Typography variant="h6" sx={{fontWeight:600}}> Basic Information </Typography>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <TextField fullWidth label="First Name" />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <TextField fullWidth label="Middle Name" />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <TextField fullWidth label="Last Name" />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <TextField select fullWidth label="Gender">
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                    </TextField>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <TextField fullWidth type="date" label="Date of Birth" InputLabelProps={{ shrink: true }} />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <TextField fullWidth label="Profile Image" />
                </Grid>

                {/* Professional */}
                <Grid size={12}>
                    <Divider sx={{ my: 1 }} />
                    <Typography variant="h6" sx={{fontWeight:600}}> Professional Information </Typography>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <TextField select fullWidth label="Department">
                        <MenuItem value="">Select Department</MenuItem>
                    </TextField>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <TextField fullWidth label="Specialization" />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <TextField fullWidth label="Qualification" />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <TextField fullWidth label="License Number" />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <TextField fullWidth label="Experience (Years)" />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <TextField fullWidth label="Consultation Fee" />
                </Grid>

                {/* Contact */}

                <Grid size={12}>
                    <Divider sx={{ my: 1 }} />
                    <Typography variant="h6" sx={{fontWeight:600}}> Contact Information </Typography>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <TextField fullWidth label="Email" />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <TextField fullWidth label="Phone" />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <TextField fullWidth label="Alternate Phone" />
                </Grid>

                <Grid size={12}>
                    <TextField fullWidth multiline rows={3} label="Address" />
                </Grid>

                {/* Employment */}

                <Grid size={12}>
                    <Divider sx={{ my: 1 }} />
                    <Typography variant="h6" sx={{fontWeight:600}}> Employment Information </Typography>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <TextField type="date" fullWidth label="Joining Date" InputLabelProps={{ shrink: true }} />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <TextField select fullWidth label="Employment Type">
                        <MenuItem value="Full Time">Full Time</MenuItem>
                        <MenuItem value="Part Time">Part Time</MenuItem>
                        <MenuItem value="Visiting">Visiting</MenuItem>
                    </TextField>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <TextField select fullWidth label="Status">
                        <MenuItem value="Active">Active</MenuItem>
                        <MenuItem value="Inactive">Inactive</MenuItem>
                    </TextField>
                </Grid>
            </Grid>

            <Divider sx={{ my: 4 }} />

            <Stack direction="row" spacing={2} sx={{ justifyContent:"flex-end" }}>
                <Button variant="outlined">Reset</Button>
                <Button variant="contained">Save Provider</Button>
            </Stack>
        </Paper>
    );
};

export default ProviderForm;
