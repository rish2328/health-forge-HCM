import { Box, Button, Chip, Divider, Grid, IconButton, Paper, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import { useState } from "react";
import AvailabilityForm from "./AvailabilityForm";
import DeleteAvailabilityDialog from "./DeleteAvailabilityDialog";


const ProviderAvailabilityTab = ({ provider }) => {
    const [formOpen, setFormOpen] = useState(false);
    const [selectedAvailability, setSelectedAvailability] = useState(null);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [availabilityToDelete, setAvailabilityToDelete] = useState(null);

    const availability = [
        {
            id: 1,
            day: "Monday",
            startTime: "09:00 AM",
            endTime: "01:00 PM",
            breakStart: "01:00 PM",
            breakEnd: "02:00 PM",
            secondStartTime: "02:00 PM",
            secondEndTime: "06:00 PM",
            slotDuration: 30,
            maxPatients: 20,
            isAvailable: true,
        },
        {
            id: 2,
            day: "Tuesday",
            startTime: "09:00 AM",
            endTime: "01:00 PM",
            breakStart: "01:00 PM",
            breakEnd: "02:00 PM",
            secondStartTime: "02:00 PM",
            secondEndTime: "05:00 PM",
            slotDuration: 30,
            maxPatients: 18,
            isAvailable: true,
        },
        {
            id: 3,
            day: "Wednesday",
            startTime: "10:00 AM",
            endTime: "02:00 PM",
            breakStart: null,
            breakEnd: null,
            secondStartTime: null,
            secondEndTime: null,
            slotDuration: 30,
            maxPatients: 15,
            isAvailable: true,
        },
        {
            id: 4,
            day: "Thursday",
            startTime: "09:00 AM",
            endTime: "01:00 PM",
            breakStart: "01:00 PM",
            breakEnd: "02:00 PM",
            secondStartTime: "02:00 PM",
            secondEndTime: "06:00 PM",
            slotDuration: 30,
            maxPatients: 20,
            isAvailable: true,
        },
        {
            id: 5,
            day: "Friday",
            startTime: "09:00 AM",
            endTime: "01:00 PM",
            breakStart: "01:00 PM",
            breakEnd: "02:00 PM",
            secondStartTime: "02:00 PM",
            secondEndTime: "04:00 PM",
            slotDuration: 30,
            maxPatients: 15,
            isAvailable: true,
        },
        {
            id: 6,
            day: "Saturday",
            startTime: "09:00 AM",
            endTime: "01:00 PM",
            breakStart: null,
            breakEnd: null,
            secondStartTime: null,
            secondEndTime: null,
            slotDuration: 30,
            maxPatients: 10,
            isAvailable: true,
        },
        {
            id: 7,
            day: "Sunday",
            isAvailable: false,
        },
    ];

    const handleSaveAvailability = (data) => {
        console.log("Availability Data:", data);
        setFormOpen(false);
        setSelectedAvailability(null);
    };

    const handleDeleteAvailability = () => {
        console.log(
            "Delete Availability:",
            availabilityToDelete
        );

        setDeleteOpen(false);
        setAvailabilityToDelete(null);
    };

    return (
        <Box>
            {/* Header */}
            {/* <Stack direction={{ xs: "column", sm: "row" }} sx={{justifyContent:"space-between"}} alignItems={{ xs: "flex-start", sm: "center" }} spacing={2} mb={3} > */}
            <Stack direction={{ xs: "column", sm: "row" }} sx={{justifyContent:"space-between", alignItems:"center", mb:3}} spacing={2} mb={3} >
                <Box>
                    <Typography variant="h6" sx={{ fontWeight:700 }}> Provider Availability </Typography>
                    <Typography variant="body2" color="text.secondary" mt={0.5}> Manage weekly working hours and appointment slots. </Typography>
                </Box>

                <Button variant="contained" startIcon={<AddIcon />} onClick={() => { setSelectedAvailability(null); setFormOpen(true); }}> Add Availability </Button>
            </Stack>

            {/* Weekly Schedule */}
            <Grid container spacing={2}>
                {availability.map((schedule) => (
                    // <Grid key={schedule.id} size={{ xs: 12, md: 4 }} sx={{ display: "flex", }} >
                    <Grid key={schedule.id} size={{ xs: 12, md: schedule.isAvailable ? 4 : 12, }} sx={{ display: "flex", }} >
                        <Paper elevation={0} sx={{ p: 1.5, width: "100%", border: "1px solid #E5E7EB", borderRadius: 1 }} >
                        
                        {/* Day Header */}
                        <Stack direction="row" sx={{justifyContent:"space-between", alignItems:"center"}} >
                            <Stack direction="row" sx={{spacing:1.5, alignItems:"center"}} >
                                <Box sx={{ width: 42, height: 42, borderRadius: 1, display: "flex", alignItems: "center", justifyContent: "center", bgcolor: schedule.isAvailable ? "primary.50" : "grey.100", }} >
                                    <AccessTimeOutlinedIcon color={schedule.isAvailable ? "primary" : "disabled"} />
                                </Box>

                                <Box>
                                    <Typography fontWeight={700}>{schedule.day}</Typography>
                                    <Chip label={schedule.isAvailable ? "Available" : "Unavailable"} size="small" color={schedule.isAvailable ? "success" : "default"} sx={{ mt:0.5 }} />
                                </Box>
                            </Stack>

                            <Stack direction="row" spacing={0.5}>
                                <IconButton size="small" color="primary" disabled={!schedule.isAvailable} onClick={() => { setSelectedAvailability(schedule); setFormOpen(true); }} >
                                    <EditOutlinedIcon fontSize="small" />
                                </IconButton>

                                <IconButton size="small" color="error" disabled={!schedule.isAvailable} onClick={() => { setAvailabilityToDelete(schedule); setDeleteOpen(true); }} >
                                    <DeleteOutlineOutlinedIcon fontSize="small" />
                                </IconButton>
                            </Stack>
                        </Stack>
                        <Divider sx={{ my: 2 }} />

                        {schedule.isAvailable ? (<>
                            {/* Working Hours */}
                            <Stack spacing={1.5}>
                                <Stack direction="row" sx={{ justifyContent:"space-between" }} >
                                    <Typography variant="body2" color="text.secondary"> Working Hours </Typography>
                                    <Typography variant="body2" fontWeight={600}> {schedule.startTime} {" - "} {schedule.endTime} </Typography>
                                </Stack>

                                {/* Second Session */}
                                {schedule.secondStartTime && (
                                    <Stack direction="row" sx={{ justifyContent:"space-between" }} >
                                        <Typography variant="body2" color="text.secondary"> Evening Session </Typography>
                                        <Typography variant="body2" fontWeight={600}> {schedule.secondStartTime} {" - "} {schedule.secondEndTime} </Typography>
                                    </Stack>
                                )}

                                {/* Break */}
                                {schedule.breakStart && (
                                    <Stack direction="row" sx={{ justifyContent:"space-between" }} >
                                        <Typography variant="body2" color="text.secondary"> Break </Typography>
                                        <Typography variant="body2" fontWeight={600}> {schedule.breakStart} {" - "} {schedule.breakEnd} </Typography>
                                    </Stack>
                                )}
                            </Stack>
                            <Divider sx={{ my: 2 }} />

                            {/* Slot Information */}
                            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ justifyContent:"space-between" }} >
                                <Chip label={`Slot: ${schedule.slotDuration} min`} size="small" variant="outlined" />
                                <Chip label={`Max Patients: ${schedule.maxPatients}`} size="small" variant="outlined" />
                            </Stack>
                        </> ) : (
                            <Box sx={{ py: 3, textAlign: "center" }} >
                                <Typography color="text.secondary" fontWeight={500}> Not Available </Typography>
                                <Typography variant="body2" color="text.secondary" mt={0.5}> No appointments can be scheduled. </Typography>
                            </Box>
                        )}
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            <AvailabilityForm 
                open={formOpen} 
                onClose={() => { setFormOpen(false); setSelectedAvailability(null); }} 
                onSave={handleSaveAvailability} 
                availability={selectedAvailability} 
            />

            <DeleteAvailabilityDialog
                open={deleteOpen}
                onClose={() => {
                    setDeleteOpen(false);
                    setAvailabilityToDelete(null);
                }}
                onConfirm={handleDeleteAvailability}
                availability={availabilityToDelete}
            />
        </Box>
    );
};

export default ProviderAvailabilityTab;
