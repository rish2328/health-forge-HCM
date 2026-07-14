import { useEffect} from "react";
import { Paper, Typography, Divider, Grid, TextField, MenuItem, Button, Stack } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import departmentValidation from "../../validation/departmentValidation";
import { createDepartment, getDepartmentByUUID, updateDepartment } from "../../api/departmentApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const DepartmentForm = ({ mode = "add", uuid = null }) => {
    const navigate = useNavigate();
    
    const { control, handleSubmit, reset, setValue } = useForm({
        resolver: yupResolver(departmentValidation),

        defaultValues: {
            name: "",
            code: "",
            description: "",
            status: "Active",
        },
    });

    const onSubmit = async (data) => {
        try {
            let response;
            if (mode === "add") {
                response = await createDepartment(data);
            } else {
                response = await updateDepartment(uuid, data);
            }

            toast.success(response.data.message);
            navigate("/departments");
        } catch (error) {
            toast.error(
                error?.response?.data?.detail || "Something went wrong."
            );
        }
    };

    const fetchDepartment = async () => {
        console.log('check-uuid', uuid);
        try {
            const response = await getDepartmentByUUID(uuid);
            console.log('check-response', response);

            const department = response.data.data;

            setValue("name", department.name);
            setValue("code", department.code);
            setValue("description", department.description || "");
            setValue("status", department.status);
        }
        catch (error) {
            toast.error("Failed to load department.");
        }
    };

    useEffect(() => {
        if (mode === "edit" && uuid) {
            fetchDepartment();
        }
    }, [mode, uuid]);


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Paper elevation={0} sx={{ p: 4, borderRadius: 3, border: "1px solid #E5E7EB" }} >
                <Typography variant="h5" fontWeight={600}> Department Information </Typography>
                <Divider sx={{ my: 3 }} />

                <Grid container spacing={3} sx={{ p: 4}}>
                    {/* Department Name */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Controller name="name" control={control}
                            render={({ field, fieldState }) => (
                                <TextField {...field} fullWidth label="Department Name" placeholder="Enter Department Name" error={!!fieldState.error} helperText={fieldState.error?.message} />
                            )}
                        />
                    </Grid>

                    {/* Department Code */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Controller name="code" control={control}
                            render={({ field, fieldState }) => (
                                <TextField {...field} fullWidth label="Department Code" placeholder="CARD" error={!!fieldState.error} helperText={fieldState.error?.message} />
                            )}
                        />
                    </Grid>

                    {/* Status */}
                    {/* <Grid size={{ xs: 12, md: 4 }}>
                        <Controller name="status" control={control}
                            render={({ field, fieldState }) => (
                                <TextField {...field} select fullWidth label="Status" error={!!fieldState.error} helperText={fieldState.error?.message} >
                                    <MenuItem value="Active"> Active </MenuItem>
                                    <MenuItem value="Inactive"> Inactive </MenuItem>
                                </TextField>
                            )}
                        />
                    </Grid> */}

                    {/* Description */}
                    <Grid size={{ xs: 12 }}>
                        <Controller name="description" control={control}
                            render={({ field, fieldState }) => (
                                <TextField {...field} fullWidth multiline rows={4} label="Description" placeholder="Department description..." error={!!fieldState.error} helperText={fieldState.error?.message} />
                            )}
                        />
                    </Grid>
                </Grid>

                <Divider sx={{ my: 4 }} />
                <Stack direction="row" spacing={2} sx={{ justifyContent:"flex-end" }}>
                    <Button variant="outlined" onClick={() => reset({ department_name: "", department_code: "", description: "", status: "Active" }) } > Reset </Button>
                    <Button variant="contained" type="submit">Save Department</Button>
                </Stack>
            </Paper>
        </form>
    );
};

export default DepartmentForm;
