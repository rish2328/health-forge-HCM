import { Box, Typography, Button, Avatar, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import EventIcon from "@mui/icons-material/Event";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const WelcomeCard = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{ background: "linear-gradient(135deg,#2563EB 0%,#1D4ED8 100%)", color: "#fff", borderRadius: 4, px: 5, py: 3, mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", boxShadow: "0 15px 35px rgba(37,99,235,.25)" }} >
        {/* Left */}

            <Box>
                <Typography variant="h4" fontWeight={700}> Welcome Back 👋 </Typography>

                <Typography sx={{ opacity: 0.9, maxWidth: "50em" }} > Monitor your healthcare system, appointments, providers, patients and revenue from one place. </Typography>

                <Stack direction="row" spacing={2} mt={4} sx={{ marginTop: "10px" }} >
                    <Button variant="contained" startIcon={<PersonAddIcon />} sx={{ bgcolor: "#fff", color: "#2563EB", fontWeight: 600, "&:hover": { bgcolor: "#F9FAFB", } }} onClick={() => navigate("/patients/add")} > Add Patient </Button>

                    <Button variant="outlined" startIcon={<EventIcon />} sx={{ borderColor: "#fff", color: "#fff", "&:hover": { borderColor: "#fff", bgcolor: "rgba(255,255,255,.08)" } }} onClick={() => navigate("/appointments/add")} > Appointment </Button>
                </Stack>
            </Box>

            {/* Right */}

            <Avatar sx={{ width: 130, height: 130, bgcolor: "rgba(255,255,255,.15)" }} >
                <AddIcon sx={{ fontSize: 60 }} />
            </Avatar>
        </Box>
    );
};

export default WelcomeCard;
