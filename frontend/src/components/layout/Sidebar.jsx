import { NavLink, useNavigate } from "react-router-dom";

import {
    Box,
    Drawer,
    Toolbar,
    Typography,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
} from "@mui/material";

import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import EventRoundedIcon from "@mui/icons-material/EventRounded";
import LocalHospitalRoundedIcon from "@mui/icons-material/LocalHospitalRounded";
import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
import ScienceRoundedIcon from "@mui/icons-material/ScienceRounded";
import MedicationRoundedIcon from "@mui/icons-material/MedicationRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import AssessmentRoundedIcon from "@mui/icons-material/AssessmentRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

const drawerWidth = 260;

const menus = [
    {
        title: "Dashboard",
        icon: <DashboardRoundedIcon />,
        path: "/dashboard",
    },
    {
        title: "Patients",
        icon: <PeopleAltRoundedIcon />,
        path: "/patients",
    },
    {
        title: "Appointments",
        icon: <EventRoundedIcon />,
        path: "/appointments",
    },
    {
        title: "Providers",
        icon: <LocalHospitalRoundedIcon />,
        path: "/providers",
    },
    {
        title: "Departments",
        icon: <ApartmentRoundedIcon />,
        path: "/departments",
    },
    {
        title: "Laboratory",
        icon: <ScienceRoundedIcon />,
        path: "/laboratory",
    },
    {
        title: "Pharmacy",
        icon: <MedicationRoundedIcon />,
        path: "/pharmacy",
    },
    {
        title: "Billing",
        icon: <ReceiptLongRoundedIcon />,
        path: "/billing",
    },
    {
        title: "Reports",
        icon: <AssessmentRoundedIcon />,
        path: "/reports",
    },
    {
        title: "Settings",
        icon: <SettingsRoundedIcon />,
        path: "/settings",
    },
];

function Sidebar() {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("access_token");

        navigate("/");

    };

    return (

        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,

                "& .MuiDrawer-paper": {

                    width: drawerWidth,

                    background: "#111827",

                    color: "#fff",

                    borderRight: 0,

                    overflowX: "hidden",

                },

            }}
        >

            <Toolbar
                sx={{
                    justifyContent: "center",
                    py: 4,
                }}
            >

                <Box textAlign="center">

                    <Typography
                        variant="h5"
                        fontWeight={700}
                    >
                        Health Forge
                    </Typography>

                    <Typography
                        variant="caption"
                        sx={{
                            color: "#9CA3AF",
                        }}
                    >
                        Healthcare ERP
                    </Typography>

                </Box>

            </Toolbar>

            <Divider
                sx={{
                    borderColor: "#374151",
                }}
            />

            <List sx={{ mt: 2 }}>

                {menus.map((menu) => (

                    <NavLink
                        key={menu.title}
                        to={menu.path}
                        style={{
                            textDecoration: "none",
                            color: "inherit",
                        }}
                    >

                        {({ isActive }) => (

                            <ListItemButton

                                sx={{

                                    mx: 1.5,

                                    mb: 1,

                                    borderRadius: 2,

                                    bgcolor: isActive
                                        ? "#2563EB"
                                        : "transparent",

                                    "&:hover": {

                                        bgcolor: "#1D4ED8",

                                    },

                                }}

                            >

                                <ListItemIcon
                                    sx={{
                                        color: "#fff",
                                        minWidth: 40,
                                    }}
                                >
                                    {menu.icon}
                                </ListItemIcon>

                                <ListItemText
                                    primary={menu.title}
                                />

                            </ListItemButton>

                        )}

                    </NavLink>

                ))}

            </List>

            <Box flexGrow={1} />

            <Divider
                sx={{
                    borderColor: "#374151",
                }}
            />

            <List>

                <ListItemButton
                    onClick={logout}
                    sx={{
                        m: 2,
                        borderRadius: 2,

                        "&:hover": {

                            bgcolor: "#DC2626",

                        },
                    }}
                >

                    <ListItemIcon
                        sx={{
                            color: "#fff",
                        }}
                    >
                        <LogoutRoundedIcon />
                    </ListItemIcon>

                    <ListItemText
                        primary="Logout"
                    />

                </ListItemButton>

            </List>

        </Drawer>

    );

}

export default Sidebar;