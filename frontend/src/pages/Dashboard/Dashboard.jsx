import DashboardLayout from "../../layouts/DashboardLayout";

import {

    Grid,

    Box,

    Typography,

} from "@mui/material";

import PeopleIcon from "@mui/icons-material/People";

import EventIcon from "@mui/icons-material/Event";

import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

import PageHeader from "../../components/ui/PageHeader";

import StatCard from "../../components/ui/StatCard";

import WelcomeCard from "../../components/dashboard/WelcomeCard";

import RecentPatients from "../../components/dashboard/RecentPatients";

import AppointmentList from "../../components/dashboard/AppointmentList";

import QuickActions from "../../components/dashboard/QuickActions";

import ActivityTimeline from "../../components/dashboard/ActivityTimeline";

function Dashboard() {

    return (

        <DashboardLayout>
            <WelcomeCard />

            <Grid

                container

                spacing={3}

                sx={{

                    mt: 1,

                    mb: 3,

                }}

            >

                <Grid size={{ xs: 12, sm: 6, md: 6, lg: 3 }}>

                    <StatCard

                        title="Patients"

                        value="1,250"

                        growth="+12%"

                        color="#2563EB"

                        icon={<PeopleIcon />}

                    />

                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 6, lg: 3 }}>

                    <StatCard

                        title="Appointments"

                        value="245"

                        growth="+8%"

                        color="#0EA5E9"

                        icon={<EventIcon />}

                    />

                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 6, lg: 3 }}>

                    <StatCard

                        title="Providers"

                        value="42"

                        growth="+5%"

                        color="#10B981"

                        icon={<LocalHospitalIcon />}

                    />

                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 6, lg: 3 }}>

                    <StatCard

                        title="Revenue"

                        value="₹4.58 L"

                        growth="+18%"

                        color="#F59E0B"

                        icon={<CurrencyRupeeIcon />}

                    />

                </Grid>

            </Grid>

                        <Grid

                container

                spacing={3}

            >

                <Grid

                    item

                    xs={12}

                    lg={8}

                >

                    <RecentPatients />

                </Grid>

                <Grid

                    item

                    xs={12}

                    lg={4}

                >

                    <AppointmentList />

                </Grid>

                <Grid

                    item

                    xs={12}

                    lg={6}

                >

                    <QuickActions />

                </Grid>

                <Grid

                    item

                    xs={12}

                    lg={6}

                >

                    <ActivityTimeline />

                </Grid>

            </Grid>

        </DashboardLayout>

    );

}

export default Dashboard;