import { Button, Divider, Grid, MenuItem, Paper, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getDepartments, getRoles, createProvider, getProviderByUUID, updateProvider } from "../../api/providerApi";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import providerValidation from "../../validation/providerValidation";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const ProviderForm = ({ mode = "add", uuid = null }) => {
    const navigate = useNavigate();

    const [departments, setDepartments] = useState([]);
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(false);


    const loadDropdowns = async () => {
        try {
            setLoading(true);
            const [departmentResponse, roleResponse] = await Promise.all([ getDepartments(), getRoles() ]);
            setDepartments(departmentResponse?.data?.data ?? []);
            setRoles(roleResponse?.data?.data ?? []);
        } 
        catch (error) {
            setDepartments([]);
            setRoles([]);
        } 
        finally {
            setLoading(false);
        }
    };

    const defaultValues = {
        title: "",
        first_name: "",
        middle_name: "",
        last_name: "",
        gender: "",
        dob: "",
        email: "",
        phone: "",
        department_uuid: "",
        role_name: "",
        designation: "",
        employment_type: "",
        consultation_fee: "",
        followup_fee: "",
        emergency_fee: "",
        license_number: "",
        registration_number: "",
        remarks: "",
    }

    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(providerValidation),
        defaultValues
    });

    const handleReset = () => {
        reset(defaultValues);
    };

    const onSubmit = async (data) => {
        try {
            const payload = {
                    ...data,
                    dob: data.dob
                        ? new Date(data.dob).toISOString().split("T")[0]
                        : null,
                };

            if (mode === "edit") {
                const response = await updateProvider(uuid, payload);
                toast.success(response.data.message);
            }
            else {
                const response = await createProvider(payload);
                toast.success(response.data.message);

                reset(defaultValues);
            }
            navigate("/providers");
        }
        catch (error) {
            toast.error( error?.response?.data?.message || "Failed to create provider." );
        }
    };

    const loadProvider = async () => {
        try {
            const response = await getProviderByUUID(uuid);
            reset(response.data.data);
        } 
        catch (error) {
            toast.error( error?.response?.data?.message || "Failed to load provider." );
        }
    };

    useEffect(() => {
        loadDropdowns();

        if (mode === "edit" && uuid) {
            loadProvider();
        }
    }, []);

    return (
        <Paper elevation={0} sx={{ p: 4, borderRadius: 1, border: "1px solid #E5E7EB" }} >
            <form onSubmit={handleSubmit( onSubmit, (errors) => { console.log('check-errors', errors); } )} >
                {/* ==========================================
                            PERSONAL INFORMATION
                ========================================== */}
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, pb: 1, borderBottom: "1px solid #E5E7EB", }} > Personal Information </Typography>
                <Grid container spacing={3}>
                    {/* Title */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Controller name="title" control={control}
                            render={({ field }) => (
                                <TextField {...field} select fullWidth label="Title" error={!!errors.title} helperText={errors.title?.message} >
                                    <MenuItem value="Dr">Dr.</MenuItem>
                                    <MenuItem value="Prof">Prof.</MenuItem>
                                    <MenuItem value="Mr">Mr</MenuItem>
                                    <MenuItem value="Mrs">Mrs</MenuItem>
                                    <MenuItem value="Ms">Ms</MenuItem>
                                    <MenuItem value="Miss">Miss</MenuItem>
                                </TextField>
                            )}
                        />
                    </Grid>

                    {/* Empty Grid for Alignment */}
                    <Grid size={{ xs: 12, md: 8 }} />

                    {/* First Name */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Controller name="first_name" control={control}
                            render={({ field }) => (
                                <TextField {...field} fullWidth label="First Name" error={!!errors.first_name} helperText={errors.first_name?.message} />
                            )}
                        />
                    </Grid>

                    {/* Middle Name */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Controller name="middle_name" control={control}
                            render={({ field }) => (
                                <TextField {...field} fullWidth label="Middle Name" />
                            )}
                        />
                    </Grid>

                    {/* Last Name */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Controller name="last_name" control={control}
                            render={({ field }) => (
                                <TextField {...field} fullWidth label="Last Name" error={!!errors.last_name} helperText={errors.last_name?.message} />
                            )}
                        />
                    </Grid>

                    {/* Gender */}
                    <Grid size={{ xs: 12, md: 3 }}>
                        <Controller name="gender" control={control}
                            render={({ field }) => (
                                <TextField {...field} select fullWidth label="Gender" error={!!errors.gender} helperText={errors.gender?.message} >
                                    <MenuItem value="Male">Male</MenuItem>
                                    <MenuItem value="Female">Female</MenuItem>
                                    <MenuItem value="Other">Other</MenuItem>
                                </TextField>
                            )}
                        />
                    </Grid>

                    {/* DOB */}
                    <Grid size={{ xs: 12, md: 3 }}>
                        <Controller name="dob" control={control}
                            render={({ field }) => (
                                <TextField {...field} fullWidth type="date" label="Date of Birth" InputLabelProps={{ shrink: true }} error={!!errors.dob} helperText={errors.dob?.message} />
                            )}
                        />
                    </Grid>

                    {/* Email */}
                    <Grid size={{ xs: 12, md: 3 }}>
                        <Controller name="email" control={control}
                            render={({ field }) => (
                                <TextField {...field} fullWidth label="Email" error={!!errors.email} helperText={errors.email?.message} />
                            )}
                        />
                    </Grid>

                    {/* Phone */}
                    <Grid size={{ xs: 12, md: 3 }}>
                        <Controller name="phone" control={control}
                            render={({ field }) => (
                                <TextField {...field} fullWidth label="Phone" error={!!errors.phone} helperText={errors.phone?.message} />
                            )}
                        />
                    </Grid>
                </Grid>
                <Divider sx={{ my: 4 }} />

                {/* ==========================================
                        PROFESSIONAL INFORMATION
                ========================================== */}
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, pb: 1, borderBottom: "1px solid #E5E7EB", }} > Professional Information </Typography>
                <Grid container spacing={3}>
                    {/* Department */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Controller name="department_uuid" control={control} 
                            render={({ field }) => (
                                <TextField {...field} select fullWidth label="Department" error={!!errors.department_uuid} helperText={errors.department_uuid?.message} >
                                    <MenuItem value=""><em>Select Department</em></MenuItem>
                                    {departments.map((department) => (
                                        <MenuItem key={department.uuid} value={department.uuid} > {department.name} ( {department.code} ) </MenuItem>
                                    ))}
                                </TextField>
                            )}
                        />
                    </Grid>

                    {/* Designation */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Controller name="designation" control={control}
                            render={({ field }) => (
                                <TextField {...field} fullWidth label="Designation" error={!!errors.designation} helperText={errors.designation?.message} />
                            )}
                        />
                    </Grid>

                    {/* Employment Type */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Controller name="employment_type" control={control}
                            render={({ field }) => (
                                <TextField {...field} select fullWidth label="Employment Type" error={!!errors.employment_type} helperText={errors.employment_type?.message} >
                                    <MenuItem value="Full-Time">Full-Time</MenuItem>
                                    <MenuItem value="Part-Time">Part-Time</MenuItem>
                                    <MenuItem value="Visiting">Visiting</MenuItem>
                                    <MenuItem value="Contract">Contract</MenuItem>
                                    <MenuItem value="Locum">Locum</MenuItem>
                                    <MenuItem value="Resident">Resident</MenuItem>
                                    <MenuItem value="Consultant">Consultant</MenuItem>
                                </TextField>
                            )}
                        />
                    </Grid>

                    {/* License Number */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Controller name="license_number" control={control}
                            render={({ field }) => (
                                <TextField {...field} fullWidth label="License Number" error={!!errors.license_number} helperText={errors.license_number?.message} />
                            )}
                        />
                    </Grid>

                    {/* Registration Number */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Controller name="registration_number" control={control}
                            render={({ field }) => (
                                <TextField {...field} fullWidth label="Registration Number" error={!!errors.registration_number} helperText={errors.registration_number?.message} />
                            )}
                        />
                    </Grid>
                </Grid>
                <Divider sx={{ my: 4 }} />

                {/* ==========================================
                        CONSULTATION CHARGES
                ========================================== */}
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, pb: 1, borderBottom: "1px solid #E5E7EB", }} > Consultation Charges </Typography>
                <Grid container spacing={3}>
                    {/* Consultation Fee */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Controller name="consultation_fee" control={control}
                            render={({ field }) => (
                                <TextField {...field} fullWidth type="text" label="Consultation Fee" error={!!errors.consultation_fee} helperText={errors.consultation_fee?.message} />
                            )}
                        />
                    </Grid>

                    {/* Follow-up Fee */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Controller name="followup_fee" control={control}
                            render={({ field }) => (
                                <TextField {...field} fullWidth type="text" label="Follow-up Fee" error={!!errors.followup_fee} helperText={errors.followup_fee?.message} />
                            )}
                        />
                    </Grid>

                    {/* Emergency Fee */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Controller name="emergency_fee" control={control}
                            render={({ field }) => (
                                <TextField {...field} fullWidth type="text" label="Emergency Fee" error={!!errors.emergency_fee} helperText={errors.emergency_fee?.message} />
                            )}
                        />
                    </Grid>
                </Grid>
                <Divider sx={{ my: 4 }} />

                {/* ==========================================
                        OTHER INFORMATION
                ========================================== */}
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, pb: 1, borderBottom: "1px solid #E5E7EB" }} > Other Information </Typography>
                <Grid container spacing={3}>
                    {/* Roles List */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Controller name="role_name" control={control}
                            render={({ field }) => (
                                <TextField {...field} select fullWidth label="Role" error={!!errors.role_name} helperText={errors.role_name?.message} >
                                    <MenuItem value=""><em>Select Role</em></MenuItem>
                                    {roles.map((role) => (
                                        <MenuItem key={role.uuid} value={role.name} > {role.display_name} </MenuItem>
                                    ))}
                                </TextField>
                            )}
                        />
                    </Grid>

                    {/* Empty Grid for Alignment */}
                    <Grid size={{ xs: 12, md: 8 }} />

                    {/* Remarks */}
                    <Grid size={12}>
                        <Controller name="remarks" control={control}
                            render={({ field }) => (
                                <TextField {...field} fullWidth multiline rows={4} label="Remarks" error={!!errors.remarks} helperText={errors.remarks?.message} />
                            )}
                        />
                    </Grid>
                </Grid>
                <Divider sx={{ my: 4 }} />

                <Stack direction="row" spacing={2} sx={{justifyContent:"flex-end" }}>
                    <Button variant="outlined" color="inherit" onClick={handleReset}> Reset </Button>
                    <Button type="submit" variant="contained">Save Provider</Button>
                </Stack>
            </form>
        </Paper>
    );
};

export default ProviderForm;
