import { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { patientAddressSchema } from "../../../validation/patientValidation";


const AddressDialog = ({ open, mode, patientUUID, initialData, onClose, onSuccess, }) => {

    const defaultValues = {
        address_line_1: "",
        address_line_2: "",
        city: "",
        state: "",
        country: "",
        postal_code: "",
        address_type: "",
    };

    const { control, handleSubmit, reset } = useForm({ 
        resolver: yupResolver(patientAddressSchema),
        defaultValues 
    });

    useEffect(() => {
        if (!open) return;
        if (mode === "edit" && initialData) {
            reset({
                address_line_1: initialData.address_line_1 || "",
                address_line_2: initialData.address_line_2 || "",
                city: initialData.city || "",
                state: initialData.state || "",
                country: initialData.country || "",
                postal_code: initialData.postal_code || "",
                address_type: initialData.address_type || "",
            });
        }
        else {
            reset(defaultValues);
        }

    }, [open, mode, initialData, reset]);

    const onSubmit = async (data) => {
        await onSuccess({ mode, addressId: initialData?.id, data, });
        reset();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>
                {mode === "edit" ? "Edit Address" : "Add Address"}
            </DialogTitle>

            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                    <Grid container spacing={3} mt={1}>
                        <Grid size={{ xs: 12 }}>
                            <Controller name="address_line_1" control={control} autoComplete="off"
                                render={({ field, fieldState }) => (
                                    <TextField {...field} label="Address Line 1" fullWidth error={!!fieldState.error} helperText={fieldState.error?.message} />
                                )}
                            />
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <Controller name="address_line_2" control={control} autoComplete="off"
                                render={({ field, fieldState }) => (
                                    <TextField {...field} label="Address Line 2" fullWidth error={!!fieldState.error} helperText={fieldState.error?.message} />
                                )}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 4 }}>
                            <Controller name="city" control={control} autoComplete="off"
                                render={({ field, fieldState }) => (
                                    <TextField {...field} label="City" fullWidth error={!!fieldState.error} helperText={fieldState.error?.message} />
                                )}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 4 }}>
                            <Controller name="state" control={control} autoComplete="off"
                                render={({ field, fieldState }) => (
                                    <TextField {...field} label="State" fullWidth error={!!fieldState.error} helperText={fieldState.error?.message} />
                                )}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 4 }}>
                            <Controller name="country" control={control} autoComplete="off"
                                render={({ field, fieldState }) => (
                                    <TextField {...field} label="Country" fullWidth error={!!fieldState.error} helperText={fieldState.error?.message} />
                                )}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <Controller name="postal_code" control={control} autoComplete="off"
                                render={({ field, fieldState }) => (
                                    <TextField {...field} label="Postal Code" fullWidth error={!!fieldState.error} helperText={fieldState.error?.message} />
                                )}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                        <Controller name="address_type" control={control} autoComplete="off"
                            render={({ field, fieldState }) => (
                                <TextField {...field} select label="Address Type" fullWidth error={!!fieldState.error} helperText={fieldState.error?.message}>
                                    <MenuItem value="Home"> Home </MenuItem>
                                    <MenuItem value="Permanent"> Permanent </MenuItem>
                                    <MenuItem value="Current"> Current </MenuItem>
                                    <MenuItem value="Mailing"> Mailing </MenuItem>
                                    <MenuItem value="Billing"> Billing </MenuItem>
                                    <MenuItem value="Work"> Work </MenuItem>
                                    <MenuItem value="Office"> Office </MenuItem>
                                    <MenuItem value="Emergency"> Emergency </MenuItem>
                                    <MenuItem value="Temporary"> Temporary </MenuItem>
                                    <MenuItem value="Other"> Other </MenuItem>
                                </TextField>
                            )}
                        />
                        </Grid>
                    </Grid>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => { reset(); onClose(); }} > Cancel </Button>
                    <Button variant="contained" type="submit"> {mode === "edit" ? "Update Address" : "Save Address"} </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default AddressDialog;
