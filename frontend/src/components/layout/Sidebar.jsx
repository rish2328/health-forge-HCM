import { NavLink, useNavigate } from "react-router-dom";
import { Box, Drawer, Toolbar, Typography, List, ListItemButton, ListItemIcon, ListItemText, Divider } from "@mui/material";
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
const collapsedWidth = 80;

const menus = [
    {
        title: "Dashboard",
        icon: <DashboardRoundedIcon />,
        path: "/",
    },
    {
        title: "Patients",
        icon: <PeopleAltRoundedIcon />,
        path: "/patients",
    },
    {
        title: "Departments",
        icon: <ApartmentRoundedIcon />,
        path: "/departments",
    },
    {
        title: "Providers",
        icon: <LocalHospitalRoundedIcon />,
        path: "/providers",
    },
    {
        title: "Appointments",
        icon: <EventRoundedIcon />,
        path: "/appointments",
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

const Sidebar = ({ open }) => {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("access_token");
        navigate("/login");
    };

    return (
        <Drawer variant="permanent" sx={{ width: open ? drawerWidth : collapsedWidth, flexShrink: 0, transition: ".3s", "& .MuiDrawer-paper": { width: open ? drawerWidth : collapsedWidth, transition: ".3s", overflowX: "hidden", background: "#111827", color: "#fff", borderRight: 0 } }} >
        {/* Logo */}

            <Toolbar sx={{ height: 72, minHeight: "72px !important", justifyContent: open ? "center" : "center" }} >
                {open ? (
                    <Box textAlign="center">
                        <Typography variant="h5" fontWeight={700}> Health Forge </Typography>
                        <Typography variant="caption" sx={{ color: "#9CA3AF" }} > Healthcare ERP </Typography>
                    </Box>
                ) : (
                    <Typography variant="h5" fontWeight={700}> HF </Typography>
                )}
            </Toolbar>
            <Divider sx={{ borderColor: "#374151" }} />

            <List sx={{ mt: 2 }}>
                {menus.map((menu) => (
                    <NavLink key={menu.title} to={menu.path} style={{ textDecoration: "none", color: "inherit" }} >
                        {({ isActive }) => (
                            <ListItemButton sx={{ mx: 1.5, mb: 1, minHeight: 50, justifyContent: open ? "initial" : "center", borderRadius: 1, bgcolor: isActive ? "#2563EB" : "transparent", "&:hover": { bgcolor: "#1D4ED8", } }} >
                                <ListItemIcon sx={{ color: "#fff", minWidth: open ? 40 : 0, mr: open ? 2 : 0, justifyContent: "center" }} > {menu.icon} </ListItemIcon>

                                {open && <ListItemText primary={menu.title} />}
                            </ListItemButton>
                        )}
                    </NavLink>
                ))}
            </List>

            <Box flexGrow={1} />

            <Divider sx={{ borderColor: "#374151" }} />

            <List>
                <ListItemButton onClick={logout} sx={{ m: 2, borderRadius: 1, justifyContent: open ? "initial" : "center", "&:hover": { bgcolor: "#DC2626", } }} >
                <ListItemIcon sx={{ color: "#fff", minWidth: open ? 40 : 0, mr: open ? 2 : 0 }} >
                    <LogoutRoundedIcon />
                </ListItemIcon>

                {open && <ListItemText primary="Logout" />}
                </ListItemButton>
            </List>
        </Drawer>
    );
}

export default Sidebar;
