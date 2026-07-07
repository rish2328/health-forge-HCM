import { Grid, MenuItem, Paper, Switch, FormControlLabel, TextField, Typography } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";


const PatientContactInformation = () => {
    const { control } = useFormContext();

    return (
        <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 3, border: "1px solid #E5E7EB" }} >
            <Typography variant="h6" fontWeight={600} mb={3}> Contact Information </Typography>

            <Grid container spacing={3} sx={{ marginTop:"10px" }}>

                {/* Contact Name */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Controller name="contact.name" control={control} autoComplete="off"
                        render={({ field }) => (
                            <TextField {...field} fullWidth label="Contact Name" required />
                        )}
                    />
                </Grid>

                {/* Relation */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Controller name="contact.relation" control={control} autoComplete="off"
                        render={({ field }) => (
                            <TextField {...field} select fullWidth label="Relation">
                                <MenuItem value="">Select Relation</MenuItem>
                                <MenuItem value="Father">Father</MenuItem>
                                <MenuItem value="Mother">Mother</MenuItem>
                                <MenuItem value="Brother">Brother</MenuItem>
                                <MenuItem value="Sister">Sister</MenuItem>
                                <MenuItem value="Spouse">Spouse</MenuItem>
                                <MenuItem value="Friend">Friend</MenuItem>
                                <MenuItem value="Guardian">Guardian</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </TextField>
                        )}
                    />
                </Grid>

                {/* Contact Phone */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Controller name="contact.phone" control={control} autoComplete="off"
                        render={({ field }) => (
                            <TextField {...field} fullWidth label="Contact Phone" required />
                        )}
                    />
                </Grid>

                {/* Contact Email */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Controller name="contact.email" control={control} autoComplete="off"
                        render={({ field }) => (
                            <TextField {...field} fullWidth label="Contact Email" type="email" />
                        )}
                    />
                </Grid>

                {/* Emergency Contact */}
                <Grid size={{ xs: 12 }}>
                    <Controller name="contact.is_emergency_contact" control={control} autoComplete="off"
                        render={({ field }) => (
                            <FormControlLabel
                                control={
                                    <Switch checked={field.value} onChange={(e) => field.onChange(e.target.checked)} />
                                }
                                label="Emergency Contact"
                            />
                        )}
                    />
                </Grid>
            </Grid>
        </Paper>
    );
};

export default PatientContactInformation;
