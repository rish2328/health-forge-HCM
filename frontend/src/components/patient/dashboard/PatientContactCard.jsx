import { Box, Button, Card, CardContent, Divider, Grid, IconButton, Paper, Stack, Tooltip, Typography, } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useState } from "react";
import ContactDialog from "../dialogs/ContactDialog";
import { createPatientContact, updatePatientContact, deletePatientContact } from "../../../api/patientApi";
import { toast } from "react-toastify";
import ConfirmDialog from "../../common/ConfirmDialog";


const CONTACT_TYPE_LABELS = {
    Emergency: "🚨 Emergency Contact(s)",
    Other: "📍 Other Contact(s)",
};

const PatientContactTab = ({ patient, setPatient }) => {

    console.log('check-patient', patient)
    const contacts = patient?.contact || [];

    console.log('check-contacts', contacts)

    const [openDialog, setOpenDialog] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);
    const [dialogMode, setDialogMode] = useState("add");
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const groupedContacts = {
        Emergency: contacts.filter(
            (item) => item.is_emergency_contact
        ),

        Other: contacts.filter(
            (item) => !item.is_emergency_contact
        ),
    };


    const handleSaveContact = async ({ mode, addressId, data }) => {
        try {
            const payload = { patient_uuid: patient.uuid, ...data, };

            if (mode === "add") {
                const response = await createPatientContact(payload);
                const newContact = response.data.data;
                setPatient((prev) => ({
                    ...prev,
                    contact: [...(prev.contact || []), newContact],
                }));
                toast.success(response.data.message);
            }
            else {
                const response = await updatePatientContact( addressId, patient.uuid, payload );
                const updatedContact = response.data.data;

                setPatient((prev) => ({
                    ...prev,
                    contact: prev.contact.map((addr) =>
                        addr.id === updatedContact.id
                            ? updatedContact
                            : addr
                    ),
                }));

                toast.success(response.data.message);
            }

            setOpenDialog(false);
            setSelectedContact(null);
        }
        catch (error) {
            toast.error( error?.response?.data?.message || "Failed to save address." );
        }
    };

    const handleDeleteContact = async () => {
        try {
            const response = await deletePatientContact( selectedAddress.id, patient.uuid );
            setPatient((prev) => ({
                ...prev,
                contact: prev.contact.filter(
                    (item) => item.id !== selectedAddress.id
                ),
            }));

            toast.success(response.data.message);

            setDeleteDialogOpen(false);
            setSelectedContact(null);
        } catch (error) {
            toast.error( error?.response?.data?.message || "Failed to delete address." );
        }
    };



    return (
        <Box>
            {/* Header */}
            <Stack direction="row" mb={3} sx={{justifyContent:"space-between", alignItems:"center", marginBottom: "10px" }} >
                <Typography variant="h6" sx={{fontWeight:600 }}> Contact Information </Typography>
                <Button variant="contained" startIcon={<AddIcon />} onClick={() => { setSelectedContact(null); setDialogMode("add"); setOpenDialog(true); }}> Add Contact </Button>
            </Stack>

            {Object.keys(groupedContacts).length === 0 && (
                <Paper variant="outlined" sx={{ p: 5, textAlign: "center", borderRadius: 1 }} >
                    <Typography variant="h6">No Address Found</Typography>

                    <Typography color="text.secondary" mt={1}>
                        Click "Add Address" to create the first address.
                    </Typography>
                </Paper>
            )}

            {/* Address Groups */}
            {Object.entries(groupedContacts).map(([type, contactList]) => (
                <Card key={type} elevation={0} sx={{ mb: 3, border: "1px solid #E5E7EB", borderRadius: 1 }} >
                    <CardContent>
                        {/* Card Header */}
                        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2} >
                            <Box>
                                <Typography variant="h6" sx={{fontWeight:600}}> {CONTACT_TYPE_LABELS[type] || `${type} Contact(s)`} </Typography>
                            </Box>
                        </Stack>
                        <Divider sx={{ mb: 3 }} />

                        {/* Addresses */}
                        <Stack spacing={2}>
                            {contactList.map((contact) => (
                                <Paper key={contact.id} variant="outlined" sx={{ p: 2, borderRadius: 1 }}>

                                    {/* Contact Header */}
                                    <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }} mb={2} >
                                        <Typography variant="subtitle1" sx={{fontWeight:600}}> {contact.name} </Typography>
                                        <Stack direction="row" spacing={1}>
                                            <Tooltip title="Edit Contact">
                                                <IconButton color="primary" size="small" onClick={() => { setSelectedContact(contact); setDialogMode("edit"); setOpenDialog(true); }} >
                                                    <EditOutlinedIcon />
                                                </IconButton>
                                            </Tooltip>

                                            <Tooltip title="Delete Contact">
                                                <IconButton color="error" size="small" onClick={() => { setSelectedContact(contact); setDeleteDialogOpen(true); }} >
                                                    <DeleteOutlineOutlinedIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </Stack>
                                    </Stack>

                                    <Grid container spacing={3}>
                                        <Grid size={{ xs: 12, md: 3 }}>
                                            <Typography variant="body2" color="text.secondary" sx={{fontWeight:600}}> Name </Typography>
                                            <Typography>{contact.name}</Typography>
                                        </Grid>

                                        <Grid size={{ xs: 12, md: 3 }}>
                                            <Typography variant="body2" color="text.secondary" sx={{fontWeight:600}}> Relation </Typography>
                                            <Typography>{contact.relation}</Typography>
                                        </Grid>

                                        <Grid size={{ xs: 12, md: 3 }}>
                                            <Typography variant="body2" color="text.secondary" sx={{fontWeight:600}}> Phone </Typography>
                                            <Typography>{contact.phone}</Typography>
                                        </Grid>

                                        <Grid size={{ xs: 12, md: 3 }}>
                                            <Typography variant="body2" color="text.secondary" sx={{fontWeight:600}}> Emergency </Typography>
                                            <Typography> {contact.is_emergency_contact ? "Yes" : "No"} </Typography>
                                        </Grid>

                                        <Grid size={{ xs: 12, md: 3 }}>
                                            <Typography variant="body2" color="text.secondary" sx={{fontWeight:600}}> Email </Typography>
                                            <Typography>{contact.email || "--"}</Typography>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            ))}
                        </Stack>
                    </CardContent>
                </Card>
            ))}

            <ContactDialog
                open={openDialog}
                mode={dialogMode}
                patientUUID={patient?.uuid}
                initialData={selectedContact}
                onClose={() => { setOpenDialog(false); setSelectedContact(null); }}
                onSuccess={handleSaveContact}
            />

            <ConfirmDialog
                open={deleteDialogOpen}
                title="Delete Contact"
                message="Are you sure you want to delete this contact?"
                onClose={() => {
                    setDeleteDialogOpen(false);
                    setSelectedContact(null);
                }}
                onConfirm={handleDeleteContact}
            />
        </Box>
    );
};

export default PatientContactTab;
