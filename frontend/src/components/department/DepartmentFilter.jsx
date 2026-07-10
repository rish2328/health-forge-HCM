import { Paper, Grid, TextField, MenuItem, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";


const DepartmentFilter = () => {
    return (
        <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 1, border: "1px solid #E5E7EB" }} >
            <Grid container spacing={3}>
                {/* Department Name */}
                <Grid size={{ xs: 12, md: 5 }}>
                    <TextField fullWidth label="Department Name" placeholder="Search Department..." />
                </Grid>

                {/* Status */}
                <Grid size={{ xs: 12, md: 3 }}>
                    <TextField select fullWidth label="Status" defaultValue="">
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="Active">Active</MenuItem>
                        <MenuItem value="Inactive">Inactive</MenuItem>
                    </TextField>
                </Grid>

                {/* Buttons */}
                <Grid size={{ xs: 12, md: 4 }} sx={{ display: "flex", gap: 2, alignItems: "center" }} >
                    <Button variant="contained" startIcon={<SearchIcon />} sx={{ height: 56 }} > Search </Button>
                    <Button variant="outlined" startIcon={<RefreshIcon />} sx={{ height: 56 }} > Reset </Button>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default DepartmentFilter;
