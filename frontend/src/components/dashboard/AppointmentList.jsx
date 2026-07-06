import {
    Avatar,
    Box,
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

const patients = [
    {
        id: 1,
        name: "John Doe",
        gender: "Male",
        phone: "9876543210",
        status: "Active",
    },
    {
        id: 2,
        name: "Emma Watson",
        gender: "Female",
        phone: "9876543211",
        status: "Active",
    },
    {
        id: 3,
        name: "David Smith",
        gender: "Male",
        phone: "9876543212",
        status: "Inactive",
    },
    {
        id: 4,
        name: "Olivia Brown",
        gender: "Female",
        phone: "9876543213",
        status: "Active",
    },
];

function RecentPatients() {

    return (

        <Paper
            sx={{
                borderRadius: 4,
                p: 3,
                height: "100%",
                boxShadow: "0 10px 25px rgba(0,0,0,.05)",
            }}
        >

            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={3}
            >

                <Typography
                    variant="h6"
                    fontWeight={700}
                >
                    Recent Patients
                </Typography>

                <Typography
                    color="primary"
                    fontWeight={600}
                    sx={{
                        cursor: "pointer",
                    }}
                >
                    View All
                </Typography>

            </Box>

            <TableContainer>

                <Table>

                    <TableHead>

                        <TableRow>

                            <TableCell>Name</TableCell>

                            <TableCell>Gender</TableCell>

                            <TableCell>Phone</TableCell>

                            <TableCell>Status</TableCell>

                            <TableCell align="center">
                                Action
                            </TableCell>

                        </TableRow>

                    </TableHead>

                    <TableBody>

                        {patients.map((patient) => (

                            <TableRow
                                key={patient.id}
                                hover
                            >

                                <TableCell>

                                    <Box
                                        display="flex"
                                        alignItems="center"
                                    >

                                        <Avatar
                                            sx={{
                                                mr: 2,
                                                bgcolor: "#2563EB",
                                            }}
                                        >
                                            {patient.name.charAt(0)}
                                        </Avatar>

                                        <Typography
                                            fontWeight={600}
                                        >
                                            {patient.name}
                                        </Typography>

                                    </Box>

                                </TableCell>

                                <TableCell>

                                    {patient.gender}

                                </TableCell>

                                <TableCell>

                                    {patient.phone}

                                </TableCell>

                                <TableCell>

                                    <Chip

                                        label={patient.status}

                                        color={
                                            patient.status === "Active"
                                                ? "success"
                                                : "error"
                                        }

                                        size="small"

                                    />

                                </TableCell>

                                <TableCell align="center">

                                    <IconButton
                                        color="primary"
                                    >
                                        <VisibilityRoundedIcon />
                                    </IconButton>

                                    <IconButton
                                        color="warning"
                                    >
                                        <EditRoundedIcon />
                                    </IconButton>

                                </TableCell>

                            </TableRow>

                        ))}

                    </TableBody>

                </Table>

            </TableContainer>

        </Paper>

    );

}

export default RecentPatients;