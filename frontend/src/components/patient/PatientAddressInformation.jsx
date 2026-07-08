import { Grid, MenuItem, Paper, TextField, Typography } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

const PatientAddressInformation = () => {
    const { control } = useFormContext();

    return (
        <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 3, border: "1px solid #E5E7EB" }} >
            <Typography variant="h6" fontWeight={600} mb={3}> Address Information </Typography>

            <Grid container spacing={3} sx={{ marginTop:"10px" }}>

                {/* Address Line 1 */}
                <Grid size={{ xs: 12 }}>
                    <Controller name="address.address_line_1" control={control} autoComplete="off"
                        render={({ field, fieldState }) => (
                            <TextField {...field} fullWidth label="Address Line 1" error={!!fieldState.error} helperText={fieldState.error?.message} />
                        )}
                    />
                </Grid>

                {/* Address Line 2 */}
                <Grid size={{ xs: 12 }}>
                    <Controller name="address.address_line_2" control={control} autoComplete="off"
                        render={({ field }) => (
                            <TextField {...field} fullWidth label="Address Line 2" />
                        )}
                    />
                </Grid>

                {/* City */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Controller name="address.city" control={control} autoComplete="off"
                        render={({ field, fieldState }) => (
                            <TextField {...field} fullWidth label="City" error={!!fieldState.error} helperText={fieldState.error?.message} />
                        )}
                    />
                </Grid>

                {/* State */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Controller name="address.state" control={control} autoComplete="off"
                        render={({ field, fieldState }) => (
                            <TextField {...field} fullWidth label="State" error={!!fieldState.error} helperText={fieldState.error?.message} />
                        )}
                    />
                </Grid>

                {/* Country */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Controller name="address.country" control={control} autoComplete="off"
                        render={({ field, fieldState }) => (
                            <TextField {...field} fullWidth label="Country" error={!!fieldState.error} helperText={fieldState.error?.message} />
                        )}
                    />
                </Grid>

                {/* Postal Code */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Controller name="address.postal_code" control={control} autoComplete="off"
                        render={({ field, fieldState }) => (
                            <TextField {...field} fullWidth label="Postal Code" error={!!fieldState.error} helperText={fieldState.error?.message} />
                        )}
                    />
                </Grid>

                {/* Address Type */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Controller name="address.address_type" control={control} autoComplete="off"
                        render={({ field, fieldState }) => (
                            <TextField {...field} select fullWidth label="Address Type" error={!!fieldState.error} helperText={fieldState.error?.message}>
                                <MenuItem value="">Select Address Type</MenuItem>
                                <MenuItem value="Home">Home</MenuItem>
                                <MenuItem value="Work">Work</MenuItem>
                                <MenuItem value="Permanent">Permanent</MenuItem>
                                <MenuItem value="Temporary">Temporary</MenuItem>
                            </TextField>
                        )}
                    />
                </Grid>
            </Grid>
        </Paper>
    );
};

export default PatientAddressInformation;
