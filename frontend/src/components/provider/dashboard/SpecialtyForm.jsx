import { Box, Button, FormControlLabel, Switch, TextField } from "@mui/material";
import { useState } from "react";


const SpecialtyForm = ({ specialty = null, onSubmit, onCancel }) => {
    const [specialtyName, setSpecialtyName] = useState( specialty?.specialty_name || "" );
    const [isPrimary, setIsPrimary] = useState(specialty?.is_primary || false);
    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit({
            specialty_name: specialtyName.trim(),
            is_primary: isPrimary,
        });
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <TextField fullWidth label="Specialty Name" value={specialtyName} onChange={(event) => setSpecialtyName(event.target.value)} required sx={{ mb: 2 }} />

            <FormControlLabel control={ <Switch checked={isPrimary} onChange={(event) => setIsPrimary(event.target.checked)} /> } label="Primary Specialty" />
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 3 }} >

                <Button variant="outlined" onClick={onCancel}> Cancel </Button>
                <Button type="submit" variant="contained"> {specialty ? "Update Specialty" : "Add Specialty"} </Button>
            </Box>
        </Box>
    );
};

export default SpecialtyForm;
