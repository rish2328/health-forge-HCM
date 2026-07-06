import {
    Avatar,
    Box,
    Divider,
    Paper,
    Typography,
} from "@mui/material";

import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import PaymentRoundedIcon from "@mui/icons-material/PaymentRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";

const activities = [
    {
        id: 1,
        title: "New Patient Registered",
        subtitle: "John Doe",
        time: "5 min ago",
        color: "#2563EB",
        icon: <PersonAddAltRoundedIcon />,
    },
    {
        id: 2,
        title: "Appointment Booked",
        subtitle: "Emma Watson",
        time: "20 min ago",
        color: "#10B981",
        icon: <EventAvailableRoundedIcon />,
    },
    {
        id: 3,
        title: "Invoice Generated",
        subtitle: "₹ 3,500",
        time: "45 min ago",
        color: "#F59E0B",
        icon: <PaymentRoundedIcon />,
    },
    {
        id: 4,
        title: "Lab Report Uploaded",
        subtitle: "David Smith",
        time: "1 hour ago",
        color: "#8B5CF6",
        icon: <DescriptionRoundedIcon />,
    },
];

function ActivityTimeline() {

    return (

        <Paper
            sx={{
                p: 3,
                borderRadius: 4,
                height: "100%",
                boxShadow: "0 10px 25px rgba(0,0,0,.05)",
            }}
        >

            <Typography
                variant="h6"
                fontWeight={700}
                mb={3}
            >
                Recent Activities
            </Typography>

            {activities.map((activity, index) => (

                <Box key={activity.id}>

                    <Box
                        display="flex"
                        alignItems="center"
                    >

                        <Avatar
                            sx={{
                                bgcolor: activity.color,
                                mr: 2,
                            }}
                        >
                            {activity.icon}
                        </Avatar>

                        <Box flex={1}>

                            <Typography
                                fontWeight={600}
                            >
                                {activity.title}
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                {activity.subtitle}
                            </Typography>

                        </Box>

                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                            {activity.time}
                        </Typography>

                    </Box>

                    {index !== activities.length - 1 && (
                        <Divider sx={{ my: 2 }} />
                    )}

                </Box>

            ))}

        </Paper>

    );

}

export default ActivityTimeline;