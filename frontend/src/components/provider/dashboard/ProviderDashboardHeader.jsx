import {
  Avatar,
  Box,
  Button,
  Chip,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import { useNavigate } from "react-router-dom";

const DashboardHeader = ({ provider }) => {
  const navigate = useNavigate();

  const fullName = `${provider?.title || ""} ${provider?.first_name || ""} ${
    provider?.middle_name || ""
  } ${provider?.last_name || ""}`
    .replace(/\s+/g, " ")
    .trim();

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        mb: 3,
        border: "1px solid #E5E7EB",
        borderRadius: 2,
      }}
    >
      <Grid container spacing={3} alignItems="center">
        {/* Avatar */}

        <Grid size={{ xs: 12, md: 1.5 }}>
          <Avatar
            sx={{
              width: 90,
              height: 90,
              bgcolor: "primary.main",
              fontSize: 32,
              fontWeight: 700,
            }}
          >
            {provider?.first_name?.charAt(0)}
          </Avatar>
        </Grid>

        {/* Provider Information */}

        <Grid size={{ xs: 12, md: 8 }}>
          <Typography variant="h4" fontWeight={700}>
            {fullName}
          </Typography>

          <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
            <Chip
              label={provider?.department_name}
              color="primary"
              size="small"
            />

            <Chip label={provider?.role_name} color="secondary" size="small" />

            <Chip
              label={provider?.status ? "Active" : "Inactive"}
              color={provider?.status ? "success" : "error"}
              size="small"
            />
          </Stack>

          <Stack direction="row" spacing={4} mt={3} flexWrap="wrap">
            <Stack direction="row" spacing={1} alignItems="center">
              <EmailOutlinedIcon fontSize="small" color="action" />

              <Typography variant="body2">{provider?.email || "-"}</Typography>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center">
              <PhoneOutlinedIcon fontSize="small" color="action" />

              <Typography variant="body2">{provider?.phone || "-"}</Typography>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center">
              <BadgeOutlinedIcon fontSize="small" color="action" />

              <Typography variant="body2">
                {provider?.license_number || "-"}
              </Typography>
            </Stack>
          </Stack>
        </Grid>

        {/* Back Button */}

        <Grid size={{ xs: 12, md: 2.5 }} textAlign="right">
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/providers")}
          >
            Back
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default DashboardHeader;
