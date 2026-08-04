import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import PatientList from "../pages/Patients/PatientList";
import AddPatient from "../pages/Patients/AddPatient";
import EditPatient from "../pages/Patients/EditPatient";
import PatientDashboard from "../pages/Patients/PatientDashboard";

import DepartmentList from "../pages/Department/DepartmentList"
import AddDepartment from "../pages/Department/AddDepartment"
import EditDepartment from "../pages/Department/EditDepartment"
import ProviderList from "../pages/Providers/ProviderList"
import AddProvider from "../pages/Providers/AddProvider"
import EditProvider from "../pages/Providers/EditProvider"

import AppointmentList from "../pages/Appointments/AppointmentList";
import ScheduleAppointment from "../pages/Appointments/ScheduleAppointment";
// import EditAppointment from "../pages/Appointments/EditAppointment";
// import AppointmentDetails from "../pages/Appointments/AppointmentDetails";



const AppRoutes = () => {

    return (
        <BrowserRouter>
            <Routes>
                {/* Login Page Route */}
                <Route path="/login" element={ <PublicRoute><Login /></PublicRoute> } />

                {/* Dashboard Page Route */}
                <Route path="/" element={ <ProtectedRoute><Dashboard /></ProtectedRoute> } />

                {/* Patient Section Route */}
                <Route path="/patients" element={ <ProtectedRoute><PatientList /></ProtectedRoute> } />
                <Route path="/patients/add" element={ <ProtectedRoute><AddPatient /></ProtectedRoute> } />
                <Route path="/patients/edit/:uuid" element={ <ProtectedRoute><EditPatient /></ProtectedRoute> } />
                <Route path="/patients/dashboard/:uuid" element={ <ProtectedRoute><PatientDashboard /></ProtectedRoute>} />

                {/* Department Section Route */}
                <Route path="/departments" element={ <ProtectedRoute><DepartmentList /></ProtectedRoute> } />
                <Route path="/departments/add" element={ <ProtectedRoute><AddDepartment /></ProtectedRoute> } />
                <Route path="/departments/edit/:uuid" element={ <ProtectedRoute><EditDepartment /></ProtectedRoute> } />

                {/* Provider Section Route */}
                <Route path="/providers" element={ <ProtectedRoute><ProviderList /></ProtectedRoute>} />
                <Route path="/providers/add" element={ <ProtectedRoute><AddProvider /></ProtectedRoute>} />
                <Route path="/providers/edit/:uuid" element={ <ProtectedRoute><EditProvider /></ProtectedRoute>} />

                {/* Appointments Section Route */}
                <Route path="/appointments" element={<ProtectedRoute><AppointmentList /></ProtectedRoute>} />
                <Route path="/appointments/add" element={<ProtectedRoute><ScheduleAppointment /></ProtectedRoute>} />
                {/* <Route path="/appointments/edit/:uuid" element={<ProtectedRoute><EditAppointment /></ProtectedRoute>} />
                <Route path="/appointments/:uuid" element={<ProtectedRoute><AppointmentDetails /></ProtectedRoute>} /> */}

                

            </Routes>

        </BrowserRouter>

    );
}

export default AppRoutes;