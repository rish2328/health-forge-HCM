import { Box, Button, Card, CardContent, Divider, Grid, IconButton, Paper, Stack, Tooltip, Typography, } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useState } from "react";
import AddressDialog from "../dialogs/AddressDialog";
import { createPatientAddress, updatePatientAddress, deletePatientAddress } from "../../../api/patientApi";
import { toast } from "react-toastify";
import ConfirmDialog from "../../common/ConfirmDialog";


const ADDRESS_TYPE_LABELS = {
    Home: "🏠 Home Address(s)",
    Office: "🏢 Office Address(s)",
    Permanent: "📍 Permanent Address(s)",
    Current: "📌 Current Address(s)",
    Mailing: "✉️ Mailing Address(s)",
    Billing: "💳 Billing Address(s)",
    Work: "💼 Work Address(s)",
    Emergency: "🚨 Emergency Address(s)",
    Temporary: "⏳ Temporary Address(s)",
    Other: "📍 Other Address(s)",
};

const PatientAddressTab = ({ patient, setPatient }) => {

    const addresses = patient?.addresses || [];
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [dialogMode, setDialogMode] = useState("add");
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const groupedAddresses = addresses.reduce((acc, address) => {
        const type = address.address_type || "Other";
        if (!acc[type]) {
            acc[type] = [];
        }
        acc[type].push(address);
        return acc;
    }, {});


    const handleSaveAddress = async ({ mode, addressId, data }) => {
        try {
            const payload = { patient_uuid: patient.uuid, ...data, };

            if (mode === "add") {
                const response = await createPatientAddress(payload);
                const newAddress = response.data.data;
                setPatient((prev) => ({
                    ...prev,
                    addresses: [...(prev.addresses || []), newAddress],
                }));
                toast.success(response.data.message);
            }
            else {
                const response = await updatePatientAddress( addressId, patient.uuid, payload );
                const updatedAddress = response.data.data;

                setPatient((prev) => ({
                    ...prev,
                    addresses: prev.addresses.map((addr) =>
                        addr.id === updatedAddress.id
                            ? updatedAddress
                            : addr
                    ),
                }));

                toast.success(response.data.message);
            }

            setOpenDialog(false);
            setSelectedAddress(null);
        }
        catch (error) {
            toast.error( error?.response?.data?.message || "Failed to save address." );
        }
    };

    const handleDeleteAddress = async () => {
        try {
            const response = await deletePatientAddress( selectedAddress.id, patient.uuid );
            setPatient((prev) => ({
                ...prev,
                addresses: prev.addresses.filter(
                    (item) => item.id !== selectedAddress.id
                ),
            }));

            toast.success(response.data.message);

            setDeleteDialogOpen(false);
            setSelectedAddress(null);
        } catch (error) {
            toast.error( error?.response?.data?.message || "Failed to delete address." );
        }
    };



    return (
        <Box>
            {/* Header */}
            <Stack direction="row" mb={3} sx={{justifyContent:"space-between", alignItems:"center", marginBottom: "10px" }} >
                <Typography variant="h6" sx={{fontWeight:600 }}> Address Information </Typography>
                <Button variant="contained" startIcon={<AddIcon />} onClick={() => { setSelectedAddress(null); setDialogMode("add"); setOpenDialog(true); }}> Add Address </Button>
            </Stack>

            {Object.keys(groupedAddresses).length === 0 && (
                <Paper variant="outlined" sx={{ p: 5, textAlign:"center", borderRadius:1, fontStyle:"italic" }} >
                    <Typography variant="h6">No Address Found</Typography>

                    <Typography color="text.secondary" mt={1}> Click "Add Address" to create the first address. </Typography>
                </Paper>
            )}

            {/* Address Groups */}
            {Object.entries(groupedAddresses).map(([type, addressList]) => (
                <Card key={type} elevation={0} sx={{ mb: 3, border: "1px solid #E5E7EB", borderRadius: 1 }} >
                    <CardContent>
                        {/* Card Header */}
                        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2} >
                            <Box>
                                <Typography variant="h6" sx={{fontWeight:600}}> {ADDRESS_TYPE_LABELS[type] || `${type} Address(s)`} </Typography>
                            </Box>
                        </Stack>
                        <Divider sx={{ mb: 3 }} />

                        {/* Addresses */}
                        <Stack spacing={2}>
                            {addressList.map((address, index) => (
                                <Paper key={address.id} variant="outlined" sx={{ p: 2, borderRadius: 1 }} >
                                    {/* Address Header */}
                                    <Stack direction="row" sx={{justifyContent:"space-between", alignItems:"center" }} mb={2} >
                                        <Stack direction="row" spacing={1}>
                                            <Tooltip title="Edit Address">
                                                <IconButton color="primary" size="small" onClick={() => { setSelectedAddress(address); setDialogMode("edit"); setOpenDialog(true); }}>
                                                    <EditOutlinedIcon />
                                                </IconButton>
                                            </Tooltip>

                                            <Tooltip title="Delete Address">
                                                <IconButton color="error" size="small" onClick={() => { setSelectedAddress(address); setDeleteDialogOpen(true); }}>
                                                    <DeleteOutlineOutlinedIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </Stack>
                                    </Stack>

                                    <Grid container spacing={3}>
                                        <Grid size={{ xs: 12, md: 6 }}>
                                            <Typography variant="body2" color="text.secondary" sx={{fontWeight:600}} > Address Line 1: </Typography>
                                            <Typography>{address.address_line_1}</Typography>
                                        </Grid>

                                        <Grid size={{ xs: 12, md: 6 }}>
                                            <Typography variant="body2" color="text.secondary" sx={{fontWeight:600}} > Address Line 2: </Typography>
                                            <Typography>{address.address_line_2 || "--"}</Typography>
                                        </Grid>

                                        <Grid size={{ xs: 12, md: 3 }}>
                                            <Typography variant="body2" color="text.secondary" sx={{fontWeight:600}} > City: </Typography>
                                            <Typography>{address.city}</Typography>
                                        </Grid>

                                        <Grid size={{ xs: 12, md: 3 }}>
                                            <Typography variant="body2" color="text.secondary" sx={{fontWeight:600}} > State: </Typography>
                                            <Typography>{address.state}</Typography>
                                        </Grid>

                                        <Grid size={{ xs: 12, md: 3 }}>
                                            <Typography variant="body2" color="text.secondary" sx={{fontWeight:600}} > Country: </Typography>
                                            <Typography>{address.country}</Typography>
                                        </Grid>

                                        <Grid size={{ xs: 12, md: 3 }}>
                                            <Typography variant="body2" color="text.secondary" sx={{fontWeight:600}} > Postal Code: </Typography>
                                            <Typography>{address.postal_code}</Typography>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            ))}
                        </Stack>
                    </CardContent>
                </Card>
            ))}

            <AddressDialog
                open={openDialog}
                mode={dialogMode}
                patientUUID={patient?.uuid}
                initialData={selectedAddress}
                onClose={() => { setOpenDialog(false); setSelectedAddress(null); }}
                onSuccess={handleSaveAddress}
            />

            <ConfirmDialog
                open={deleteDialogOpen}
                title="Delete Address"
                message="Are you sure you want to delete this address?"
                onClose={() => {
                    setDeleteDialogOpen(false);
                    setSelectedAddress(null);
                }}
                onConfirm={handleDeleteAddress}
            />
        </Box>
    );
};

export default PatientAddressTab;
