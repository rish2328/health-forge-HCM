import { Box, Typography } from "@mui/material";

const PageHeader = ({ title, subtitle }) => {
    return (
        <Box mb={3}>
            <Typography
                variant="h4"
                sx={{
                    fontWeight:700,
                    mb:.5
                }}
            > {title} </Typography>

            <Typography variant="body1" color="text.secondary" mt={1} > {subtitle} </Typography>
        </Box>
    );
}

export default PageHeader;