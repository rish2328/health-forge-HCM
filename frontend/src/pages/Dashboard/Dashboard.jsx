import AppLayout from "../../layouts/AppLayout";
import { Grid } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import EventIcon from "@mui/icons-material/Event";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import StatCard from "../../components/ui/StatCard";
import WelcomeCard from "../../components/dashboard/WelcomeCard";
import RecentPatients from "../../components/dashboard/RecentPatients";
import AppointmentList from "../../components/dashboard/AppointmentList";
import { useEffect, useState } from "react";
import { getPatientCount, getRecentPatients } from "../../api/patientApi";

const Dashboard = () => {
    const [patientCount, setPatientCount] = useState(0);
    const [recentPatients, setRecentPatients] = useState([]);
    const [todaysAppointment, setTodaysAppointment] = useState([]);


    const loadPatientDashboardData = async () => {
        try {
            const [countResponse, recentResponse] = await Promise.all([ getPatientCount(), getRecentPatients() ]);

            console.log('check-recentResponse', recentResponse?.data?.data)
            setPatientCount(countResponse?.data || 0);
            setRecentPatients(recentResponse?.data?.data || []);
        }
        catch (error) {
            setPatientCount(0);
            setRecentPatients([]);
        }
    };

    useEffect(() => {
        loadPatientDashboardData();
    }, []);


    return (
        <AppLayout>
            <WelcomeCard />

            <Grid container spacing={2.5} sx={{ mt: 1, mb: 3 }} >
                <Grid size={{ xs: 12, sm: 6, md: 6, lg: 3 }}>
                    <StatCard title="Patients" value={patientCount ?? 0} growth="+12%" color="#2563EB" icon={<PeopleIcon />} />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 6, lg: 3 }}>
                    <StatCard title="Appointments" value="0" growth="+8%" color="#0EA5E9" icon={<EventIcon />} />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 6, lg: 3 }}>
                    <StatCard title="Providers" value="42" growth="+5%" color="#10B981" icon={<LocalHospitalIcon />} />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 6, lg: 3 }}>
                    <StatCard title="Revenue" value="₹0 L" growth="+18%" color="#F59E0B" icon={<CurrencyRupeeIcon />} />
                </Grid>
            </Grid>

            <Grid container spacing={2.5} sx={{ mt: 1, mb: 3 }} >
                <Grid size={{ xs: 12, md: 6, }} ><RecentPatients patients={recentPatients} /></Grid>
                <Grid size={{ xs: 12, md: 6, }} ><AppointmentList appointments={todaysAppointment} /></Grid>
            </Grid>

            {/* <Grid container spacing={2.5} sx={{ mt: 1, mb: 3 }} >
                <Grid size={{ xs: 12, md: 6, }} ><QuickActions /></Grid>
                <Grid size={{ xs: 12, md: 6, }} ><ActivityTimeline /></Grid>
            </Grid> */}
        </AppLayout>
    );
};

export default Dashboard;
