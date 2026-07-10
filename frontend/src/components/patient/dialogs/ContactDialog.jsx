import { useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, MenuItem, Switch, FormControlLabel, TextField, } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { patientContactSchema } from "../../../validation/patientValidation";


const ContactDialog = ({ open, mode, patientUUID, initialData, onClose, onSuccess, }) => {

    const defaultValues = {
        name:"",
        relation:"",
        phone:"",
        email:"",
        is_emergency_contact:false,
    };

    const { control, handleSubmit, reset } = useForm({ 
        resolver: yupResolver(patientContactSchema),
        defaultValues 
    });

    useEffect(() => {
        if (!open) return;
        if (mode === "edit" && initialData) {
            reset({
                name: initialData.name || "",
                relation: initialData.relation || "",
                phone: initialData.phone || "",
                email: initialData.email || "",
                is_emergency_contact: initialData.is_emergency_contact || false
            });
        }
        else {
            reset(defaultValues);
        }

    }, [open, mode, initialData, reset]);

    const onSubmit = async (data) => {
        await onSuccess({ mode, contactId: initialData?.id, data, });
        reset();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>
                {mode === "edit" ? "Edit Contact" : "Add Contact"}
            </DialogTitle>

            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                    <Grid container spacing={3} sx={{ marginTop:"10px" }}>

                        {/* Contact Name */}
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Controller name="name" control={control} autoComplete="off"
                                render={({ field, fieldState }) => (
                                    <TextField {...field} fullWidth error={!!fieldState.error} helperText={fieldState.error?.message} label="Contact Name" />
                                )}
                            />
                        </Grid>

                        {/* Relation */}
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Controller name="relation" control={control} autoComplete="off"
                                render={({ field, fieldState }) => (
                                    <TextField {...field} select fullWidth label="Relation" error={!!fieldState.error} helperText={fieldState.error?.message}>
                                        <MenuItem value=""> Select Relation </MenuItem>
                                        <MenuItem value="Father"> Father </MenuItem>
                                        <MenuItem value="Mother"> Mother </MenuItem>
                                        <MenuItem value="Brother"> Brother </MenuItem>
                                        <MenuItem value="Sister"> Sister </MenuItem>
                                        <MenuItem value="Spouse"> Spouse </MenuItem>
                                        <MenuItem value="Husband"> Husband </MenuItem>
                                        <MenuItem value="Friend"> Friend </MenuItem>
                                        <MenuItem value="Guardian"> Guardian </MenuItem>
                                        <MenuItem value="Other"> Other </MenuItem>
                                    </TextField>
                                )}
                            />
                        </Grid>

                        {/* Contact Phone */}
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Controller name="phone" control={control} autoComplete="off"
                                render={({ field, fieldState }) => (
                                    <TextField {...field} fullWidth label="Contact Phone" error={!!fieldState.error} helperText={fieldState.error?.message} />
                                )}
                            />
                        </Grid>

                        {/* Contact Email */}
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Controller name="email" control={control} autoComplete="off"
                                render={({ field }) => (
                                    <TextField {...field} fullWidth label="Contact Email" type="email" />
                                )}
                            />
                        </Grid>

                        {/* Emergency Contact */}
                        <Grid size={{ xs: 12 }}>
                            <Controller name="is_emergency_contact" control={control} autoComplete="off"
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
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => { reset(); onClose(); }} > Cancel </Button>
                    <Button variant="contained" type="submit"> {mode === "edit" ? "Update Contact" : "Save Contact"} </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default ContactDialog;
