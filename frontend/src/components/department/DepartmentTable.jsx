import { Box, Chip, CircularProgress, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tooltip, Typography } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";


const DepartmentTable = ({
    departments = [],
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
        <Paper elevation={0} sx={{ borderRadius: 1, border: "1px solid #E5E7EB", overflow: "hidden" }} >
            {/* Header */}
            <Stack direction="row" sx={{ px: 3, py: 2, borderBottom: "1px solid #E5E7EB", justifyContent: "space-between", alignItems: "center" }} >
                <Typography variant="h6" sx={{fontWeight:600}}> Department List </Typography>
                <Typography variant="body2" color="text.secondary" sx={{fontWeight:600}}> Total Departments : {totalCount || departments.length} </Typography>
            </Stack>

            <TableContainer>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell width={70}><strong>#</strong></TableCell>
                            <TableCell><strong>Department</strong></TableCell>
                            <TableCell><strong>Code</strong></TableCell>
                            <TableCell><strong>Description</strong></TableCell>
                            <TableCell><strong>Status</strong></TableCell>
                            <TableCell align="center"><strong>Action</strong></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {/* Loading */}
                        {loading && (
                            <TableRow>
                                <TableCell colSpan={6} align="center">
                                    <Box py={5}><CircularProgress /></Box>
                                </TableCell>
                            </TableRow>
                        )}

                        {/* Empty */}
                        {!loading && departments.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} align="center" sx={{ py: 8, fontStyle: "italic" }}>
                                    <Typography variant="h6" color="text.secondary"> No Departments Found </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }} >
                                        Click "Add Department" to create your first department.
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}

                        {/* Data */}
                        {!loading && departments.map((department, index) => (
                            <TableRow key={department.uuid} hover>
                                <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                <TableCell><Typography fontWeight={600}> {department.name} </Typography></TableCell>
                                <TableCell>{department.code}</TableCell>
                                <TableCell>{department.description || "--"}</TableCell>
                                <TableCell>
                                    <Chip label={ department.status === true ? "Active" : "Inactive" } color={ department.status === true ? "success" : "default" } size="small" />
                                </TableCell>

                                <TableCell align="center">
                                    <Tooltip title="Edit">
                                        <IconButton color="warning" onClick={() => onEdit(department)} >
                                            <EditOutlinedIcon />
                                        </IconButton>
                                    </Tooltip>

                                    <Tooltip title="Delete">
                                        <IconButton color="error" onClick={() => onDelete(department)} >
                                            <DeleteOutlineOutlinedIcon />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination component="div" count={totalCount || departments.length} page={page} rowsPerPage={rowsPerPage} rowsPerPageOptions={[10, 25, 50]} onPageChange={onPageChange} onRowsPerPageChange={onRowsPerPageChange} />
        </Paper>
    );
};

export default DepartmentTable;
