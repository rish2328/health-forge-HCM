import {
    Box,
    Button,
    Chip,
    IconButton,
    Paper,
    Stack,
    Typography
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";


const ProviderSpecialtiesTab = ({ provider, refreshProvider }) => {
    const specialties = provider?.specialties || [];

    return (
        <Box>
            <Stack direction="row" sx={{justifyContent: "space-between", alignItems:"center", mb:3 }} >
                <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700 }} > Provider Specialties </Typography>
                    <Typography variant="body2" color="text.secondary" > Manage specialties and primary specialty. </Typography>
                </Box>
                <Button variant="contained" startIcon={<AddIcon />} > Add Specialty </Button>
            </Stack>

            {specialties.length === 0 && (
                <Paper elevation={0} sx={{ minHeight: 180, border: "1px solid #E5E7EB", borderRadius: 2, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", p: 3 }} >
                    <Typography sx={{ fontWeight: 600, mb: 0.5 }} > No Specialties Added </Typography>
                    <Typography variant="body2" color="text.secondary" > Add a specialty for this provider. </Typography>
                </Paper>
            )}

            {specialties.length > 0 && (
                <Stack spacing={2}>
                    {specialties.map((specialty) => (
                        <Paper key={specialty.id} elevation={0} sx={{ border: "1px solid #E5E7EB", borderRadius: 2, p: 2 }} >
                            <Stack direction="row" justifyContent="space-between" alignItems="center" >
                                {/* Specialty Information */}
                                <Box>
                                    <Stack direction="row" spacing={1} alignItems="center" >
                                        <Typography sx={{ fontWeight: 600 }} > {specialty.specialty_name} </Typography>

                                        {specialty.is_primary && (
                                            <Chip label="Primary" size="small" color="primary" />
                                        )}
                                    </Stack>
                                </Box>

                                {/* Actions */}
                                <Stack direction="row" spacing={0.5} >
                                    <IconButton size="small" color="primary" >
                                        <EditOutlinedIcon fontSize="small" />
                                    </IconButton>
                                    
                                    <IconButton size="small" color="error" >
                                        <DeleteOutlineOutlinedIcon fontSize="small" />
                                    </IconButton>
                                </Stack>
                            </Stack>
                        </Paper>
                    ))}
                </Stack>
            )}
        </Box>
    );
};


export default ProviderSpecialtiesTab;