import { Card } from "@mui/material";

const AppCard = ({ children, sx = {} }) => {
    return (
        <Card
            sx={{
                borderRadius: 3,
                boxShadow: "0 4px 20px rgba(0,0,0,.08)",
                p: 2,
                ...sx,
            }}
        >
            {children}
        </Card>
    );
}

export default AppCard;