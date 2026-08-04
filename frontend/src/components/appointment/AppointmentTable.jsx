import { Box, Chip, CircularProgress, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tooltip, Typography } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";


const AppointmentTable = ({ appointments = [], loading = false, page = 0, rowsPerPage = 10, totalCount = 0, onPageChange = () => {}, onRowsPerPageChange = () => {}, onView = () => {}, onEdit = () => {}, onDelete = () => {}, }) => {
    
    const getStatusColor = (status) => {
        switch (status) {
            case "Scheduled":
                return "primary";

            case "Confirmed":
                return "success";

            case "Checked In":
                return "warning";

            case "Completed":
                return "success";

            case "Cancelled":
                return "error";

            case "No Show":
                return "default";

            default:
                return "default";
        }
    };

    return (
        <Paper elevation={0} sx={{ border: "1px solid #E5E7EB", borderRadius: 1, overflow: "hidden" }} >
            <Stack direction="row"
                sx={{
                    justifyContent: "space-between",
                    alignItems: "center",
                    px: 3,
                    py: 2,
                    borderBottom: "1px solid #E5E7EB",
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: 600 }}> Appointment List </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}> Total Appointments : {appointments.length} </Typography>
            </Stack>

            <TableContainer>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>#</strong></TableCell>
                            <TableCell><strong>Appointment ID</strong></TableCell>
                            <TableCell><strong>Patient</strong></TableCell>
                            <TableCell><strong>Provider</strong></TableCell>
                            <TableCell><strong>Department</strong></TableCell>
                            <TableCell><strong>Date</strong></TableCell>
                            <TableCell><strong>Time</strong></TableCell>
                            <TableCell><strong>Status</strong></TableCell>
                            <TableCell align="center"><strong>Action</strong></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {loading && (
                            <TableRow>
                                <TableCell colSpan={9} align="center">
                                    <Box py={5}><CircularProgress /></Box>
                                </TableCell>
                            </TableRow>
                        )}

                        {!loading && appointments.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={9} align="center" sx={{ py: 8 }}>
                                    <Typography variant="h6" color="text.secondary"> No Appointments Found </Typography>
                                    <Typography variant="body2" color="text.secondary" mt={1}> Click "Schedule Appointment" to create your first appointment. </Typography>
                                </TableCell>
                            </TableRow>
                        )}

                        {!loading && appointments
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((appointment, index) => (
                                <TableRow key={appointment.uuid} hover>
                                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                    <TableCell>{appointment.appointment_number}</TableCell>
                                    <TableCell>{appointment.patient_name}</TableCell>
                                    <TableCell>{appointment.provider_name}</TableCell>
                                    <TableCell>{appointment.department_name}</TableCell>
                                    <TableCell>{appointment.appointment_date}</TableCell>
                                    <TableCell>{appointment.appointment_time}</TableCell>

                                    <TableCell>
                                        <Chip label={appointment.status} color={getStatusColor(appointment.status)} size="small" />
                                    </TableCell>

                                    <TableCell align="center">
                                        <Tooltip title="View">
                                            <IconButton color="primary" onClick={() => onView(appointment)} > <VisibilityOutlinedIcon /> </IconButton>
                                        </Tooltip>

                                        <Tooltip title="Edit">
                                            <IconButton color="warning" onClick={() => onEdit(appointment)} > <EditOutlinedIcon /> </IconButton>
                                        </Tooltip>

                                        <Tooltip title="Delete">
                                            <IconButton color="error" onClick={() => onDelete(appointment)} > <DeleteOutlineOutlinedIcon /> </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                component="div"
                count={totalCount || appointments.length}
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[10, 25, 50]}
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
            />
        </Paper>
    );
};

export default AppointmentTable;
