import { Chip, CircularProgress, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";


const ProviderTable = ({ providers = [], loading = false, page = 1, rowsPerPage = 10, totalCount = 0, onRowsPerPageChange, onPageChange, onView, onEdit, onDelete, }) => {
    return (
        <Paper elevation={0} sx={{ borderRadius: 1, border: "1px solid #E5E7EB" }} >
            <TableContainer>
                <Table size="small" sx={{ "& .MuiTableCell-root": { py: 1.0, } }} >
                    <TableHead>
                        <TableRow>
                            <TableCell width={60}><strong> # </strong></TableCell>
                            <TableCell><strong> Provider </strong></TableCell>
                            <TableCell><strong> Department </strong></TableCell>
                            <TableCell><strong> Designation </strong></TableCell>
                            <TableCell><strong> Phone </strong></TableCell>
                            <TableCell><strong> Email </strong></TableCell>
                            <TableCell><strong> Status </strong></TableCell>
                            <TableCell align="center" width={160}><strong> Action </strong></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={8} align="center"><CircularProgress size={28} /></TableCell>
                            </TableRow>
                        ) : providers.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={8} align="center">No providers found.</TableCell>
                            </TableRow>
                        ) : (
                            providers.slice( page * rowsPerPage, page * rowsPerPage + rowsPerPage ).map((provider, index) => (
                                <TableRow key={provider.uuid} hover >
                                    <TableCell> {page * rowsPerPage + index + 1} </TableCell>

                                    <TableCell>
                                        <Typography fontWeight={600}> {provider.title}{" "} {provider.first_name}{" "} {provider.middle_name}{" "} {provider.last_name} </Typography>
                                    </TableCell>

                                    <TableCell> {provider.department_name || "-"} </TableCell>

                                    <TableCell> {provider.designation || "-"} </TableCell>

                                    <TableCell> {provider.phone} </TableCell>

                                    <TableCell> {provider.email} </TableCell>

                                    <TableCell>
                                        <Chip size="small" label={provider.status == true ? "Active" : "In-Active"} color={ provider.status == true ? "success" : "default" } />
                                    </TableCell>

                                    <TableCell align="center">
                                        <IconButton color="primary" onClick={() => onView(provider.uuid) } >
                                            <VisibilityOutlinedIcon />
                                        </IconButton>

                                        <IconButton color="warning" onClick={() => onEdit(provider.uuid) } >
                                            <EditOutlinedIcon />
                                        </IconButton>

                                        <IconButton color="error" onClick={() => onDelete(provider.uuid) } >
                                            <DeleteOutlineOutlinedIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                component="div"
                count={totalCount}
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[10, 25, 50]}
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
            />
        </Paper>
    );
};

export default ProviderTable;