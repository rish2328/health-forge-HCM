import { Box, Button, Chip, Divider, Grid, IconButton, Paper, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import { createProviderAvailability, updateProviderAvailability, deleteProviderAvailability } from "../../../api/providerApi";
import { useState } from "react";
import AvailabilityForm from "./AvailabilityForm";
import DeleteAvailabilityDialog from "./DeleteAvailabilityDialog";
import { toast } from "react-toastify";


const ProviderAvailabilityTab = ({ provider, refreshProvider }) => {
    const [formOpen, setFormOpen] = useState(false);
    const [selectedAvailability, setSelectedAvailability] = useState(null);

    const [deleteOpen, setDeleteOpen] = useState(false);
    const [availabilityToDelete, setAvailabilityToDelete] = useState(null);
    const availabilities = provider?.availabilities || [];

    const hasAvailableSchedule = availabilities.some(
        (item) => item.is_available === true
    );

    const DAYS = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ];

    /* Create availability map */
    const availabilityMap = {};
    availabilities.forEach((item) => { availabilityMap[item.week_days] = item; });
    
    /* Format Time */
    const formatTime = (time) => {
        if (!time) { return "-"; }
        const [hours, minutes] = time.split(":");
        const date = new Date();
        date.setHours(Number(hours), Number(minutes), 0, 0);

        return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", });
    };

    const handleSaveAvailability = async (data) => {
        try {
            const payload = { provider_uuid: provider?.uuid, ...data };

            // UPDATE PROVIDER AVAILABILITY
            if (selectedAvailability?.id) {
                const response = await updateProviderAvailability( provider.uuid, selectedAvailability.id, payload );
                await refreshProvider();

                toast.success( response.data.message || "Availability updated successfully." );
            }
            // CREATE PROVIDER AVAILABILITY
            else {
                const response = await createProviderAvailability( payload );
                await refreshProvider();

                toast.success( response.data.message || "Availability added successfully." );
            }

            // Close form
            setFormOpen(false);
            setSelectedAvailability(null);
        }
        catch (error) {
            toast.error( error?.response?.data?.detail || "Failed to save availability." );
        }
    };

    /* Delete Availability */
    const handleDeleteAvailability = async () => {
        try {
            // Safety check
            if (!availabilityToDelete?.id) {
                return;
            }

            const response = await deleteProviderAvailability( provider.uuid, availabilityToDelete.id );
            await refreshProvider();
            toast.success( response.data.message || "Availability deleted successfully." );

            // Close dialog
            setDeleteOpen(false);
            setAvailabilityToDelete(null);
        }
        catch (error) {
            toast.error( error?.response?.data?.detail || "Failed to delete availability." );
        }
    };

    return (
        <Box>
            {/* HEADER */}
            <Stack direction={{ xs: "column", sm: "row" }} sx={{ justifyContent: "space-between", alignItems: "center", mb: 3 }} spacing={2} >
                <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}> Provider Availability </Typography>
                    <Typography variant="body2" color="text.secondary" mt={0.5}> Manage weekly working hours and appointment slots. </Typography>
                </Box>

                <Button variant="contained" startIcon={<AddIcon />} onClick={() => { setSelectedAvailability(null); setFormOpen(true); }} > Add Availability </Button>
            </Stack>

            {/* WEEKLY SCHEDULE */}
            <Grid container spacing={2}>
                {!hasAvailableSchedule ? (
                    <Grid size={{ xs: 12 }}>
                        <Paper elevation={0} sx={{ width: "100%", minHeight: 120, border: "1px solid #E5E7EB", borderRadius: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }} >
                            <Typography sx={{ fontWeight: 500 }} > Not Available </Typography>
                            <Typography variant="body2" color="text.secondary" > No Availability have been scheduled yet. </Typography>
                        </Paper>
                    </Grid>
                ) : (
                    DAYS.map((day) => {
                        const schedule = availabilityMap[day];

                        // Is day ka schedule available nahi hai
                        if (!schedule || !schedule.is_available) {
                            return null;
                        }

                        // YAHAN TUMHARA EXISTING AVAILABLE CARD
                        return (
                            <Grid key={schedule.id} size={{ xs: 12, md: schedule.is_available ? 4 : 12 }} sx={{ display: "flex", }} >
                                <Paper elevation={0} sx={{ p: 1.5, width: "100%", border: "1px solid #E5E7EB", borderRadius: 1 }} >
                                    {/* DAY HEADER */}
                                    <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }} >
                                        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }} >
                                            <Box sx={{ width: 42, height: 42, borderRadius: 1, display: "flex", alignItems: "center", justifyContent: "center", bgcolor: schedule.is_available ? "primary.50" : "grey.100" }} >
                                                <AccessTimeOutlinedIcon color={schedule.is_available ? "primary" : "disabled"} />
                                            </Box>

                                            <Box>
                                                <Typography sx={{fontWeight:700}}> {schedule.week_days} </Typography>
                                                <Chip label={ schedule.is_available ? "Available" : "Unavailable" } size="small" color={schedule.is_available ? "success" : "default"} sx={{ mt: 0.5 }} />
                                            </Box>
                                        </Stack>

                                        {/* Actions */}
                                        <Stack direction="row" spacing={0.5}>
                                            <IconButton size="small" color="primary" disabled={!schedule.is_available} onClick={() => { setSelectedAvailability(schedule); setFormOpen(true); }} >
                                                <EditOutlinedIcon fontSize="small" />
                                            </IconButton>

                                            <IconButton size="small" color="error" disabled={!schedule.is_available} onClick={() => { setAvailabilityToDelete(schedule); setDeleteOpen(true); }} >
                                                <DeleteOutlineOutlinedIcon fontSize="small" />
                                            </IconButton>
                                        </Stack>
                                    </Stack>
                                    <Divider sx={{ my: 2 }} />

                                    {/* AVAILABLE DAY */}
                                    {schedule.is_available ? (
                                        <>
                                            {/* Working Hours */}
                                            <Stack spacing={1.5}>
                                                <Stack direction="row" sx={{ justifyContent: "space-between" }} >
                                                    <Typography variant="body2" color="text.secondary"> Working Hours </Typography>
                                                    <Typography variant="body2" fontWeight={600}> {formatTime(schedule.start_time)} {" - "} {formatTime(schedule.end_time)} </Typography>
                                                </Stack>

                                                {/* Break */}
                                                {schedule.break_start && schedule.break_end && (
                                                    <Stack direction="row" sx={{ justifyContent: "space-between" }} >
                                                    <Typography variant="body2" color="text.secondary"> Break </Typography>

                                                    <Typography variant="body2" fontWeight={600}>
                                                        {formatTime(schedule.break_start)}
                                                        {" - "}
                                                        {formatTime(schedule.break_end)}
                                                    </Typography>
                                                    </Stack>
                                                )}
                                            </Stack>
                                            <Divider sx={{ my: 2 }} />

                                            {/* Slot Information */}
                                            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ justifyContent: "space-between" }} >
                                                <Chip label={`Slot: ${schedule.slot_duration} min`} size="small" variant="outlined" />
                                                <Chip label={`Max Patients: ${schedule.max_patients}`} size="small" variant="outlined" />
                                            </Stack>
                                        </>
                                    ) : (
                                        <Box sx={{ py: 3, textAlign: "center" }} >
                                            <Typography color="text.secondary" sx={{ fontWeight:500 }}> Not Available </Typography>
                                            <Typography variant="body2" color="text.secondary" mt={0.5}> No appointments can be scheduled. </Typography>
                                        </Box>
                                    )}
                                </Paper>
                            </Grid>
                        );
                    })
                )}
            </Grid>

            {/* AVAILABILITY FORM */}
            <AvailabilityForm open={formOpen} onClose={() => { setFormOpen(false); setSelectedAvailability(null); }} onSave={handleSaveAvailability} availability={selectedAvailability} />

            {/* DELETE DIALOG */}
            <DeleteAvailabilityDialog open={deleteOpen} onClose={() => { setDeleteOpen(false); setAvailabilityToDelete(null); }} onConfirm={handleDeleteAvailability} availability={availabilityToDelete} />
        </Box>
    );
};

export default ProviderAvailabilityTab;
