import { useState } from "react";

import { AppBar, Avatar, Badge, Box, IconButton, InputBase, Menu, MenuItem, Paper, Toolbar, Typography } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { useNavigate } from "react-router-dom";


const Header = ({ toggleSidebar }) => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const logout = () => {
        localStorage.removeItem("access_token");
        navigate("/login");
    };


    return (
        <AppBar position="sticky" elevation={0} color="inherit" sx={{ background: "#fff", borderBottom: "1px solid #E5E7EB" }} >
            <Toolbar sx={{ height: 72, display: "flex", justifyContent: "space-between", alignItems: "center", px: 4, gap: 3 }} >
                {/* Left */}

                <Box sx={{ width: 260, display: "flex", alignItems: "center", gap: 2, flexShrink: 0 }} >
                    <IconButton size="large" onClick={toggleSidebar}>
                        <MenuRoundedIcon />
                    </IconButton>

                    <Typography variant="h5" fontWeight={700} sx={{ color: "#111827" }} >
                        {/* Dashboard */}
                    </Typography>
                </Box>

                {/* Right */}
                <Box sx={{ minWidth: 220, display: "flex", alignItems: "center", gap: 2 }} >
                    {/* Search */}

                    <Paper
                        sx={{
                            flexGrow: 1,
                            height: 48,
                            display: "flex",
                            alignItems: "center",
                            px: 2,
                            mx: 3,
                            borderRadius: 3,
                            border: "1px solid #E5E7EB",
                            boxShadow: "none",
                        }} >
                        <SearchRoundedIcon sx={{ color: "#6B7280" }} />

                        <InputBase placeholder="Search patients, appointments, providers..." sx={{ ml: 1, flex: 1 }} />
                    </Paper>

                    {/* Notification */}
                    <IconButton>
                        <Badge badgeContent={4} color="error">
                            <NotificationsRoundedIcon />
                        </Badge>
                    </IconButton>

                    {/* Profile */}
                    <Box
                        onClick={handleMenu}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer",
                        }}
                    >
                        <Avatar
                            sx={{
                                width: 48,
                                height: 48,
                                bgcolor: "#2563EB",
                                mr: 1,
                            }}
                        > A </Avatar>

                        <Box>
                            <Typography fontWeight={700} fontSize={17}> Admin </Typography>
                            <Typography fontSize={12} color="text.secondary"> Administrator </Typography>
                        </Box>

                        <KeyboardArrowDownRoundedIcon />
                    </Box>

                    <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                        <MenuItem>
                            <PersonRoundedIcon sx={{ mr: 1 }} /> Profile
                        </MenuItem>

                        <MenuItem onClick={logout} >
                            <LogoutRoundedIcon sx={{ mr: 1 }} /> Logout
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
