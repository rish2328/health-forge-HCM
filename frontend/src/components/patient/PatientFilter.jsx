import { useState } from "react";
import { Paper, Grid, TextField, MenuItem, Button, Typography, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";


const PatientFilter = () => {
    const [filters, setFilters] = useState({
        search: "",
        mobile: "",
        gender: "",
        status: "",
    });

    const handleChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value,
        });
    };

    const handleReset = () => {
        setFilters({
            search: "",
            mobile: "",
            gender: "",
            status: "",
        });
    };

    return (
        <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 3, border: "1px solid #E5E7EB" }} >
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }} > Search Filters </Typography>

            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 3 }}>
                <TextField fullWidth label="Patient Name" name="search" value={filters.search} onChange={handleChange} autoComplete="off"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                            <SearchIcon fontSize="small" />
                            </InputAdornment>
                        ),
                    }} />
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                    <TextField fullWidth label="Mobile Number" name="mobile" value={filters.mobile} onChange={handleChange} autoComplete="off" />
                </Grid>

                <Grid size={{ xs: 12, md: 2 }}>
                    <TextField select fullWidth label="Gender" name="gender" value={filters.gender} onChange={handleChange} >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                    </TextField>
                </Grid>

                <Grid size={{ xs: 12, md: 2 }}>
                    <TextField select fullWidth label="Status" name="status" value={filters.status} onChange={handleChange} >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="Active">Active</MenuItem>
                        <MenuItem value="Inactive">Inactive</MenuItem>
                    </TextField>
                </Grid>

                <Grid size={{ xs: 12, md: 2 }} sx={{ display: "flex", alignItems: "center", gap: 1 }} >
                    <Button fullWidth variant="contained" startIcon={<SearchIcon />}> Search </Button>
                    <Button fullWidth variant="outlined" startIcon={<RefreshIcon />} onClick={handleReset} > Reset </Button>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default PatientFilter;
