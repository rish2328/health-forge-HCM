import { Button, Grid, MenuItem, Paper, Stack, TextField } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

const AppointmentFilter = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        mb: 3,
        border: "1px solid #E5E7EB",
        borderRadius: 1,
      }}
    >
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 3 }}>
          <TextField
            fullWidth
            size="small"
            label="Patient"
            placeholder="Search Patient"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 2 }}>
          <TextField select fullWidth size="small" label="Provider">
            <MenuItem value="">All Providers</MenuItem>
          </TextField>
        </Grid>

        <Grid size={{ xs: 12, md: 2 }}>
          <TextField select fullWidth size="small" label="Department">
            <MenuItem value="">All Departments</MenuItem>
          </TextField>
        </Grid>

        <Grid size={{ xs: 12, md: 2 }}>
          <TextField select fullWidth size="small" label="Status">
            <MenuItem value="">All Status</MenuItem>

            <MenuItem value="Scheduled">Scheduled</MenuItem>

            <MenuItem value="Confirmed">Confirmed</MenuItem>

            <MenuItem value="Checked In">Checked In</MenuItem>

            <MenuItem value="Completed">Completed</MenuItem>

            <MenuItem value="Cancelled">Cancelled</MenuItem>

            <MenuItem value="No Show">No Show</MenuItem>
          </TextField>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Stack direction="row" spacing={1}>
            <Button fullWidth variant="contained" startIcon={<SearchIcon />}>
              Search
            </Button>

            <Button fullWidth variant="outlined" startIcon={<RestartAltIcon />}>
              Reset
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AppointmentFilter;
