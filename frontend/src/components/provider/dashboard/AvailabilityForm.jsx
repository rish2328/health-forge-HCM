import { useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";


const defaultForm = {
    day_of_week: "",
    start_time: "",
    end_time: "",
    break_start_time: "",
    break_end_time: "",
    slot_duration: 30,
    max_patients: "",
    remarks: "",
};

const AvailabilityForm = ({ open, onClose, onSave, availability = null }) => {
    const isEdit = Boolean(availability);

    const [formData, setFormData] = useState(defaultForm);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (availability) {
            setFormData({
                day_of_week: availability.day_of_week || availability.day || "",
                start_time: availability.start_time || "",
                end_time: availability.end_time || "",
                break_start_time: availability.break_start_time || "",
                break_end_time: availability.break_end_time || "",
                slot_duration: availability.slot_duration || 30,
                max_patients: availability.max_patients || "",
                remarks: availability.remarks || "",
            });
        } 
        else {
            setFormData(defaultForm);
        }

        setErrors({});
    }, [availability, open]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.day_of_week) {
            newErrors.day_of_week = "Day is required.";
        }

        if (!formData.start_time) {
            newErrors.start_time = "Start time is required.";
        }

        if (!formData.end_time) {
            newErrors.end_time = "End time is required.";
        }

        if (
            formData.start_time &&
            formData.end_time &&
            formData.start_time >= formData.end_time
        ) {
            newErrors.end_time = "End time must be greater than start time.";
        }

        /*
        * Break validation
        */

        if (formData.break_start_time && !formData.break_end_time) {
            newErrors.break_end_time = "Break end time is required.";
        }

        if (!formData.break_start_time && formData.break_end_time) {
            newErrors.break_start_time = "Break start time is required.";
        }

        if (
            formData.break_start_time &&
            formData.break_end_time &&
            formData.break_start_time >= formData.break_end_time
        ) {
            newErrors.break_end_time = "Break end time must be greater than break start time.";
        }

        /*
        * Break must be inside working hours
        */

        if (
            formData.start_time &&
            formData.end_time &&
            formData.break_start_time &&
            formData.break_end_time
        ) {
        if (
            formData.break_start_time < formData.start_time ||
            formData.break_end_time > formData.end_time
        ) {
            newErrors.break_start_time = "Break must be within working hours.";
        }

        if (
            formData.break_start_time < formData.start_time ||
            formData.break_end_time > formData.end_time
        ) {
            newErrors.break_end_time = "Break must be within working hours.";
        }
        }

        /*
        * Slot Duration
        */

        if (!formData.slot_duration) {
            newErrors.slot_duration = "Slot duration is required.";
        } else if (Number(formData.slot_duration) <= 0) {
            newErrors.slot_duration = "Slot duration must be greater than 0.";
        }

        /*
        * Maximum Patients
        */

        if (!formData.max_patients) {
            newErrors.max_patients = "Maximum patients is required.";
        } else if (Number(formData.max_patients) <= 0) {
            newErrors.max_patients = "Maximum patients must be greater than 0.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!validate()) { return; }
        onSave({
            ...formData,
            slot_duration: Number(formData.slot_duration),
            max_patients: Number(formData.max_patients),
        });
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle sx={{ fontWeight: 700 }} >
                {isEdit ? "Edit Availability" : "Add Availability"}
            </DialogTitle>

            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <Grid container spacing={2.5}>
                        {/* Day */}
                        <Grid size={{ xs: 12, md: 6 }}>
                            <FormControl fullWidth error={Boolean(errors.day_of_week)}>
                                <InputLabel>Day</InputLabel>

                                <Select name="day_of_week" value={formData.day_of_week} label="Day" onChange={handleChange} >
                                    <MenuItem value="Sunday">Sunday</MenuItem>
                                    <MenuItem value="Monday">Monday</MenuItem>
                                    <MenuItem value="Tuesday">Tuesday</MenuItem>
                                    <MenuItem value="Wednesday">Wednesday</MenuItem>
                                    <MenuItem value="Thursday">Thursday</MenuItem>
                                    <MenuItem value="Friday">Friday</MenuItem>
                                    <MenuItem value="Saturday">Saturday</MenuItem>
                                </Select>

                                {errors.day_of_week && (
                                    <FormHelperText>{errors.day_of_week}</FormHelperText>
                                )}
                            </FormControl>
                        </Grid>

                        {/* Slot Duration */}
                        <Grid size={{ xs: 12, md: 6 }}>
                            <FormControl fullWidth error={Boolean(errors.slot_duration)}>
                                <InputLabel>Slot Duration</InputLabel>

                                <Select name="slot_duration" value={formData.slot_duration} label="Slot Duration" onChange={handleChange} >
                                    <MenuItem value={10}>10 Minutes</MenuItem>
                                    <MenuItem value={15}>15 Minutes</MenuItem>
                                    <MenuItem value={20}>20 Minutes</MenuItem>
                                    <MenuItem value={30}>30 Minutes</MenuItem>
                                    <MenuItem value={45}>45 Minutes</MenuItem>
                                    <MenuItem value={60}>60 Minutes</MenuItem>
                                </Select>

                                {errors.slot_duration && ( <FormHelperText>{errors.slot_duration}</FormHelperText> )}
                            </FormControl>
                        </Grid>

                        {/* Start Time */}
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField fullWidth type="time" name="start_time" label="Start Time" value={formData.start_time} onChange={handleChange} error={Boolean(errors.start_time)} helperText={errors.start_time} slotProps={{ inputLabel: { shrink: true } }} />
                        </Grid>

                        {/* End Time */}
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField fullWidth type="time" name="end_time" label="End Time" value={formData.end_time} onChange={handleChange} error={Boolean(errors.end_time)} helperText={errors.end_time} slotProps={{ inputLabel: { shrink: true } }} />
                        </Grid>

                        {/* Break Start */}
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                type="time"
                                name="break_start_time"
                                label="Break Start"
                                value={formData.break_start_time}
                                onChange={handleChange}
                                error={Boolean(errors.break_start_time)}
                                helperText={errors.break_start_time}
                                slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                                }}
                            />
                        </Grid>

                        {/* Break End */}
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                type="time"
                                name="break_end_time"
                                label="Break End"
                                value={formData.break_end_time}
                                onChange={handleChange}
                                error={Boolean(errors.break_end_time)}
                                helperText={errors.break_end_time}
                                slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                                }}
                            />
                        </Grid>

                        {/* Maximum Patients */}
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                type="number"
                                name="max_patients"
                                label="Maximum Patients"
                                value={formData.max_patients}
                                onChange={handleChange}
                                error={Boolean(errors.max_patients)}
                                helperText={errors.max_patients}
                                slotProps={{
                                htmlInput: {
                                    min: 1,
                                },
                                }}
                            />
                        </Grid>

                        {/* Remarks */}
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                multiline
                                rows={3}
                                name="remarks"
                                label="Remarks"
                                value={formData.remarks}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>

                <DialogActions sx={{ px: 3, pb: 2.5 }} >
                    <Button variant="outlined" onClick={onClose}> Cancel </Button>
                    <Button type="submit" variant="contained"> {isEdit ? "Update" : "Save Availability"} </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default AvailabilityForm;
