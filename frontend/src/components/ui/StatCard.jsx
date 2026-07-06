import { Box, Typography } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

import AppCard from "./AppCard";

const StatCard = ({ title, value, icon, color, growth = "+12%" }) => {
    return (
        <AppCard sx={{ height:190, display:"flex", alignItems:"center" }} >
            <Box display="flex" justifyContent="space-between" alignItems="center" width="100%" >
                <Box>
                    <Typography color="text.secondary" fontSize={14} > {title} </Typography>
                    <Typography variant="h3" mt={1} fontWeight={700} > {value} </Typography>

                    <Box display="flex" alignItems="center" mt={1} >
                        <TrendingUpIcon
                            sx={{
                                color: "#16A34A",
                                fontSize: 18,
                                mr: .5,
                            }}
                        />

                        <Typography fontSize={13} color="#16A34A" > {growth} </Typography>
                    </Box>
                </Box>

                <Box
                    sx={{
                        width: 70,
                        height: 70,
                        borderRadius: "50%",
                        bgcolor: color,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "#fff",
                    }}
                > {icon} </Box>
            </Box>
        </AppCard>
    );
}

export default StatCard;