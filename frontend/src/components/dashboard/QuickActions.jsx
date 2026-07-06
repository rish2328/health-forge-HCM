import {
    Paper,
    Typography,
    Grid,
    Button,
    Box,
} from "@mui/material";

import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import LocalHospitalRoundedIcon from "@mui/icons-material/LocalHospitalRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";

const actions = [
    {
        title: "Add Patient",
        icon: <PersonAddAltRoundedIcon sx={{ fontSize: 32 }} />,
        color: "#2563EB",
    },
    {
        title: "Book Appointment",
        icon: <EventAvailableRoundedIcon sx={{ fontSize: 32 }} />,
        color: "#10B981",
    },
    {
        title: "Add Provider",
        icon: <LocalHospitalRoundedIcon sx={{ fontSize: 32 }} />,
        color: "#8B5CF6",
    },
    {
        title: "Generate Invoice",
        icon: <ReceiptLongRoundedIcon sx={{ fontSize: 32 }} />,
        color: "#F59E0B",
    },
];

function QuickActions() {

    return (

        <Paper
            sx={{
                p: 3,
                borderRadius: 4,
                boxShadow: "0 10px 25px rgba(0,0,0,.05)",
                height: "100%",
            }}
        >

            <Typography
                variant="h6"
                fontWeight={700}
                mb={3}
            >
                Quick Actions
            </Typography>

            <Grid
                container
                spacing={2}
            >

                {actions.map((action) => (

                    <Grid
                        item
                        xs={6}
                        key={action.title}
                    >

                        <Button

                            fullWidth

                            sx={{

                                height: 120,

                                borderRadius: 3,

                                background: "#F9FAFB",

                                display: "flex",

                                flexDirection: "column",

                                gap: 1,

                                color: action.color,

                                border: "1px solid #E5E7EB",

                                "&:hover": {

                                    background: action.color,

                                    color: "#fff",

                                    transform: "translateY(-3px)",

                                },

                                transition: ".3s",

                            }}

                        >

                            <Box>

                                {action.icon}

                            </Box>

                            <Typography
                                fontWeight={600}
                                fontSize={13}
                            >
                                {action.title}
                            </Typography>

                        </Button>

                    </Grid>

                ))}

            </Grid>

        </Paper>

    );

}

export default QuickActions;