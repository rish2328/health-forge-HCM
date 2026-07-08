import { Avatar, Chip, CircularProgress, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tooltip, Typography, Box, } from "@mui/material";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { formatDate } from "../../utils/dateFormatter";


const PatientTable = ({
        patients = [],
        loading = false,
        page = 0,
        rowsPerPage = 10,
        totalCount = 0,
        onPageChange = () => {},
        onRowsPerPageChange = () => {},
        onView = () => {},
        onEdit = () => {},
        onDelete = () => {},
    }) => {

    return (
        <Paper elevation={0} sx={{ borderRadius: 3, border: "1px solid #E5E7EB", overflow: "hidden" }} >
            {/* Header */}
            <Stack direction="row" sx={{ px: 3, py: 2, borderBottom: "1px solid #E5E7EB", alignItems: "baseline", justifyContent: "space-between" }} >
                <Typography variant="h6" sx={{ fontWeight:"600" }} >
                    {" "}
                    Patient List{" "}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight:"600" }}>
                    {" "}
                    Total Patients : {totalCount || patients.length}{" "}
                </Typography>
            </Stack>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong> Patient </strong></TableCell>
                            <TableCell><strong> Gender </strong></TableCell>
                            <TableCell><strong> DOB </strong></TableCell>
                            <TableCell><strong> Mobile </strong></TableCell>
                            <TableCell><strong> Email </strong></TableCell>
                            <TableCell><strong> Status </strong></TableCell>

                            <TableCell align="center"><strong> Action </strong></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {/* Loading */}
                        {loading && (
                            <TableRow>
                                <TableCell colSpan={7} align="center">
                                <Box py={5}>
                                    <CircularProgress />
                                </Box>
                                </TableCell>
                            </TableRow>
                        )}

                        {/* Empty */}
                        {!loading && patients.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={7} align="center" sx={{ py: 8 }}>
                                    <Typography variant="h6" color="text.secondary"> No Patients Found </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }} >
                                        Click "Add Patient" to create your first patient.
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}

                        {/* Data */}
                        {!loading &&
                        patients.slice( page * rowsPerPage, page * rowsPerPage + rowsPerPage ).map((patient) => (
                            <TableRow key={patient.uuid} hover>
                                <TableCell>
                                    <Stack direction="row" spacing={2} sx={{alignItems:"center"}}>
                                        <Avatar> {patient.first_name?.charAt(0)?.toUpperCase()} </Avatar>
                                        <Box>
                                            <Typography fontWeight={600}>
                                                {patient.first_name} {patient.middle_name}{" "}
                                                {patient.last_name}
                                            </Typography>

                                            {/* <Typography variant="body2" color="text.secondary"> {patient.uuid} </Typography> */}
                                        </Box>
                                    </Stack>
                                </TableCell>

                                <TableCell>{patient.gender}</TableCell>
                                <TableCell>{formatDate(patient.dob)}</TableCell>
                                <TableCell>{patient.phone}</TableCell>
                                <TableCell>{patient.email}</TableCell>

                                <TableCell>
                                    <Chip label="Active" color="success" size="small" />
                                </TableCell>

                                <TableCell align="center">
                                    <Tooltip title="View">
                                        <IconButton color="primary" onClick={() => onView(patient)} >
                                            <VisibilityOutlinedIcon />
                                        </IconButton>
                                    </Tooltip>

                                    <Tooltip title="Edit">
                                        <IconButton color="warning" onClick={() => onEdit(patient)} >
                                            <EditOutlinedIcon />
                                        </IconButton>
                                    </Tooltip>

                                    <Tooltip title="Delete">
                                        <IconButton color="error" onClick={() => onDelete(patient)} >
                                            <DeleteOutlineOutlinedIcon />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination component="div" count={totalCount || patients.length} page={page} rowsPerPage={rowsPerPage} rowsPerPageOptions={[10, 25, 50]} onPageChange={onPageChange} onRowsPerPageChange={onRowsPerPageChange} />
        </Paper>
    );
};

export default PatientTable;
