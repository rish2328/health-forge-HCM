import { Card } from "@mui/material";

function AppCard({ children, sx = {} }) {

    return (

        <Card

            sx={{

                width: "100%",

                borderRadius: 2,

                overflow: "hidden",

                position: "relative",

                background: "#FFFFFF",

                boxShadow: "0 8px 25px rgba(15,23,42,.06)",

                border: "1px solid #EEF2F7",

                transition: ".3s",

                "&:hover": {

                    transform: "translateY(-4px)",

                    boxShadow: "0 18px 35px rgba(15,23,42,.10)",

                },

                ...sx,

            }}

        >

            {children}

        </Card>

    );

}

export default AppCard;