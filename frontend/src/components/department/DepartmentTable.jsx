import { Box, Chip, CircularProgress, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tooltip, Typography } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { formatDate } from "../../utils/helpers";


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
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Department</strong></TableCell>
                            <TableCell><strong>Code</strong></TableCell>
                            <TableCell><strong>Description</strong></TableCell>
                            <TableCell><strong>Status</strong></TableCell>
                            <TableCell><strong>Created</strong></TableCell>
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
                        {!loading && departments.map((department) => (
                            <TableRow key={department.uuid} hover>
                                <TableCell>
                                    <Typography fontWeight={600}> {department.department_name} </Typography>
                                </TableCell>
                                <TableCell>{department.department_code}</TableCell>
                                <TableCell>{department.description || "--"}</TableCell>
                                <TableCell>
                                    <Chip label={ department.status === true || department.status === "Active" ? "Active" : "Inactive" } color={ department.status === true || department.status === "Active" ? "success" : "default" } size="small" />
                                </TableCell>

                                <TableCell>{formatDate(department.created_at)}</TableCell>
                                <TableCell align="center">
                                    <Tooltip title="View">
                                        <IconButton color="primary" onClick={() => onView(department)} >
                                            <VisibilityOutlinedIcon />
                                        </IconButton>
                                    </Tooltip>

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
