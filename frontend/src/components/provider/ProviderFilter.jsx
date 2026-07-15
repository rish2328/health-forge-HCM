import { Box, Button, Grid, MenuItem, Paper, TextField } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";

const ProviderFilter = () => {
    return (
        <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 1, border: "1px solid #E5E7EB" }} >
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 4 }}>
                    <TextField fullWidth label="Provider Name" />
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                    <TextField fullWidth select label="Department">
                        <MenuItem value="">All Departments</MenuItem>
                    </TextField>
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                    <TextField fullWidth select label="Status">
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="Active">Active</MenuItem>
                        <MenuItem value="Inactive">Inactive</MenuItem>
                    </TextField>
                </Grid>

                <Grid size={{ xs: 12, md: 2 }} sx={{ display: "flex", gap: 2, alignItems: "center" }} >
                    <Button variant="contained" startIcon={<SearchIcon />} sx={{ height: 56 }} > Search </Button>
                    <Button variant="outlined" startIcon={<RefreshIcon />} sx={{ height: 56 }} > Reset </Button>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default ProviderFilter;
