import { Chip, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";


const ProviderTable = () => {
    return (
        <Paper elevation={0} sx={{borderRadius: 1, border: "1px solid #E5E7EB" }} >
            <TableContainer>
                <Table size="small" sx={{ "& .MuiTableCell-root": { py: 1.5, } }} >
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Provider</TableCell>
                            <TableCell>Department</TableCell>
                            <TableCell>Specialization</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        <TableRow>
                            <TableCell>1</TableCell>

                            <TableCell>
                                <Typography fontWeight={600}>Dr. John Smith</Typography>
                            </TableCell>

                            <TableCell>Cardiology</TableCell>
                            <TableCell>Cardiologist</TableCell>
                            <TableCell>+91 9876543210</TableCell>

                            <TableCell>
                                <Chip label="Active" color="success" size="small" />
                            </TableCell>

                            <TableCell align="center">
                                <IconButton color="primary"><VisibilityOutlinedIcon /></IconButton>
                                <IconButton color="warning"><EditOutlinedIcon /></IconButton>
                                <IconButton color="error"><DeleteOutlineOutlinedIcon /></IconButton>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                component="div"
                count={1}
                page={0}
                rowsPerPage={10}
                rowsPerPageOptions={[10]}
            />
        </Paper>
    );
};

export default ProviderTable;
