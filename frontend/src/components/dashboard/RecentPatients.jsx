import {
  Avatar,
  Box,
  Button,
  Chip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";


const RecentPatients = ({ patients = [] }) => {
    return (
        <Paper sx={{ borderRadius: 4, p: 3, height: "100%", border: "1px solid #EEF2F7", boxShadow: "0 8px 25px rgba(15,23,42,.06)" }} >
        {/* Header */}
            <Box sx={{ display:"flex", alignItems:"center", justifyContent:"space-between" }} mb={3} >
                <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}> Recent Patients </Typography>
                    {/* <Typography variant="body2" color="text.secondary"> Last 3 registered patients </Typography> */}
                </Box>
                <Button endIcon={<ArrowForwardRoundedIcon />} size="small"> View All </Button>
            </Box>

            {/* Table */}
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 700 }}>Patient</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}> Email </TableCell>
                            <TableCell sx={{ fontWeight: 700 }}> Phone </TableCell>
                            <TableCell sx={{ fontWeight: 700 }}> Gender </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {patients.slice(0, 3).map((patient) => (
                            <TableRow key={patient.id} hover sx={{ "&:last-child td": { borderBottom: 0 } }} >
                                {/* Patient */}
                                <TableCell>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, minWidth: 170, }} >
                                        <Avatar sx={{ width: 42, height: 42, bgcolor: "#2563EB", fontWeight: 700 }} > {patient.first_name.charAt(0)} </Avatar>
                                        <Typography fontWeight={600} sx={{ whiteSpace: "nowrap" }} > {patient.first_name}{" "}{patient.last_name} </Typography>
                                    </Box>
                                </TableCell>

                                {/* Email */}
                                <TableCell> {patient.email} </TableCell>

                                {/* Phone Number */}
                                <TableCell> {patient.phone} </TableCell>

                                {/* Gender */}
                                <TableCell>{patient.gender}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}

export default RecentPatients;
