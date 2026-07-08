import { Avatar, Box, Button, Divider, Paper, Typography } from "@mui/material";

import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

const appointments = [
    {
        id: 1,
        patient: "John Doe",
        doctor: "Dr. Sarah Johnson",
        department: "Cardiology",
        time: "09:00 AM",
    },
    {
        id: 2,
        patient: "Emma Watson",
        doctor: "Dr. Robert Smith",
        department: "Neurology",
        time: "10:30 AM",
    },
    {
        id: 3,
        patient: "David Smith",
        doctor: "Dr. Michael Lee",
        department: "Orthopedics",
        time: "12:00 PM",
    },
];

const AppointmentList = () => {
    return (
        <Paper
            sx={{
                borderRadius: 4,
                p: 3,
                height: "100%",
                border: "1px solid #EEF2F7",
                boxShadow: "0 8px 25px rgba(15,23,42,.06)",
            }}
        >
        {/* Header */}

            {/* <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} > */}
            <Box sx={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"1em" }} mb={3} >
                <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}> Today's Appointments </Typography>
                    {/* <Typography variant="body2" color="text.secondary"> Upcoming appointments </Typography> */}
                </Box>

                <Button size="small" endIcon={<ArrowForwardRoundedIcon />}> View All </Button>
            </Box>

            {/* Table Header */}

            <Box sx={{ display: "grid", gridTemplateColumns: "1.6fr 1.7fr 1.2fr .9fr", pb: 1.5, borderBottom: "1px solid #E5E7EB", mb: 1 }} >
                <Typography sx={{ fontWeight: 700 }}>Patient</Typography>
                <Typography sx={{ fontWeight: 700 }}>Doctor</Typography>
                <Typography sx={{ fontWeight: 700 }}>Department</Typography>
                <Typography sx={{ fontWeight: 700 }} textAlign="right"> Time </Typography>
            </Box>

            {appointments.map((appointment, index) => (
                <Box key={appointment.id}>
                    <Box sx={{ display: "grid", gridTemplateColumns: "1.6fr 1.7fr 1.2fr .9fr", alignItems: "center", py: 2 }}>
                    
                        {/* Patient */}
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, minWidth: 180 }} >
                            <Avatar
                                sx={{
                                    width: 40,
                                    height: 40,
                                    bgcolor: "#2563EB",
                                    fontWeight: 700,
                                }}
                            >
                                {appointment.patient.charAt(0)}
                            </Avatar>

                            <Typography
                                fontWeight={600}
                                sx={{
                                    whiteSpace: "nowrap",
                                }}
                            >
                                {appointment.patient}
                            </Typography>

                        </Box>

                        {/* Doctor */}
                        <Typography color="text.secondary" fontSize={14}> {appointment.doctor} </Typography>

                        {/* Department */}
                        <Typography fontSize={14}>{appointment.department}</Typography>
                        
                        {/* Time */}
                        <Typography textAlign="right" fontWeight={700} color="primary"> {appointment.time} </Typography>
                    </Box>

                    {index !== appointments.length - 1 && <Divider />}
                </Box>
            ))}
        </Paper>
    );
};

export default AppointmentList;
