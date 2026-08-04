import {
    Button,
    Divider,
    Grid,
    MenuItem,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

const AppointmentForm = () => {

    return (

        <Paper
            elevation={0}
            sx={{
                p:4,
                borderRadius:1,
                border:"1px solid #E5E7EB"
            }}
        >

            <Typography
                variant="h5"
                fontWeight={700}
                mb={4}
            >
                Schedule Appointment
            </Typography>

            {/* ================================================
                        PATIENT INFORMATION
            ================================================= */}

            <Typography
                variant="h6"
                fontWeight={600}
                mb={3}
            >
                Patient Information
            </Typography>

            <Grid container spacing={3}>

                <Grid size={{xs:12,md:6}}>

                    <TextField
                        fullWidth
                        label="Patient"
                        placeholder="Search Patient"
                    />

                </Grid>

                <Grid size={{xs:12,md:6}}>

                    <TextField
                        fullWidth
                        label="MRN"
                        disabled
                    />

                </Grid>

            </Grid>

            <Divider sx={{my:4}}/>

            {/* ================================================
                        PROVIDER INFORMATION
            ================================================= */}

            {/* ================================================
            PROVIDER INFORMATION
================================================= */}

<Typography
    variant="h6"
    fontWeight={600}
    mb={3}
>
    Provider Information
</Typography>

<Grid container spacing={3}>

    <Grid size={{ xs: 12, md: 4 }}>

        <TextField
            select
            fullWidth
            label="Department"
        >
            <MenuItem value="">
                Select Department
            </MenuItem>
        </TextField>

    </Grid>

    <Grid size={{ xs: 12, md: 4 }}>

        <TextField
            select
            fullWidth
            label="Provider"
        >
            <MenuItem value="">
                Select Provider
            </MenuItem>
        </TextField>

    </Grid>

    <Grid size={{ xs: 12, md: 4 }}>

        <TextField
            fullWidth
            label="Specialization"
            disabled
        />

    </Grid>

</Grid>

<Divider sx={{ my: 4 }} />

{/* ================================================
            APPOINTMENT INFORMATION
================================================= */}

<Typography
    variant="h6"
    fontWeight={600}
    mb={3}
>
    Appointment Information
</Typography>

<Grid container spacing={3}>

    <Grid size={{ xs: 12, md: 3 }}>

        <TextField
            type="date"
            fullWidth
            label="Appointment Date"
            InputLabelProps={{
                shrink: true,
            }}
        />

    </Grid>

    <Grid size={{ xs: 12, md: 3 }}>

        <TextField
            type="time"
            fullWidth
            label="Appointment Time"
            InputLabelProps={{
                shrink: true,
            }}
        />

    </Grid>

    <Grid size={{ xs: 12, md: 3 }}>

        <TextField
            select
            fullWidth
            label="Duration"
            defaultValue="30"
        >
            <MenuItem value="15">15 Minutes</MenuItem>
            <MenuItem value="30">30 Minutes</MenuItem>
            <MenuItem value="45">45 Minutes</MenuItem>
            <MenuItem value="60">60 Minutes</MenuItem>
        </TextField>

    </Grid>

    <Grid size={{ xs: 12, md: 3 }}>

        <TextField
            select
            fullWidth
            label="Visit Type"
        >
            <MenuItem value="New Patient">
                New Patient
            </MenuItem>

            <MenuItem value="Follow Up">
                Follow Up
            </MenuItem>

            <MenuItem value="Emergency">
                Emergency
            </MenuItem>

            <MenuItem value="Routine Checkup">
                Routine Checkup
            </MenuItem>
        </TextField>

    </Grid>

    <Grid size={{ xs: 12, md: 4 }}>

        <TextField
            select
            fullWidth
            label="Appointment Status"
        >
            <MenuItem value="Scheduled">
                Scheduled
            </MenuItem>

            <MenuItem value="Confirmed">
                Confirmed
            </MenuItem>

            <MenuItem value="Checked In">
                Checked In
            </MenuItem>

            <MenuItem value="Completed">
                Completed
            </MenuItem>

            <MenuItem value="Cancelled">
                Cancelled
            </MenuItem>
        </TextField>

    </Grid>

</Grid>

<Divider sx={{ my: 4 }} />

{/* ================================================
            CLINICAL INFORMATION
================================================= */}
{/* ================================================
            CLINICAL INFORMATION
================================================= */}

<Typography
    variant="h6"
    fontWeight={600}
    mb={3}
>
    Clinical Information
</Typography>

<Grid container spacing={3}>

    <Grid size={{ xs: 12, md: 6 }}>

        <TextField
            fullWidth
            label="Chief Complaint"
            placeholder="Enter chief complaint"
        />

    </Grid>

    <Grid size={{ xs: 12, md: 6 }}>

        <TextField
            fullWidth
            label="Reason for Visit"
            placeholder="Enter reason for visit"
        />

    </Grid>

    <Grid size={12}>

        <TextField
            fullWidth
            multiline
            rows={3}
            label="Symptoms"
            placeholder="Describe patient's symptoms"
        />

    </Grid>

    <Grid size={12}>

        <TextField
            fullWidth
            multiline
            rows={4}
            label="Notes"
            placeholder="Additional notes..."
        />

    </Grid>

</Grid>

<Divider sx={{ my: 4 }} />

{/* ================================================
            PAYMENT INFORMATION
================================================= */}

<Typography
    variant="h6"
    fontWeight={600}
    mb={3}
>
    Payment Information
</Typography>

<Grid container spacing={3}>

    <Grid size={{ xs: 12, md: 3 }}>

        <TextField
            fullWidth
            type="number"
            label="Consultation Fee"
            defaultValue={0}
        />

    </Grid>

    <Grid size={{ xs: 12, md: 3 }}>

        <TextField
            fullWidth
            type="number"
            label="Discount"
            defaultValue={0}
        />

    </Grid>

    <Grid size={{ xs: 12, md: 3 }}>

        <TextField
            fullWidth
            type="number"
            label="Net Amount"
            disabled
        />

    </Grid>

    <Grid size={{ xs: 12, md: 3 }}>

        <TextField
            select
            fullWidth
            label="Payment Status"
            defaultValue="Pending"
        >
            <MenuItem value="Pending">
                Pending
            </MenuItem>

            <MenuItem value="Paid">
                Paid
            </MenuItem>

            <MenuItem value="Partially Paid">
                Partially Paid
            </MenuItem>

        </TextField>

    </Grid>

</Grid>

<Divider sx={{ my: 4 }} />

{/* ================================================
            REMINDER
================================================= */}

<Typography
    variant="h6"
    fontWeight={600}
    mb={3}
>
    Appointment Reminder
</Typography>

<Grid container spacing={3}>

    <Grid size={{ xs: 12, md: 4 }}>

        <TextField
            select
            fullWidth
            label="Reminder"
            defaultValue="30"
        >
            <MenuItem value="15">
                15 Minutes Before
            </MenuItem>

            <MenuItem value="30">
                30 Minutes Before
            </MenuItem>

            <MenuItem value="60">
                1 Hour Before
            </MenuItem>

            <MenuItem value="1440">
                1 Day Before
            </MenuItem>

        </TextField>

    </Grid>

</Grid>

<Divider sx={{ my: 4 }} />

<Stack
    direction="row"
    spacing={2}
    justifyContent="flex-end"
>

    <Button
        variant="outlined"
    >
        Reset
    </Button>

    <Button
        variant="contained"
    >
        Schedule Appointment
    </Button>

</Stack>

</Paper>

    );
};

export default AppointmentForm;