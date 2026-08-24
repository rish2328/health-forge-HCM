import { useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";


const defaultForm = {
    week_days: "",
    start_time: "",
    end_time: "",
    break_start: "",
    break_end: "",
    slot_duration: 30,
    max_patients: "",
    is_available: true,
    remarks: "",
};

const AvailabilityForm = ({
    open,
    onClose,
    onSave,
    availability = null,
}) => {
    const isEdit = Boolean(availability);
    const [formData, setFormData] = useState(defaultForm);
    const [errors, setErrors] = useState({});

    /* Load Existing Availability For Edit */
    useEffect(() => {
        if (availability) {
            setFormData({
                week_days:
                    availability.week_days ||
                    availability.day ||
                    "",

                start_time:
                    availability.start_time || "",

                end_time:
                    availability.end_time || "",

                break_start:
                    availability.break_start || "",

                break_end:
                    availability.break_end || "",

                slot_duration:
                    availability.slot_duration || 30,

                max_patients:
                    availability.max_patients || "",

                is_available:
                    availability.is_available ?? true,

                remarks:
                    availability.remarks || "",
            });
        }
        else {
            setFormData(defaultForm);
        }

        setErrors({});
    }, [availability, open]);


    /* Handle Input Change */
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };


    /* Validation */
    const validate = () => {
        const newErrors = {};

        // Day
        if (!formData.week_days) {
            newErrors.week_days = "Day is required.";
        }

        // Start Time
        if (!formData.start_time) {
            newErrors.start_time = "Start time is required.";
        }

        // End Time
        if (!formData.end_time) {
            newErrors.end_time = "End time is required.";
        }

        // Working hours validation
        if (
            formData.start_time &&
            formData.end_time &&
            formData.start_time >= formData.end_time
        ) {
            newErrors.end_time = "End time must be greater than start time.";
        }

        /* Break Validation */
        if (
            formData.break_start &&
            !formData.break_end
        ) {
            newErrors.break_end = "Break end time is required.";
        }

        if (
            !formData.break_start &&
            formData.break_end
        ) {
            newErrors.break_start = "Break start time is required.";
        }

        if (
            formData.break_start &&
            formData.break_end &&
            formData.break_start >= formData.break_end
        ) {
            newErrors.break_end = "Break end time must be greater than break start time.";
        }

        /* Break Must Be Inside Working Hours */
        if (
            formData.start_time &&
            formData.end_time &&
            formData.break_start &&
            formData.break_end
        ) {
            if (
                formData.break_start < formData.start_time ||
                formData.break_end > formData.end_time
            ) {
                newErrors.break_start = "Break must be within working hours."; 
                newErrors.break_end = "Break must be within working hours.";
            }
        }

        /* Slot Duration */
        if (!formData.slot_duration) { 
            newErrors.slot_duration = "Slot duration is required.";
        }
        else if (
            Number(formData.slot_duration) <= 0
        ) {
            newErrors.slot_duration = "Slot duration must be greater than 0.";
        }

        /* Maximum Patients */
        if (!formData.max_patients) {
            newErrors.max_patients = "Maximum patients is required.";
        }
        else if ( Number(formData.max_patients) <= 0 ) {
            newErrors.max_patients = "Maximum patients must be greater than 0.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    /* Submit */
    const handleSubmit = (event) => {
        event.preventDefault();

        if (!validate()) {
            return;
        }

        const payload = {
            ...formData,
            slot_duration: Number(formData.slot_duration),
            max_patients: Number(formData.max_patients),
            is_available: Boolean(formData.is_available)
        };

        onSave(payload);
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
        >

            <DialogTitle
                sx={{
                    fontWeight: 700,
                }}
            >
                {isEdit
                    ? "Edit Availability"
                    : "Add Availability"}
            </DialogTitle>


            <form onSubmit={handleSubmit}>

                <DialogContent>

                    <Grid
                        container
                        spacing={2.5}
                    >

                        {/* =====================================================
                            DAY
                        ===================================================== */}

                        <Grid
                            size={{
                                xs: 12,
                                md: 6,
                            }}
                        >

                            <FormControl
                                fullWidth
                                error={Boolean(
                                    errors.week_days
                                )}
                            >

                                <InputLabel>
                                    Day
                                </InputLabel>


                                <Select
                                    name="week_days"
                                    value={
                                        formData.week_days
                                    }
                                    label="Day"
                                    onChange={handleChange}
                                >

                                    <MenuItem value="Monday">
                                        Monday
                                    </MenuItem>

                                    <MenuItem value="Tuesday">
                                        Tuesday
                                    </MenuItem>

                                    <MenuItem value="Wednesday">
                                        Wednesday
                                    </MenuItem>

                                    <MenuItem value="Thursday">
                                        Thursday
                                    </MenuItem>

                                    <MenuItem value="Friday">
                                        Friday
                                    </MenuItem>

                                    <MenuItem value="Saturday">
                                        Saturday
                                    </MenuItem>

                                    <MenuItem value="Sunday">
                                        Sunday
                                    </MenuItem>

                                </Select>


                                {errors.week_days && (

                                    <FormHelperText>
                                        {errors.week_days}
                                    </FormHelperText>

                                )}

                            </FormControl>

                        </Grid>


                        {/* =====================================================
                            SLOT DURATION
                        ===================================================== */}

                        <Grid
                            size={{
                                xs: 12,
                                md: 6,
                            }}
                        >

                            <FormControl
                                fullWidth
                                error={Boolean(
                                    errors.slot_duration
                                )}
                            >

                                <InputLabel>
                                    Slot Duration
                                </InputLabel>


                                <Select
                                    name="slot_duration"
                                    value={
                                        formData.slot_duration
                                    }
                                    label="Slot Duration"
                                    onChange={handleChange}
                                >

                                    <MenuItem value={10}>
                                        10 Minutes
                                    </MenuItem>

                                    <MenuItem value={15}>
                                        15 Minutes
                                    </MenuItem>

                                    <MenuItem value={20}>
                                        20 Minutes
                                    </MenuItem>

                                    <MenuItem value={30}>
                                        30 Minutes
                                    </MenuItem>

                                    <MenuItem value={45}>
                                        45 Minutes
                                    </MenuItem>

                                    <MenuItem value={60}>
                                        60 Minutes
                                    </MenuItem>

                                </Select>


                                {errors.slot_duration && (

                                    <FormHelperText>
                                        {errors.slot_duration}
                                    </FormHelperText>

                                )}

                            </FormControl>

                        </Grid>


                        {/* =====================================================
                            START TIME
                        ===================================================== */}

                        <Grid
                            size={{
                                xs: 12,
                                md: 6,
                            }}
                        >

                            <TextField
                                fullWidth
                                type="time"
                                name="start_time"
                                label="Start Time"
                                value={
                                    formData.start_time
                                }
                                onChange={handleChange}
                                error={Boolean(
                                    errors.start_time
                                )}
                                helperText={
                                    errors.start_time
                                }
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                            />

                        </Grid>


                        {/* =====================================================
                            END TIME
                        ===================================================== */}

                        <Grid
                            size={{
                                xs: 12,
                                md: 6,
                            }}
                        >

                            <TextField
                                fullWidth
                                type="time"
                                name="end_time"
                                label="End Time"
                                value={
                                    formData.end_time
                                }
                                onChange={handleChange}
                                error={Boolean(
                                    errors.end_time
                                )}
                                helperText={
                                    errors.end_time
                                }
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                            />

                        </Grid>


                        {/* =====================================================
                            BREAK START
                        ===================================================== */}

                        <Grid
                            size={{
                                xs: 12,
                                md: 6,
                            }}
                        >

                            <TextField
                                fullWidth
                                type="time"
                                name="break_start"
                                label="Break Start"
                                value={
                                    formData.break_start
                                }
                                onChange={handleChange}
                                error={Boolean(
                                    errors.break_start
                                )}
                                helperText={
                                    errors.break_start
                                }
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                            />

                        </Grid>


                        {/* =====================================================
                            BREAK END
                        ===================================================== */}

                        <Grid
                            size={{
                                xs: 12,
                                md: 6,
                            }}
                        >

                            <TextField
                                fullWidth
                                type="time"
                                name="break_end"
                                label="Break End"
                                value={
                                    formData.break_end
                                }
                                onChange={handleChange}
                                error={Boolean(
                                    errors.break_end
                                )}
                                helperText={
                                    errors.break_end
                                }
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                            />

                        </Grid>


                        {/* =====================================================
                            MAX PATIENTS
                        ===================================================== */}

                        <Grid
                            size={{
                                xs: 12,
                                md: 6,
                            }}
                        >

                            <TextField
                                fullWidth
                                type="number"
                                name="max_patients"
                                label="Maximum Patients"
                                value={
                                    formData.max_patients
                                }
                                onChange={handleChange}
                                error={Boolean(
                                    errors.max_patients
                                )}
                                helperText={
                                    errors.max_patients
                                }
                                slotProps={{
                                    htmlInput: {
                                        min: 1,
                                    },
                                }}
                            />

                        </Grid>


                        {/* =====================================================
                            REMARKS
                        ===================================================== */}

                        <Grid
                            size={{
                                xs: 12,
                            }}
                        >

                            <TextField
                                fullWidth
                                multiline
                                rows={3}
                                name="remarks"
                                label="Remarks"
                                value={
                                    formData.remarks
                                }
                                onChange={handleChange}
                            />

                        </Grid>

                    </Grid>

                </DialogContent>


                {/* =========================================================
                    ACTIONS
                ========================================================= */}

                <DialogActions
                    sx={{
                        px: 3,
                        pb: 2.5,
                    }}
                >

                    <Button
                        variant="outlined"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>


                    <Button
                        type="submit"
                        variant="contained"
                    >
                        {isEdit
                            ? "Update"
                            : "Save Availability"}
                    </Button>

                </DialogActions>

            </form>

        </Dialog>
    );
};


export default AvailabilityForm;