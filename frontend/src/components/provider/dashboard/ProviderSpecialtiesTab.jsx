import { useState } from "react";
import { toast } from "react-toastify";
import SpecialtyForm from "./SpecialtyForm";
import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { createProviderSpecialty, updateProviderSpecialty, deleteProviderSpecialty } from "../../../api/providerApi";
import { Box, Button, Chip, Dialog, DialogContent, DialogTitle, Grid, IconButton, Paper, Stack, Typography } from "@mui/material";


const ProviderSpecialtiesTab = ({ provider, refreshProvider }) => {
    const specialties = provider?.specialties || [];
    const [formOpen, setFormOpen] = useState(false);
    const [selectedSpecialty, setSelectedSpecialty] = useState(null);

    const [deleteOpen, setDeleteOpen] = useState(false);
    const [specialtyToDelete, setSpecialtyToDelete] = useState(null);

    const handleSaveSpecialty = async (data) => {
        try {
            const payload = {
                provider_uuid: provider.uuid,
                specialty_name: data.specialty_name,
                is_primary: data.is_primary,
            };

            console.log("CREATE SPECIALTY payload:", payload);

            // UPDATE SPECIALTY
            if (selectedSpecialty?.id) {
                const response = await updateProviderSpecialty( provider.uuid, selectedSpecialty.id, payload );
                console.log("UPDATE SPECIALTY RESPONSE:", response);

                await refreshProvider();
                toast.success( response.data.message || "Specialty updated successfully." );
            }

            // CREATE SPECIALTY
            else {
                const response = await createProviderSpecialty(payload);
                console.log("CREATE SPECIALTY RESPONSE:", response);

                await refreshProvider();
                toast.success(response.data.message || "Specialty added successfully.");
            }

            setFormOpen(false);
            setSelectedSpecialty(null);
        }
        catch (error) {
            console.error("Specialty save failed:", error);
            toast.error(error?.response?.data?.detail || "Failed to save specialty.");
        }
    };

    const handleDeleteSpecialty = async () => {
        if (!specialtyToDelete?.id) {
            return;
        }
        try {
            const response = await deleteProviderSpecialty( provider.uuid, specialtyToDelete.id );
            console.log( "DELETE SPECIALTY RESPONSE:", response );

            await refreshProvider();
            toast.success( response.data.message || "Specialty deleted successfully." );

            setDeleteOpen(false);
            setSpecialtyToDelete(null);
        }
        catch (error) {
            console.error( "Specialty delete failed:", error );
            toast.error( error?.response?.data?.detail || "Failed to delete specialty." );
        }
    };

    return (
        <Box>
            {/* =====================================================
                    HEADER
            ===================================================== */}
            <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", mb: 3 }} >
                <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}> Provider Specialties </Typography>
                    <Typography variant="body2" color="text.secondary"> Manage specialties and primary specialty. </Typography>
                </Box>

                <Button variant="contained" startIcon={<AddIcon />} onClick={() => { setSelectedSpecialty(null); setFormOpen(true); }} > Add Specialty </Button>
            </Stack>

            {/* =====================================================
                    NO SPECIALTIES
            ===================================================== */}
            {specialties.length === 0 && (
                <Paper elevation={0} sx={{ minHeight: 180, border: "1px solid #E5E7EB", borderRadius: 2, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", p: 3 }} >
                    <Typography sx={{ fontWeight: 600, mb: 0.5 }} > No Specialties Added </Typography>

                    <Typography variant="body2" color="text.secondary"> Add a specialty for this provider. </Typography>
                </Paper>
            )}

            {/* =====================================================
                    SPECIALTIES LIST
            ===================================================== */}
            {specialties.length > 0 && (
                <Grid container spacing={2}>
                {specialties.map((specialty) => (
                    <Grid key={specialty.id} size={{ xs: 12, sm: 6, md: 3 }} >
                        <Paper elevation={0} sx={{ border: "1px solid #E5E7EB", borderRadius: 2, p: 2, height: "100%" }} >
                            <Stack direction="row" sx={{ justifyContent:"space-between", alignItems:"center" }} >
                                {/* =================================================
                                    SPECIALTY INFORMATION
                                ================================================= */}

                                <Stack direction="row" spacing={1} alignItems="center">
                                    <Typography sx={{ fontWeight: 600 }} > {specialty.specialty_name} </Typography>
                                    {specialty.is_primary && (
                                        <Chip label="Primary" size="small" color="primary" />
                                    )}
                                </Stack>

                                {/* =================================================
                                            ACTIONS
                                ================================================= */}
                                <Stack direction="row" spacing={0.5}>
                                    <IconButton size="small" color="primary" onClick={() => { setSelectedSpecialty(specialty); setFormOpen(true); }} >
                                        <EditOutlinedIcon fontSize="small" />
                                    </IconButton>

                                    <IconButton size="small" color="error" onClick={() => { setSpecialtyToDelete(specialty); setDeleteOpen(true); }} >
                                        <DeleteOutlineOutlinedIcon fontSize="small" />
                                    </IconButton>
                                </Stack>
                            </Stack>
                        </Paper>
                    </Grid>
                ))}
                </Grid>
            )}

            {/* =====================================================
                    ADD / EDIT SPECIALTY DIALOG
            ===================================================== */}
            <Dialog open={formOpen} onClose={() => { setFormOpen(false); setSelectedSpecialty(null); }} fullWidth maxWidth="sm" >
                <DialogTitle>
                    {selectedSpecialty ? "Edit Specialty" : "Add Specialty"}
                </DialogTitle>

                <DialogContent>
                    <SpecialtyForm specialty={selectedSpecialty} onSubmit={handleSaveSpecialty} onCancel={() => { setFormOpen(false); setSelectedSpecialty(null); }} />
                </DialogContent>
            </Dialog>


            <Dialog open={deleteOpen} onClose={() => { setDeleteOpen(false); setSpecialtyToDelete(null); }} maxWidth="xs" fullWidth >
                <DialogTitle> Delete Specialty </DialogTitle>
                <DialogContent>
                    <Typography> Are you sure you want to delete{" "} <strong> {specialtyToDelete?.specialty_name} </strong> ? </Typography>
                    <Stack direction="row" sx={{ justifyContent:"flex-end", mt:3 }} spacing={1} >
                        <Button variant="outlined" onClick={() => { setDeleteOpen(false); setSpecialtyToDelete(null); }} > Cancel </Button>
                        <Button variant="contained" color="error" onClick={handleDeleteSpecialty} > Delete </Button>
                    </Stack>
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default ProviderSpecialtiesTab;
