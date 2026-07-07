import { Grid, MenuItem, Paper, TextField, Typography } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

const PatientInformation = () => {
    const { control } = useFormContext();

    return (
        <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 3, border: "1px solid #E5E7EB" }} >
            <Typography variant="h6" fontWeight={600} mb={3}> Personal Information </Typography>

            <Grid container spacing={3} sx={{ marginTop:"10px" }}>
                {/* First Name */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Controller name="first_name" control={control} autoComplete="off"
                        render={({ field }) => (
                            <TextField {...field} label="First Name" fullWidth required />
                        )}
                    />
                </Grid>

                {/* Middle Name */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Controller name="middle_name" control={control} autoComplete="off"
                        render={({ field }) => (
                            <TextField {...field} label="Middle Name" fullWidth />
                        )}
                    />
                </Grid>

                {/* Last Name */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Controller name="last_name" control={control} autoComplete="off"
                        render={({ field }) => (
                            <TextField {...field} label="Last Name" fullWidth required />
                        )}
                    />
                </Grid>

                {/* Gender */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Controller name="gender" control={control} autoComplete="off"
                        render={({ field }) => (
                            <TextField {...field} select label="Gender" fullWidth required>
                                <MenuItem value="">Select Gender</MenuItem>
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </TextField>
                        )}
                    />
                </Grid>

                {/* DOB */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Controller name="dob" control={control} autoComplete="off"
                        render={({ field }) => (
                            <TextField
                                {...field}
                                type="date"
                                label="Date of Birth"
                                fullWidth
                                required
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        )}
                    />
                </Grid>

                {/* Blood Group */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Controller name="blood_group" control={control} autoComplete="off"
                        render={({ field }) => (
                            <TextField {...field} select label="Blood Group" fullWidth>
                                <MenuItem value="">Select Blood Group</MenuItem>
                                <MenuItem value="A+">A+</MenuItem>
                                <MenuItem value="A-">A-</MenuItem>
                                <MenuItem value="B+">B+</MenuItem>
                                <MenuItem value="B-">B-</MenuItem>
                                <MenuItem value="AB+">AB+</MenuItem>
                                <MenuItem value="AB-">AB-</MenuItem>
                                <MenuItem value="O+">O+</MenuItem>
                                <MenuItem value="O-">O-</MenuItem>
                            </TextField>
                        )}
                    />
                </Grid>

                {/* Marital Status */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Controller name="marital_status" control={control} autoComplete="off"
                        render={({ field }) => (
                            <TextField {...field} select label="Marital Status" fullWidth>
                                <MenuItem value="">Select Status</MenuItem>
                                <MenuItem value="Single">Single</MenuItem>
                                <MenuItem value="Married">Married</MenuItem>
                                <MenuItem value="Divorced">Divorced</MenuItem>
                                <MenuItem value="Widowed">Widowed</MenuItem>
                            </TextField>
                        )}
                    />
                </Grid>

                {/* Email */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Controller name="email" control={control} autoComplete="off"
                        render={({ field }) => (
                            <TextField {...field} type="email" label="Email" fullWidth />
                        )}
                    />
                </Grid>

                {/* Phone */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Controller name="phone" control={control} autoComplete="off"
                        render={({ field }) => (
                            <TextField {...field} label="Phone" fullWidth />
                        )}
                    />
                </Grid>
            </Grid>
        </Paper>
    );
};

export default PatientInformation;
