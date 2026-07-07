import {
    Box,
    Typography,
    Avatar,
} from "@mui/material";

import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";

import AppCard from "./AppCard";

function StatCard({
    title,
    value,
    icon,
    color,
    growth = "+12%",
}) {

    return (

        <AppCard
            sx={{
                height: 145,
                transition: ".3s",

                "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 15px 30px rgba(0,0,0,.08)",
                },
            }}
        >

            <Box
                sx={{
                    height: "100%",
                    p: 2.5,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                }}
            >

                {/* Header */}

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >

                    <Typography
                        sx={{
                            fontSize: 16,
                            fontWeight: 700,
                            color: "#6B7280",
                        }}
                    >
                        {title}
                    </Typography>

                    <Avatar
                        sx={{
                            width: 44,
                            height: 44,
                            bgcolor: `${color}15`,
                            color: color,

                            "& svg": {
                                fontSize: 22,
                            },
                        }}
                    >
                        {icon}
                    </Avatar>

                </Box>

                {/* Value */}

                <Box
                    sx={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                    }}
                >

                    <Typography
                        sx={{
                            fontSize: 34,
                            fontWeight: 700,
                            color: "#111827",
                            lineHeight: 1,
                        }}
                    >
                        {value}
                    </Typography>

                </Box>

                {/* Footer */}

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                    }}
                >

                    <TrendingUpRoundedIcon
                        sx={{
                            color: "#22C55E",
                            fontSize: 18,
                            mr: .5,
                        }}
                    />

                    <Typography
                        sx={{
                            color: "#22C55E",
                            fontWeight: 700,
                            fontSize: 14,
                        }}
                    >
                        {growth}
                    </Typography>

                    <Typography
                        sx={{
                            ml: .7,
                            color: "#94A3B8",
                            fontSize: 13,
                        }}
                    >
                        vs last month
                    </Typography>

                </Box>

            </Box>

        </AppCard>

    );

}

export default StatCard;